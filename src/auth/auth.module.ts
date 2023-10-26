import { Module } from "@nestjs/common";
import { UsersModule } from "#users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        UsersModule,
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
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
