import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { RedisIoAdapter } from "#chat/chat.adapter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const redisIOAdapter = new RedisIoAdapter(app);
    await redisIOAdapter.connectToRedis();

    app.useWebSocketAdapter(redisIOAdapter);

    await app.listen(process.env.NODE_PORT);
}
bootstrap();
