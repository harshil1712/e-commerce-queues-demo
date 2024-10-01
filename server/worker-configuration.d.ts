interface Env {
	Bindings: {
		ORDER_QUEUE: Queue;
		DB: D1Database;
		USER_SESSION_QUEUE: Queue;
	};
	Variables: {
		RESEND_API_KEY: string;
	};
}
