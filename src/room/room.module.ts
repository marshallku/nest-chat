import { Module } from "@nestjs/common";
import { RoomService } from "./room.service";
import { RoomController } from "./room.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Room, RoomSchema } from "./room.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
    providers: [RoomService],
    controllers: [RoomController],
})
export class RoomModule {}
