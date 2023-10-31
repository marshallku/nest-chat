import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Chat, ChatRoom } from "./chat.schema";
import { CHAT_DATA_CONNECTION_NAME } from "#constants";

@Injectable()
export class ChatService {
    constructor(@InjectModel(ChatRoom.name, CHAT_DATA_CONNECTION_NAME) private chatRoomModel: Model<ChatRoom>) {}

    async getRoomData(chatRoomId: string) {
        return await this.chatRoomModel.findOne({ chatRoomId }, { data: { $slice: [0, 100] } }).exec();
    }

    async saveChatData(chat: Chat) {
        const data = await this.getRoomData(chat.chatRoomId);

        if (data == null) {
            const newChatRoom = new this.chatRoomModel({
                chatRoomId: chat.chatRoomId,
                data: [chat],
            });

            await newChatRoom.save();
            return;
        }

        data.data.push(chat);
        await data.save();
    }
}
