import { Hono } from 'hono';
import { cors } from 'hono/cors';
import SignInEmailTemplate from '../emails/sign-in';
import { type CreateEmailResponse, Resend } from 'resend';
import SignUpEmailTemplate from '../emails/sign-up';
import OrderConfirmationEmailTemplate from '../emails/order-confirmation';

interface MessageBody {
	type: string;
	body: {
		userId: number;
		signin?: boolean;
		time: string;
	};
}

interface ProductMessageBody {
	type: string;
	body: {
		userId: number;
		order: {
			productId: string;
			quantity: number;
		}[];
		orderTime: number;
	};
}

const app = new Hono<Env>();

app.use('/api/*', cors());

app.get('/api/products', async (c) => {
	const { results } = await c.env.DB.prepare('SELECT id, name, desc, cost FROM products').all<{ id: string; name: string; desc: string }>();
	return c.json(results);
});

app.post('/api/order', async (c) => {
	// Create message using the response body
	const { order, time, userId } = await c.req.json();

	const message: ProductMessageBody = {
		type: 'orderCreated',
		body: {
			userId: userId,
			order: order,
			orderTime: time,
		},
	};

	// Send a message when a new order is created
	try {
		await c.env.ORDER_QUEUE.send(message, { delaySeconds: 1 });
		return c.json({ message: 'Order created', status: 200 });
	} catch (e) {
		console.log(e);
		return c.json({ message: 'Failed to send order to the queue', status: 500 });
	}
});

app.post('/api/user/session', async (c) => {
	// Create message using the response body
	const { type, id, time }: { type: string; id: number; time: string } = await c.req.json();

	const messageBody = {
		userId: id,
		time: time,
	};

	if (type === 'login') {
		let signIn = type === 'login';
		Object.assign(messageBody, { signIn: signIn });
	} else if (type === 'signup') {
		console.log('A new user signed up');
		Object.assign(messageBody, { signup: true });
	} else {
		return c.json({ message: 'Invalid type', status: 500 });
	}

	const message: MessageBody = {
		type: type,
		body: messageBody,
	};

	// Send a message on user login/sign-up
	try {
		console.log('Sending message to the queue', messageBody);
		await c.env.USER_SESSION_QUEUE.send(message, { delaySeconds: 1 });
		console.log('Message sent to the queue');

		return c.json({ message: 'Message sent', status: 200 });
	} catch (e) {
		console.error(e);
		return c.json({ message: 'Failed to send message to the queue', status: 500 });
	}
});

async function handleUserSession(batch: MessageBatch<MessageBody>, env: Env) {
	console.log('Handling user sing-in/sign-up message');
	// @ts-ignore
	const resend = new Resend(env.RESEND_API_KEY);

	for (let message of batch.messages) {
		try {
			const { body } = message;

			console.log('Message from the queue', message);

			//Fetch information of the user and product from the D1 (or other db)
			// @ts-ignore
			const user = await env.DB.prepare('SELECT email, name FROM users WHERE id = ?').bind(body.body.userId).first();

			//Use the results to send an email to the user
			console.log('Sending email to the user', user);

			let data: CreateEmailResponse | undefined;
			if (message.body.type === 'login') {
				data = await resend.emails.send({
					from: 'Acme <onboarding@resend.dev>',
					to: [user.email],
					subject: 'New Singin',
					react: SignInEmailTemplate({ name: user.name, signInTime: body.body.time }),
				});
			} else if (message.body.type === 'signup') {
				data = await resend.emails.send({
					from: 'Acme <onboarding@resend.dev>',
					to: [user.email],
					subject: 'You Signed Up!',
					react: SignUpEmailTemplate({ name: user.name, email: user.email }),
				});
			}

			if (data && data.error === null) {
				console.log('Email sent successfully');
				message.ack();
			} else if (data) {
				console.error(data.error?.message);
				message.retry({ delaySeconds: 100 });
			} else {
				console.error('No email was sent');
				message.retry({ delaySeconds: 100 });
			}
		} catch (e: any) {
			console.log('An error occured', e.message);
			console.log('Retrying message in 100 seconds');
			message.retry({ delaySeconds: 100 });
		}
	}
}

async function handleOrder(batch: MessageBatch<ProductMessageBody>, env: Env) {
	console.log('Handling order');
	// @ts-ignore
	const resend = new Resend(env.RESEND_API_KEY);

	for (let message of batch.messages) {
		try {
			const { body } = message;

			//Fetch information of the user and product from the D1 (or other db)

			// @ts-ignore
			const user = await env.DB.prepare('SELECT email, name FROM users WHERE id = ?').bind(body.body.userId).first();

			// @ts-ignore
			const stmt = env.DB.prepare('SELECT name, desc FROM products WHERE id = ?');

			let stmtBatch = [];

			for (let product of body.body.order) {
				stmtBatch.push(stmt.bind(product.productId));
			}

			// @ts-ignore
			const res = await env.DB.batch(stmtBatch);

			// @ts-ignore
			const products = res.map((res, i) => {
				return {
					name: res.results[0].name,
				};
			});

			// Use the results to send an email to the user

			const data = await resend.emails.send({
				from: 'Acme <onboarding@resend.dev>',
				to: [user.email],
				subject: 'Order Confirmation!',
				react: OrderConfirmationEmailTemplate({
					name: user.name,
					orderTime: body.body.orderTime,
					products: products.map((product: { name: any }, i: number) => ({
						name: product.name,
						quantity: body.body.order[i].quantity,
					})),
				}),
			});

			if (data && data.error === null) {
				message.ack();
			} else if (data) {
				console.error(data.error?.message);
				message.retry({ delaySeconds: 100 });
			} else {
				console.error('No email was sent');
				message.retry({ delaySeconds: 100 });
			}
		} catch (e: any) {
			console.log('An error occured', e.message);
			console.log('Retrying message in 100 seconds');
			message.retry({ delaySeconds: 100 });
		}
	}
}

export default {
	fetch: app.fetch,
	queue: async (batch: MessageBatch, env: Env) => {
		switch (batch.queue) {
			case 'order-queue-demo':
				await handleOrder(batch as MessageBatch<ProductMessageBody>, env);
				break;
			case 'user-session-queue-demo':
				await handleUserSession(batch as MessageBatch<MessageBody>, env);
				break;
			default:
				console.log('Unknown queue');
		}
	},
};
