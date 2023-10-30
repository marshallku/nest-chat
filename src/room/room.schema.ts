import { Document, HydratedDocument, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ChatUserRole } from "#constants/lib/user";

export type RoomUserDocument = HydratedDocument<RoomUser>;

@Schema()
export class RoomUser {
    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    user: Types.ObjectId;

    @Prop({ required: true })
    role: ChatUserRole;
}

export const RoomUserSchema = SchemaFactory.createForClass(RoomUser);

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ type: [RoomUserSchema], required: true })
    users: RoomUser[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
