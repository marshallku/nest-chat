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
    }

    handleDisconnect(client: Socket) {
        ChatGateway.logger.log(`${client.id} is disconnected...`);
    }

    @SubscribeMessage(ChatMethods.Connect)
    handleConnect(client: Socket, { chatRoomId, name }: { chatRoomId: string; name: string }) {
        console.log(`${client.id} is joined to ${chatRoomId}`);
        client.join(chatRoomId);
        this.server.to(chatRoomId).emit(ChatMethods.ReceiveMessage, {
            name: "System",
            text: `Hurray! ${name} has been arrived.`,
        });
    }

    @SubscribeMessage(ChatMethods.SendMessage)
    handleMessage(_: Socket, { name, text, chatRoomId }: { name: string; text: string; chatRoomId: string }) {
        this.server.to(chatRoomId).emit(ChatMethods.ReceiveMessage, { name, text });
    }
}
