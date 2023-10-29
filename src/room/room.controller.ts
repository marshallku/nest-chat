import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, Request } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RoomService } from "./room.service";
import { CreateRoomRequest } from "./room.dto";

@Controller("room")
@ApiTags("Chat room API")
export class RoomController {
    constructor(private roomService: RoomService) {}

    @HttpCode(HttpStatus.OK)
    @Post("create")
    @ApiOperation({ summary: "Create Room" })
    createRoom(@Request() req: { user: { sub: string } }, @Body() createRoomDto: CreateRoomRequest) {
        console.log(req.user);
        if (!req.user || !req.user.sub) {
            throw new BadRequestException();
        }

        return this.roomService.createRoom({ adminUser: req.user.sub, ...createRoomDto });
    }
}
