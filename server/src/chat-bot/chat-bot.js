const CHAT_BOT = 'Chat Bot'; //This is the name of the bot that will be sending messages to the client.
const chatRoomUsers = []; //This is an array that will hold the users that join the chat room.
const ConnectionType  = {
    MESSAGES_STEAM : 'messages_stream',
    USERS_LIST_STREAM : 'chatroom_users',
    USER_SEND_MESSAGE : 'send_message',
    USER_LEAVE_ROOM : 'leave_room',
    USER_CONNECTED :'user_connected',
    USER_JOINED_ROOM : 'user_joined_room',
    USER_DISCONNECTED : 'disconnect',
}

export class ChatBot {
    constructor(io) {
        this.io = io;
    }

    handleUserConnection(socket) {
        socket.on(ConnectionType.USER_JOINED_ROOM, ({userName}) => {
            chatRoomUsers.push({userName, userConnectionId: socket.id});
            socket.broadcast.emit(ConnectionType.MESSAGES_STEAM, {
                message: `${userName} has joined the room! Yay!!`,
                name: CHAT_BOT,
                date: Date.now(),
            });
            socket.emit(ConnectionType.MESSAGES_STEAM, {
                message: `Howdy ${userName}, Enjoy your stay! :)`,
                name: CHAT_BOT,
                date :Date.now(),
            });

            this.io.emit(ConnectionType.USERS_LIST_STREAM, chatRoomUsers);
        });

        socket.on(ConnectionType.USER_SEND_MESSAGE, ({message,name, date})=> {
            this.io.emit(ConnectionType.MESSAGES_STEAM, {message, name, date});
        });

        socket.on(ConnectionType.USER_LEAVE_ROOM, this.onUserLeave.bind(this, socket));
        socket.on(ConnectionType.USER_DISCONNECTED, this.onUserLeave.bind(this, socket));
    }

    onUserLeave(socket) {
        const userIndex = chatRoomUsers.findIndex((user) => user.userConnectionId === socket.id);
        if(userIndex !== -1) {
            const userName = chatRoomUsers[userIndex].userName;
            chatRoomUsers.splice(userIndex, 1);

            socket.broadcast.emit(ConnectionType.MESSAGES_STEAM, {message:`${userName} has left the room... So sad! :(`, name: CHAT_BOT, date: Date.now()});
            this.io.emit(ConnectionType.USERS_LIST_STREAM, chatRoomUsers);
        }
    }

    listenForMessages() {
        this.io.on('connection', (socket) => {
            this.handleUserConnection(socket);
        });
    }
}