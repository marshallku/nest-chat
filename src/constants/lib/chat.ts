export const enum ChatMethods {
    Connect = "Connect",
    Error = "Error",
    ReceiveMessage = "ReceiveMessage",
    SendMessage = "SendMessage",
    FetchMessages = "FetchMessages",
    GetPreviousMessages = "GetPreviousMessages",
}

export const enum ChatType {
    Message = "Message",
    SystemMessage = "SystemMessage",
}

export const CHAT_DATA_LIMIT = 100;
