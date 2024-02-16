
const CHAT_BOT = 'ChatBot'; //This is the name of the bot that will be sending messages to the client.
const MAIN_ROOM = 'main-room'; //This is the name of the room that the bot will be sending messages to.
const chatRoomUsers = []; //This is an array that will hold the users that join the chat room.

export class ChatBot {
    constructor(io) {
        this.io = io;
    }

    announceUser(username) {
        this.io.emit('message', {
            message: `${username} has joined Chat Room!`,
            username: CHAT_BOT,
            messageDate: Date.now(),
        });
    }

    greetUser(username, socket) {
        socket.emit('receive_message', {
            message: `Welcome ${username}, Enjoy your stay!`,
            username: CHAT_BOT,
            messageDate :Date.now(),
        });
    }

    updateUsersList(socket) {
        socket.emit('chatroom_users', chatRoomUsers);
    }

    listenForMessages() {
        this.io.on('connection', (socket) => {
            console.log(`User connected ${socket.id}`);
            socket.on('join_room', ({userName}) => {
                chatRoomUsers.push({userName, id: socket.id});
                this.announceUser(userName);
                this.greetUser('userName', socket);
                this.updateUsersList(socket);
            });
        });
    }
}