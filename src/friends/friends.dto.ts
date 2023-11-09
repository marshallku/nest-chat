import { ApiProperty } from "@nestjs/swagger";

export class AddFriendRequest {
    @ApiProperty({ description: "ID of user to add" })
    userId: string;
}
