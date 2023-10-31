import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { ChatRoom, ChatRoomSchema } from "./chat.schema";
import { CHAT_DATA_CONNECTION_NAME } from "#constants";
import { RoomModule } from "#room/room.module";

@Module({
    providers: [ChatGateway, ChatService],
    imports: [
        RoomModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            async useFactory() {
                return {
                    secret: process.env.JWT_SECRET,
                    signOptions: {
                        expiresIn: "1d",
                    },
                };
            },
        }),
        MongooseModule.forFeature([{ name: ChatRoom.name, schema: ChatRoomSchema }], CHAT_DATA_CONNECTION_NAME),
    ],
})
export class ChatModule {}
