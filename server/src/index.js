import express from 'express';
import httpServer from 'http';
import { Server } from 'socket.io';
import { ChatBot } from './chat-bot/chat-bot.js';
import cors from 'cors';



const app = express();
const port = process.env.PORT || 3000;
const botName = process.env.CHAT_BOT_NAME || 'Chat Bot';





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
    console.log('new member has joined!');
    socket.on('message', (message) => {
        console.log('message:', message);
        const answer = chatBot.processMessage(message);
        socket.emit('response', answer);
    })
});


http.listen(port, () => {
    console.log(`listening on *:${port}`);
});