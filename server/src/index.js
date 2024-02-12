import express from 'express';
import httpServer from 'http';
import { Server } from 'socket.io';
import { ChatBot } from './chat-bot/chat-bot.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
const http =  httpServer.createServer(app);

//create a new chat bot
const chatBot = new ChatBot();
const io = new Server(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

io.on('connection', (socket) => {
    console.log('user connected');
    chatBot.onUserJoin(socket);
    socket.on('message', (message) => {
        console.log('message:', message);
        if(chatBot.checkIfChatBotQuestion(message.text)) {
            const answer = chatBot.handleMessage(message.text);
            if(answer) {
                socket.emit('response', {sender:'bot-message', text: answer});
            }
        } else {
            socket.broadcast.emit('message', message);
        }
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        chatBot.onUserLeave(socket);
    });
});


http.listen(port, () => {
    console.log(`listening on *:${port}`);
});