import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { RedisIoAdapter } from "#chat/chat.adapter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder().setTitle("Chat api").setVersion("1.0").build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    const redisIOAdapter = new RedisIoAdapter(app);
    await redisIOAdapter.connectToRedis();

    app.useWebSocketAdapter(redisIOAdapter);

    await app.listen(process.env.NODE_PORT);
}
bootstrap();
