import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as styles from './chat-room-page.style';
import { ChatRoomPageProps } from './chat-room-page.model';
import { useNavigate } from "react-router-dom";
import { UsersList } from "../../components/users-list/users-list.component";
import { ChatMessagesList } from "../../components/chat-message-list/chat-messages-list.component";
import { ChatMessageInput } from "../../components/chat-message-input/chat-message-input.component";

const MESSAGE_STEAM = 'receive_message';
const USERS_LIST_STREAM = 'chatroom_users';

export const ChatRoomPage = styled(({className, userName, socketConnection}: ChatRoomPageProps) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const navigate = useNavigate();

  const onLeaveRoomClick = useCallback(() => {
    navigate('/', {replace: true});
  },[navigate]);

  useEffect(()=>{
    if(!userName){
      navigate('/', {replace: true});
    }
  },[userName, navigate])

  const sendMessage = useCallback((message:string)=>{
    if (message !== '') {
      const date = Date.now();
      socketConnection.emit('send_message', { name:userName, message, date });
    }
  },[socketConnection, userName]);

 useEffect(()=> {
    if(socketConnection){

      socketConnection.on('receive_message', (recievedMessage) => {
        setMessagesReceived((prevMessages) => prevMessages.concat(recievedMessage));
      });

      socketConnection.on(USERS_LIST_STREAM, (usersList) => {
        setUsersList(usersList);
      });
    }

    return () => {
      if(socketConnection) {
        socketConnection.off(MESSAGE_STEAM);
        socketConnection.off(USERS_LIST_STREAM);
      }
    }
 },[socketConnection])

  return (
    <div {...{className}}>
      <div className="side-bar">
        <h1 className="room-title">Chat room</h1>
        <UsersList usersList={usersList} currentUsername={userName}/>
        <button className="leave-button" onClick={onLeaveRoomClick}>Leave Room</button>
      </div>

      <div className="chatbox-container">
        <ChatMessagesList {...{messages:messagesRecieved}}/>
        <ChatMessageInput {...{onMessageSubmit:sendMessage}}/>
      </div>
    </div>
  );

})`${styles.ChatRoomPage}`;