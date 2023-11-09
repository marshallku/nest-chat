import { Module } from "@nestjs/common";
import { UserModule } from "#user/user.module";
import { FriendsController } from "./friends.controller";
import { FriendsService } from "./friends.service";

@Module({
    controllers: [FriendsController],
    providers: [FriendsService],
    imports: [UserModule],
})
export class FriendsModule {}
