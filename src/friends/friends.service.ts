import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "#user/user.service";

@Injectable()
export class FriendsService {
    constructor(private userService: UserService) {}

    async addFriendToUser(userId: string, friendId: string) {
        const user = await this.userService.findOneBy({ _id: userId });
        const friend = await this.userService.findOneBy({ publicId: friendId });

        if (!friend) {
            throw new BadRequestException("There are no such user with that public id");
        }

        user.friends.push(friend._id);
        console.log(user.friends);
        await user.save();
    }
}
