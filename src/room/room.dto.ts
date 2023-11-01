import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomRequest {
    @ApiProperty({ description: "ID of user who participates in a chat room" })
    users: string[];

    @ApiProperty({ description: "Name of a chat room" })
    name: string;
}

export class AddUserRequest {
    @ApiProperty({ description: "ID of room" })
    chatRoomId: string;

    @ApiProperty({ description: "ID of user who participates in a chat room" })
    users: string[];
}
