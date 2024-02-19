import express from 'express';
import httpServer from 'http';
import cors from 'cors';
import { Server } from "socket.io";
import { AppController } from "./controllers/appController.js";
import { ChatBot } from "./services/chat-bot/chat-bot.js";

const app = express();
const serverPort = 4000;
const socketPort = 3000;

app.use(cors());

const server =  httpServer.createServer(app);
const appController = new AppController(app);

const io = new Server(server, {
    cors: {
        origin: `http://localhost:${socketPort}`,
        methods: ['GET', 'POST'],
    },
});

const chatBot = new ChatBot(io);
chatBot.listenForMessages();

appController.attachControllers();
server.listen(serverPort, () => {
    console.log(`listening on *:${serverPort}`);
});