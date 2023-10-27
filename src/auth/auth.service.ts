import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "#users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(name: string, password: string) {
        const user = await this.userService.findOne(name);

        // FIXME: Must not use plain text
        if (!user || user?.password !== password) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.name };
        const token = await this.jwtService.signAsync(payload);

        return { token };
    }

    async signUp(name: string, password: string) {
        const existingUser = await this.userService.findOne(name);

        if (!name || !password) {
            throw new BadRequestException("Invalid input");
        }

        if (existingUser) {
            throw new BadRequestException("Already have same user with that name", {
                cause: new Error(),
                description: "Please sign up with another user name",
            });
        }

        const user = await this.userService.create({ name, password });
        return user.toJSON();
    }
}
