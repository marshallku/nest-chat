import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from "@nestjs/common";
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
        await this.friendsService.addFriendToUser(req.user.sub, userId);
    }

    @HttpCode(HttpStatus.OK)
    @Get("list")
    @ApiOperation({ summary: "Add friend with public id of a user" })
    async getFriends(@Request() req: { user: TokenPayload }) {
        return await this.friendsService.findFriendsOfUser(req.user.sub);
    }
}
