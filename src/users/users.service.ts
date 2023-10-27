import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./users.schema";
import { Model } from "mongoose";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: Pick<User, "name" | "password">) {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findOne(name: string): Promise<User | undefined> {
        return this.userModel.findOne({ name }).exec();
    }
}
