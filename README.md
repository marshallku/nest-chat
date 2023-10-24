# Nest.js chat api

Sample chat api with [Nest.js](https://nestjs.com/)

## Running application

It uses [pnpm](https://pnpm.io/) as package manager.

```text
NODE_PORT=3443
REDIS_PORT=48379
REDIS_HOST=localhost
```

Add information about ports and hosts at `.env`

```bash
pnpm start:dev
```

Then start the server and access [`localhost:3443/chat?chatId=1`](http://localhost:3443/chat?chatId=1) to chat.\
**Please** note that you should include the chat room ID in the query string, regardless of the key.
