import * as React from 'react';

interface OrderConfirmationEmailTemplateProps {
	name: string;
	orderTime: number;
	products: Array<{
		name: string;
		quantity: number;
	}>;
}

const OrderConfirmationEmailTemplate: React.FC<Readonly<OrderConfirmationEmailTemplateProps>> = ({ name, orderTime, products }) => (
	<div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f8f8f8' }}>
		<h1 style={{ color: '#333', borderBottom: '2px solid #4a90e2', paddingBottom: '10px' }}>Thank you for your order, {name}!</h1>
		<p style={{ color: '#555', fontSize: '16px' }}>Your order has been successfully placed.</p>
		<p style={{ color: '#555', fontSize: '14px' }}>
			Order time:{' '}
			<span style={{ fontWeight: 'bold' }}>
				{new Intl.DateTimeFormat('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					hour12: true,
				}).format(new Date(orderTime))}
			</span>
		</p>
		<h2 style={{ color: '#4a90e2', marginTop: '20px' }}>Order Details:</h2>
		<ul style={{ listStyleType: 'none', padding: 0 }}>
			{products.map((product, index) => (
				<li
					key={index}
					style={{
						backgroundColor: '#fff',
						padding: '10px',
						marginBottom: '10px',
						borderRadius: '5px',
						boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
					}}
				>
					<span style={{ fontWeight: 'bold' }}>{product.name}</span> - Quantity: {product.quantity}
				</li>
			))}
		</ul>
		<p style={{ color: '#555', fontSize: '14px', marginTop: '20px' }}>We'll notify you when your order has been shipped.</p>
		<p style={{ color: '#555', fontSize: '16px', marginTop: '20px' }}>Thank you for shopping with us!</p>
		<div style={{ marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px', color: '#777', fontSize: '14px' }}>
			<p>Best regards,</p>
			<p>Your Acme Team</p>
		</div>
	</div>
);

export default OrderConfirmationEmailTemplate;
