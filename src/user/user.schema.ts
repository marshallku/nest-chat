import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";
import { UserRole } from "#constants/lib/user";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: UserRole.User })
    role: UserRole;

    @Prop({ unique: true, sparse: true })
    publicId: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
    friends: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
