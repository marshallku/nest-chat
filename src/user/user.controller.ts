import { Controller, Get, HttpCode, HttpStatus, Req, UnauthorizedException } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { TokenPayload } from "#auth/auth.service";

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
}
