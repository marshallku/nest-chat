import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { ChatGateway } from "./chat.gateway";
import { RoomModule } from "#room/room.module";

@Module({
    providers: [ChatGateway],
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
    ],
})
export class ChatModule {}
