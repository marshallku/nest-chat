import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";
import { MONGO_CONNECTION_NAME } from "#constants";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name, MONGO_CONNECTION_NAME) private userModel: Model<User>) {}

    async create(createUserDto: Pick<User, "name" | "password">) {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findOne(name: string): Promise<User | undefined> {
        return this.userModel.findOne({ name }).exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find({}, { password: 0 }).exec();
    }
}
