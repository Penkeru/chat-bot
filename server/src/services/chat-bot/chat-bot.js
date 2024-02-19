import { BotMessageHandler } from "../bot-message-handler/bot-message-handler.js";
import { ConnectionType } from "../../models/connection-type.js";

export class ChatBot {
    constructor(io) {
        this.io = io;
        this.botMessageHandler = new BotMessageHandler('CB');
        this.chatRoomUsers = [];
    }


    addChatRoomUser(userName, socketId){
        this.chatRoomUsers.push({userName, socketId});
        this.io.emit(ConnectionType.USERS_LIST_STREAM, this.chatRoomUsers);
    }

    removeChatRoomUser(userIndex){
        this.chatRoomUsers.splice(userIndex, 1);
        this.io.emit(ConnectionType.USERS_LIST_STREAM, this.chatRoomUsers);
    }


    onUserConnected(socket) {
        socket.on(ConnectionType.USER_JOINED_ROOM, ({userName}) => {
            this.botMessageHandler.broadcastMessage(socket, ConnectionType.MESSAGES_STEAM, `${userName} has joined the room! Say hello! :)`);
            this.botMessageHandler.sendPrivateMessage(socket, ConnectionType.MESSAGES_STEAM,  `Hey ${userName}, I am the chat bot. Enjoy your stay! :)`);
            this.addChatRoomUser(userName, socket.id);
        });
    }

    onUserSendMessage(socket){
        socket.on(ConnectionType.USER_SEND_MESSAGE, ({message,name, date, streamId})=> {
            this.io.emit(ConnectionType.MESSAGES_STEAM, {message, name, date, streamId});
            const answerToQuestion = this.botMessageHandler.handleQuestions(message);
            if(answerToQuestion){
                this.botMessageHandler.sendPrivateMessage(this.io, ConnectionType.MESSAGES_STEAM, answerToQuestion);
            }
        });
    }

    onUserDisconnected(socket) {
        socket.on(ConnectionType.USER_LEAVE_ROOM, this.onUserLeave.bind(this, socket));
        socket.on(ConnectionType.USER_DISCONNECTED, this.onUserLeave.bind(this, socket));
    }

    handleUserConnection(socket) {
        this.onUserConnected(socket);
        this.onUserSendMessage(socket);
        this.onUserDisconnected(socket);
    }

    onUserLeave(socket) {
        const userIndex = this.chatRoomUsers.findIndex((user) => user.socketId === socket.id);
        if(userIndex !== -1) {
            const userName = this.chatRoomUsers[userIndex].userName;
            this.removeChatRoomUser(userIndex);
            if(this.chatRoomUsers.length > 1) {
                this.botMessageHandler.broadcastMessage(socket, ConnectionType.MESSAGES_STEAM, `${userName} has left the room...`);
            } else {
                this.botMessageHandler.broadcastMessage(socket, ConnectionType.MESSAGES_STEAM, `${userName} has left the room... Please don't leave me alone! :(`);
            }
        }
    }

    listenForMessages() {
        this.io.on('connection', (socket) => {
            this.handleUserConnection(socket);
        });
    }
}