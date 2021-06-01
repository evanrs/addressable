# Addressable

Normalizes addresses — see run with [docker](#docker)

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

## Docker [🐋](#docker)

Rather than building locally a dockerfile is provided to build and run the app

```sh
docker build . -t evanrs-addressable
docker run -p 3000:3000 evanrs-addressable
```

<br/>

## License

This project is [MIT licensed](./LICENSE).
