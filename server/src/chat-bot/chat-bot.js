import { isAnswerToQuestion, isAQuestion } from "../utils/helper.js";

const CHAT_BOT = 'CB'; //This is the name of the bot that will be sending messages to the client.
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

const questionsList = [];

export class ChatBot {
    constructor(io) {
        this.io = io;
    }

    handleUserConnection(socket) {
        socket.on(ConnectionType.USER_JOINED_ROOM, ({userName}) => {
            chatRoomUsers.push({userName, userConnectionId: socket.id});
            socket.broadcast.emit(ConnectionType.MESSAGES_STEAM, {
                message: ` ${userName} has joined the room! Say hello! :)`,
                name: CHAT_BOT,
                date: Date.now(),
            });
            socket.emit(ConnectionType.MESSAGES_STEAM, {
                message: `Howdy ${userName}, I am the chat bot. Enjoy your stay! :)`,
                name: CHAT_BOT,
                date :Date.now(),
            });

            this.io.emit(ConnectionType.USERS_LIST_STREAM, chatRoomUsers);
        });

        socket.on(ConnectionType.USER_SEND_MESSAGE, ({message,name, date, streamId})=> {
            this.io.emit(ConnectionType.MESSAGES_STEAM, {message, name, date, streamId});
            const answerToQuestion = this.handleQuestions(message, name);
            if(answerToQuestion){
                this.io.emit(ConnectionType.MESSAGES_STEAM, {message: answerToQuestion, name: CHAT_BOT, date: Date.now()});
            }
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

    handleQuestions(text, userName) {
        if (isAQuestion(text)) {
            const cleanedText = text.replace(/[^\w\s]/gi, '').toLowerCase();
            const index = questionsList.findIndex(item => item.identifier === cleanedText);
            if (index !== -1) {
                if(questionsList[index].answer !== null) {
                    return `The answer is: ${questionsList[index].answer}, thanks to ${questionsList[index].userAnswered} who provided the answer.`;
                } else {
                    return `I am still waiting for an answer to that question. I will let you know when I get one.`;
                }
            } else {
                questionsList.push({originalQuestion: text, answer: null, userAnswered: null, identifier: cleanedText});
                return "I don't know what the answer for that question, Does someone else know?";
            }
        } else {
            const unansweredQuestions = questionsList.filter(question => question.answer === null);
            for (const question of unansweredQuestions) {
               if(isAnswerToQuestion(question.originalQuestion, text)) {
                   question.answer = text;
                   question.userAnswered = userName;

               }
            }
            return "";
        }
    }
}