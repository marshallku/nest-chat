import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "#users/users.service";
import { Public } from "./auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() signInDto: Pick<User, "name" | "password">) {
        return this.authService.signIn(signInDto.name, signInDto.password);
    }

    @Get("profile")
    getProfile(@Request() req: { user: User }) {
        return req.user;
    }
}
