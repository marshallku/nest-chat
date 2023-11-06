import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { RedisIoAdapter } from "#chat/chat.adapter";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            credentials: true,
            origin: ["http://localhost:3000", "https://chat.marshallku.dev", "https://marshallku.dev:48030"],
        },
    });

    const config = new DocumentBuilder().setTitle("Chat api").setVersion("1.0").build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    const redisIOAdapter = new RedisIoAdapter(app);
    await redisIOAdapter.connectToRedis();

    app.useWebSocketAdapter(redisIOAdapter);

    app.use(cookieParser());

    await app.listen(process.env.NODE_PORT);
}
bootstrap();
