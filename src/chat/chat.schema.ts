import { HydratedDocument, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ChatType } from "#constants";

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "Room", required: true })
    chatRoomId: string;

    @Prop({ default: ChatType.Message })
    type: ChatType;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    text: string;

    @Prop({ default: new Date().toISOString() })
    createdAt: string;

    @Prop()
    customData?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
