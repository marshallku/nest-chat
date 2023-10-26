import { Injectable } from "@nestjs/common";

export interface User {
    id: number;
    name: string;
    password: string;
}

@Injectable()
export class UsersService {
    // FIXME: Never use this user
    private readonly users: User[] = [
        { id: 0, name: "root", password: "justForTesting!" },
        { id: 1, name: "john", password: "justForTesting!" },
        { id: 2, name: "jane", password: "justForTesting!" },
    ];

    async findOne(name: string): Promise<User | undefined> {
        return this.users.find((user) => user.name === name);
    }
}
