import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Room } from "./room.schema";
import { ChatUserRole } from "#constants/lib/user";

export interface CreateRoomOptions {
    adminUser: string;
    users: string[];
    name: string;
}

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

    async createRoom({ adminUser, users, name }: CreateRoomOptions) {
        const admin = { user: adminUser, role: ChatUserRole.Admin };
        // TODO: Validate user id
        const chatUsers = users.map((user) => ({ user, role: ChatUserRole.Participant }));
        const createdRoom = await new this.roomModel({ users: [admin, ...chatUsers], name }).save();

        return createdRoom.toJSON();
    }
}
