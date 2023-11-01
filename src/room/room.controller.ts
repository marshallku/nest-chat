import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UnauthorizedException } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RoomService } from "./room.service";
import { AddUserRequest, CreateRoomRequest } from "./room.dto";
import { ChatUserRole } from "#constants";

@Controller("room")
@ApiTags("Chat room API")
export class RoomController {
    constructor(private roomService: RoomService) {}

    @HttpCode(HttpStatus.OK)
    @Post("create")
    @ApiOperation({ summary: "Create Room" })
    createRoom(@Request() req: { user: { sub: string } }, @Body() createRoomDto: CreateRoomRequest) {
        if (!req.user || !req.user.sub) {
            throw new UnauthorizedException();
        }

        return this.roomService.createRoom({ adminUser: req.user.sub, ...createRoomDto });
    }

    @HttpCode(HttpStatus.OK)
    @Get("list")
    @ApiOperation({ summary: "Get chat rooms of user" })
    async getRooms(@Request() req: { user: { sub: string } }) {
        if (!req.user || !req.user.sub) {
            throw new UnauthorizedException();
        }

        return this.roomService.findByUserId(req.user.sub);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post("add-user")
    @ApiOperation({ summary: "Add users to room" })
    async addUser(@Request() req: { user: { sub: string } }, @Body() { chatRoomId, users }: AddUserRequest) {
        if (!req.user || !req.user.sub) {
            throw new UnauthorizedException();
        }

        const room = await this.roomService.findOne(chatRoomId);
        const currentUserInRoom = room.users.find(({ user }) => user.toString() === req.user.sub);

        if (
            !currentUserInRoom ||
            (currentUserInRoom.role !== ChatUserRole.Admin && currentUserInRoom.role !== ChatUserRole.Operator)
        ) {
            throw new UnauthorizedException();
        }

        await this.roomService.addUsers(chatRoomId, users);
    }
}
