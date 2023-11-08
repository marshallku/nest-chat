import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UnauthorizedException,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { TokenPayload } from "#auth/auth.service";
import { UserService } from "./user.service";
import { AddPublicIdRequest } from "./user.dto";

@Controller("user")
@ApiTags("User API")
export class UserController {
    constructor(private userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Get("list")
    @ApiOperation({ summary: "Get all users" })
    async getAllUsers(@Req() req: { user: TokenPayload }) {
        if (!req.user || !req.user.sub) {
            throw new UnauthorizedException();
        }
        const user = await this.userService.findAll();

        return user;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post("add-public-id")
    @ApiOperation({ summary: "Add public id to user" })
    async addPublicId(@Req() req: { user: TokenPayload }, @Body() { publicId }: AddPublicIdRequest) {
        if (!req.user || !req.user.sub) {
            throw new UnauthorizedException();
        }

        const userWithPublicId = await this.userService.findOneBy({ publicId });

        if (userWithPublicId) {
            throw new BadRequestException("Already have same user with that public id", {
                cause: new Error(),
                description: "Please user another public id",
            });
        }

        const user = await this.userService.findOneBy({ _id: req.user.sub });

        if (!user) {
            throw new UnauthorizedException();
        }

        user.publicId = publicId;

        await user.save();
    }
}
