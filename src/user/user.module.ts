import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { User, UserSchema } from "./user.schema";
import { MONGO_CONNECTION_NAME } from "#constants";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], MONGO_CONNECTION_NAME)],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
