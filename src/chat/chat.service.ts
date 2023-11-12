import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Chat, ChatRoom } from "./chat.schema";
import { CHAT_DATA_CONNECTION_NAME, CHAT_DATA_LIMIT } from "#constants";

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(ChatRoom.name, CHAT_DATA_CONNECTION_NAME) private chatRoomModel: Model<ChatRoom>,
        @InjectModel(Chat.name, CHAT_DATA_CONNECTION_NAME) private chatModel: Model<Chat>,
    ) {}

    async getRoomData(chatRoomId: string) {
        return await this.chatRoomModel
            .findOne({ chatRoomId }, { data: { $slice: -CHAT_DATA_LIMIT } })
            .populate({ path: "data" })
            .exec();
    }

    async saveChatData(chatData: Chat) {
        const chat = new this.chatModel(chatData);
        const data = await this.getRoomData(chat.chatRoomId);

        await chat.save();

        if (data == null) {
            const newChatRoom = new this.chatRoomModel({
                chatRoomId: chat.chatRoomId,
                data: [chat._id],
            });

            await newChatRoom.save();
            return;
        }

        await this.chatRoomModel.findOneAndUpdate({ chatRoomId: chatData.chatRoomId }, { $push: { data: chat._id } });
    }
}
