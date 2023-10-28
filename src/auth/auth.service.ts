import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "#user/user.service";
import { comparePassword, createHashedPassword } from "#utils";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(name: string, password: string) {
        const user = await this.userService.findOne(name);

        if (!user) {
            throw new UnauthorizedException();
        }

        const samePassword = await comparePassword(password, user.password);

        if (!samePassword) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user._id, username: user.name };
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

        const hashedPassword = await createHashedPassword(password);
        const user = await this.userService.create({ name, password: hashedPassword });

        return user.toJSON();
    }
}
