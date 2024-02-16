import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRouterProps } from "./app-router.model";
import { io } from "socket.io-client";
import { ChatRoomPage } from "../pages/chat-room-page/chat-room-page.component";
import { MainPage } from "../pages/main-page/main-page.component";

// connect to the socketio server with port 4000
const socketConnection = io('http://localhost:4000');

export const AppRouter = ({userName, setUserName}:AppRouterProps) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage {...{userName, setUserName, socketConnection}} />} />
        <Route path="/chat-room" element={<ChatRoomPage {...{userName, socketConnection}} />} />
      </Routes>
    </Router>
  );

}