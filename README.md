# Addressable

This simple proration tool includes a backend and frontend built principally with Next.js, Fastify, and JSON Schema.

A suite of tests are provided to verify the allocation logic, api route handling, basic rendering capabilities and so forth.

Much of this work here builds off corollary work from my personal projects — any code provided is not exclusive and will be reused in my future work.

## Prerequisites

- [`node.js >= v15`](https://volta.sh/) — use of [volta](https://volta.sh/) is encouraged
- [`yarn`](https://pnpm.io/)

## Setup

To get the development environment set up begin with its dependencies.

```sh
yarn install
```

## Testing

```sh
yarn test
```

To run the test continously during development use `test:watch` rather than `test`

## Running

In development the server is run by `vercel` from the repositories root

```sh
vercel dev
```

In production the script is built and run with `node`

```sh
yarn build
yarn start
```

## Docker

Rather than building locally a dockerfile is provided to build and run the app

```sh
docker build . -t evanrs-addressable
docker run -p 3000:3000 evanrs-addressable
```

<br/>

## License

This project is [MIT licensed](./LICENSE).
