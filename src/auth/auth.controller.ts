import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./auth.guard";
import { User } from "#users/users.schema";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() signInDto: Pick<User, "name" | "password">) {
        return this.authService.signIn(signInDto.name, signInDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("signup")
    signUp(@Body() signUpDto: Pick<User, "name" | "password">) {
        return this.authService.signUp(signUpDto.name, signUpDto.password);
    }

    @Get("profile")
    getProfile(@Request() req: { user: User }) {
        return req.user;
    }
}
