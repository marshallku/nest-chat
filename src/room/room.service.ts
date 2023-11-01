import { Model, Types } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Room } from "./room.schema";
import { ChatUserRole, MONGO_CONNECTION_NAME } from "#constants";

export interface CreateRoomOptions {
    adminUser: string;
    users: string[];
    name: string;
}

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room.name, MONGO_CONNECTION_NAME) private roomModel: Model<Room>) {}

    async createRoom({ adminUser, users, name }: CreateRoomOptions) {
        const admin = { user: adminUser, role: ChatUserRole.Admin };
        // TODO: Validate user id
        const chatUsers = users.map((user) => ({ user, role: ChatUserRole.Participant }));
        const createdRoom = await new this.roomModel({ users: [admin, ...chatUsers], name }).save();

        return createdRoom.toJSON();
    }

    async findOne(id: string): Promise<Room | undefined> {
        return this.roomModel.findById(id).exec();
    }

    async addUsers(chatRoomId: string, userIds: string[]) {
        const room = await this.findOne(chatRoomId);

        room.users.push(...userIds.map((id) => ({ user: new Types.ObjectId(id), role: ChatUserRole.Participant })));

        await room.save();
    }
}
