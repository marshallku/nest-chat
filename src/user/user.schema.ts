import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { UserRole } from "#constants/lib/user";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document<string> {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: UserRole.User })
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
