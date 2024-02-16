
const CHAT_BOT = 'Chat Bot'; //This is the name of the bot that will be sending messages to the client.
const chatRoomUsers = []; //This is an array that will hold the users that join the chat room.

export class ChatBot {
    constructor(io) {
        this.io = io;
    }

    listenForMessages() {
        this.io.on('connection', (socket) => {
            console.log(`User connected ${socket.id}`);
            socket.on('join_room', ({userName}) => {
                chatRoomUsers.push({userName, id: socket.id});
                socket.emit('chatroom_users', chatRoomUsers);
                socket.emit('receive_message', {
                    message: `Welcome ${userName}, Enjoy your stay!`,
                    name: CHAT_BOT,
                    date :Date.now(),
                });
            });
        });
    }
}