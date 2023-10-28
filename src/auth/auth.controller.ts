import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Public } from "./auth.guard";
import { SignInRequest, SignInResponse } from "./auth.dto";
import { User } from "#user/user.schema";

@Controller("auth")
@ApiTags("Auth API")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    @ApiOperation({ summary: "Login" })
    @ApiCreatedResponse({ type: SignInResponse })
    signIn(@Body() signInDto: SignInRequest): Promise<SignInResponse> {
        return this.authService.signIn(signInDto.name, signInDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("signup")
    @ApiOperation({ summary: "Sign Up" })
    @ApiCreatedResponse({ type: User })
    signUp(@Body() signUpDto: Pick<User, "name" | "password">) {
        return this.authService.signUp(signUpDto.name, signUpDto.password);
    }

    @Get("profile")
    @ApiOperation({ summary: "Get profile of user" })
    @ApiCreatedResponse({ type: User })
    getProfile(@Request() req: { user: User }) {
        return req.user;
    }
}
