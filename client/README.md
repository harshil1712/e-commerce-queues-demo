# E-Commerce Frontend

The frontend of the E-Commerce application built with [Next.js](https://nextjs.org/) and bootstrapped with [`c3`](https://developers.cloudflare.com/pages/get-started/c3).

## Features

- Fetches products from the backend
- Cart management

:::note
The authentication and authorization features are simulated in this demonstration version.
:::

## Getting Started

### Setting up the project

Install the project dependencies:

```sh
# make sure you are in the correct directory
# cd client
npm install
```

## Local Development

Start the local development server:

```sh
npm run dev
```

## Deployment

1. Deploy the [Server](../server/README.md#deployment) first. Make a note of the deployed URL.

2. Update the URL in `/app/context/AuthContext.tsx`, `/app/cart/page.tsx`, and `/app/page.tsx`.

3. Deploy the project to Cloudflare Pages:

```sh
npm run deploy
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
