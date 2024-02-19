import { isAnswerToQuestion, isAQuestion } from "../../utils/helper.js";
import { BotMessageHandler } from "../bot-message-handler/bot-message-handler.js";
import { ConnectionType } from "../../models/connection-type.js";

const questionsList = [];

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
            const answerToQuestion = this.handleQuestions(message);
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

    handleQuestions(text) {
        if (isAQuestion(text)) {
            const cleanedText = text.replace(/[^\w\s]/gi, '').toLowerCase();
            const index = questionsList.findIndex(item => item.identifier === cleanedText);
            if (index !== -1) {
                if(questionsList[index].answer !== null) {
                    return questionsList[index].answer;
                } else {
                    return `I am still waiting for an answer to that question. I will let you know when I get one.`;
                }
            } else {
                questionsList.push({originalQuestion: text, answer: null, identifier: cleanedText});
                return "I don't know what the answer for that question, Does someone else know?";
            }
        } else {
            const unansweredQuestions = questionsList.filter(question => question.answer === null);
            for (const question of unansweredQuestions) {
               if(isAnswerToQuestion(question.originalQuestion, text)) {
                   question.answer = text;
               }
            }
            return "";
        }
    }
}