import { Logger } from "@nestjs/common";
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatMethods } from "#constants";

@WebSocketGateway({ namespace: "chat" })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private static readonly logger = new Logger(ChatGateway.name);

    @WebSocketServer()
    private server: Server;

    afterInit() {
        ChatGateway.logger.log("Socket Server Init Complete");
    }

    handleConnection(client: Socket) {
        ChatGateway.logger.log(`${client.id}(${client.handshake.query["username"]}) is connected!`);

        this.server.emit(ChatMethods.ReceiveMessage, {
            name: `admin`,
            text: `join chat.`,
        });
    }

    handleDisconnect(client: Socket) {
        ChatGateway.logger.log(`${client.id} is disconnected...`);
    }

    @SubscribeMessage(ChatMethods.SendMessage)
    handleMessage(_: Socket, payload: { name: string; text: string }) {
        this.server.emit(ChatMethods.ReceiveMessage, payload);
    }
}
