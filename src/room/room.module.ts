import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomService } from "./room.service";
import { RoomController } from "./room.controller";
import { Room, RoomSchema } from "./room.schema";
import { MONGO_CONNECTION_NAME } from "#constants";

@Module({
    imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }], MONGO_CONNECTION_NAME)],
    providers: [RoomService],
    controllers: [RoomController],
    exports: [RoomService],
})
export class RoomModule {}
