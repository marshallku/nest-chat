import { Body, Controller, HttpCode, HttpStatus, Post, Request } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { TokenPayload } from "#auth/auth.service";
import { FriendsService } from "./friends.service";
import { AddFriendRequest } from "./friends.dto";

@Controller("friends")
@ApiTags("Friends API")
export class FriendsController {
    constructor(private friendsService: FriendsService) {}

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post("add")
    @ApiOperation({ summary: "Add friend with public id of a user" })
    async addFriend(@Request() req: { user: TokenPayload }, @Body() { userId }: AddFriendRequest) {
        console.log(userId);
        await this.friendsService.addFriendToUser(req.user.sub, userId);
    }
}
