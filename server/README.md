# E-Commerce Worker

This Workers script sends emails using the [Resend API](https://resend.com). It uses [Cloudflare Queue](https://developers.cloudflare.com/queues/) to decouple sending emails.

## Features

- Email sending functionality using Resend
- Multiple email templates (Sign In, Sign Up, Order Confirmation)
- Queue-based email sending

## Getting Started

### Prerequisites

- Cloudflare Workers account
- Resend API key

### Setting up the project

1. Install the project dependencies:

```sh
# make sure you are in the correct directory
# cd server
npm install
```

2. Set the Resend API key

- Rename `.dev.vars.example` to `.dev.vars`
- Replace `re_1234567890` with your Resend API key

3. Create a D1 database

```sh
npx wrangler d1 create e-com
```

4. Update the bindings

- Update the `[[d1_database]]` binding in `wrangler.toml`

5. Create tables

```sh
npx wrangler d1 execute e-com --file="./schema/init.sql"
```

6. Create a queue

```sh
# Creat Queue to handle orders
npx wrangler queues create order-queue-demo

# Create Queue to handle user sessions
npx wrangler queues create user-session-queue-demo
```

## Local Development

Start the local development server:

```sh
npm run dev
```

## Deployment

1. Add table to the remote database

```sh
npx wrangler d1 execute e-com --file="./schema/init.sql" --remote
```

2. Deploy the project to Cloudflare Workers:

```sh
npm run deploy
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
