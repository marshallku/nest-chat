import { ApiProperty } from "@nestjs/swagger";

export class AddPublicIdRequest {
    @ApiProperty({ description: "Public id" })
    publicId: string;
}
