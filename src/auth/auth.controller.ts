import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "#users/users.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() signInDto: Pick<User, "name" | "password">) {
        return this.authService.signIn(signInDto.name, signInDto.password);
    }
}
