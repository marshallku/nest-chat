export const enum UserRole {
    /** Root user of entire application */
    Root = "Root",
    /** Other all users */
    User = "User",
}

export const enum ChatUserRole {
    /** Administrator of chat room */
    Admin = "Admin",
    /** Operator of chat room */
    Operator = "Operator",
    /** Participant of chat room */
    Participant = "User",
}
