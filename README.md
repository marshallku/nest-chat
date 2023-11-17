# Nest.js chat api

<img src="https://cdn.discordapp.com/attachments/1102888096007196733/1175118136136179732/talk.marshallku.dev_iPhone_12_Pro.png" height="300" />

Sample chat api with [Nest.js](https://nestjs.com/).\
You can see Front-end application at [ui-playground repository](https://github.com/marshallku/ui-playground/tree/master/apps/chat).

## Running the application

### Requirements

- [Docker](https://www.docker.com/): Tested in 24.0.7
- [Docker Compose](https://docs.docker.com/compose/install/): Tested in 1.29.2
- [Node.js](https://nodejs.org/en/): Tested in 20.9.0
- [PNPM](https://pnpm.io/): Tested in 8.10.2

### Environment variables

- `CORS_ORIGINS`: Domains allowed for Cross-Origin Resource Sharing (CORS). Separate each with a comma (,).
- `NODE_PORT`: Port on which to run the NestJS application.
- `REDIS_PORT`: Port on which to run Redis.
- `REDIS_HOST`: Host of Redis (set to 172.18.0.1 with Docker Compose).
- `MONGO_PORT`: Port of MongoDB (used to save user and room data, referred to as Mongo1 below).
- `MONGO_HOST`: Host of MongoDB (set to 172.18.0.1 with Docker Compose).
- `MONGO_USERNAME`: Username for MongoDB.
- `MONGO_PASSWORD`: Password for MongoDB.
- `MONGO_CONNECTION_NAME`: Connection name for Mongo1.
- `CHAT_DATA_PORT`: Port of MongoDB (used to save chat data, referred to as Mongo2 below).
- `CHAT_DATA_CONNECTION_NAME`: Connection name for Mongo2.
- `JWT_SECRET`: JWT secret key.

### Running with docker

```bash
docker network create net
docker-compose up --build -d
```

Simply run the command above and then access `localhost:$NODE_PORT` in your browser.
