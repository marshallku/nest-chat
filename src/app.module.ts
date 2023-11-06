import { resolve } from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { MongooseModule } from "@nestjs/mongoose";
import * as Joi from "joi";
import { CHAT_DATA_CONNECTION_NAME, MONGO_CONNECTION_NAME } from "#constants";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChatModule } from "./chat/chat.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { RoomModule } from "./room/room.module";
import { FriendsModule } from "./friends/friends.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env`,
            validationSchema: Joi.object({
                NODE_PORT: Joi.string().required(),
                REDIS_PORT: Joi.string().required(),
                REDIS_HOST: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                MONGO_PORT: Joi.string().required(),
                MONGO_HOST: Joi.string().required(),
                MONGO_USERNAME: Joi.string().required(),
                MONGO_PASSWORD: Joi.string().required(),
                CHAT_DATA_PORT: Joi.string().required(),
            }),
        }),
        MongooseModule.forRoot(
            `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/`,
            {
                connectionName: MONGO_CONNECTION_NAME,
            },
        ),
        MongooseModule.forRoot(
            `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.CHAT_DATA_PORT}/`,
            {
                connectionName: CHAT_DATA_CONNECTION_NAME,
            },
        ),
        ServeStaticModule.forRoot({
            rootPath: resolve("./static"),
        }),
        ChatModule,
        AuthModule,
        UserModule,
        RoomModule,
        FriendsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
