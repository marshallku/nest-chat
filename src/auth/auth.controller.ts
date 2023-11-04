import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { User } from "#user/user.schema";
import { TOKEN_COOKIE_KEY } from "#constants";
import { Public } from "#utils";
import { AuthService } from "./auth.service";
import { SignInRequest, SignInResponse } from "./auth.dto";

@Controller("auth")
@ApiTags("Auth API")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    @ApiOperation({ summary: "Login" })
    @ApiCreatedResponse({ type: SignInResponse })
    async signIn(@Res({ passthrough: true }) response: Response, @Body() signInDto: SignInRequest) {
        const { token, user } = await this.authService.signIn(signInDto.name, signInDto.password);
        // FIXME: Add security options
        response.cookie(TOKEN_COOKIE_KEY, token);
        return user;
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("signup")
    @ApiOperation({ summary: "Sign Up" })
    @ApiCreatedResponse({ type: User })
    async signUp(@Res({ passthrough: true }) response: Response, @Body() signUpDto: Pick<User, "name" | "password">) {
        const { token, user } = await this.authService.signUp(signUpDto.name, signUpDto.password);
        // FIXME: Add security options
        response.cookie(TOKEN_COOKIE_KEY, token);
        return user;
    }

    @Get("profile")
    @ApiOperation({ summary: "Get profile of user" })
    @ApiCreatedResponse({ type: User })
    getProfile(@Req() req: { user: User }) {
        return req.user;
    }
}
