import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as styles from './chat-room-page.style';
import { ChatRoomPageProps } from './chat-room-page.model';
import { useNavigate } from "react-router-dom";
import { UsersList } from "../../components/users-list/users-list.component";
import { ChatMessagesList } from "../../components/chat-message-list/chat-messages-list.component";
import { ChatMessageInput } from "../../components/chat-message-input/chat-message-input.component";
import { ConnectionType } from "../../enum/connection-type.enum";
import { ChatHeader } from "../../components/chat-header/chat-header.component";

export const ChatRoomPage = styled(({className, userName, socketConnection}: ChatRoomPageProps) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const navigate = useNavigate();

  const onLeaveRoomClick = useCallback(() => {
    socketConnection.emit(ConnectionType.USER_LEAVE_ROOM);
    navigate('/', {replace: true});
  },[navigate, socketConnection]);

  const sendMessage = useCallback((message:string)=>{
    if (message !== '') {
      const date = Date.now();
      socketConnection.emit(ConnectionType.USER_SEND_MESSAGE, { name:userName, message, date, streamId:socketConnection.id});
    }
  },[socketConnection, userName]);

 useEffect(()=> {
    if(socketConnection){
      socketConnection.on(ConnectionType.MESSAGES_STEAM, (message) => {
        setMessagesReceived((prevMessages) => prevMessages.concat(message));
      });

      socketConnection.on(ConnectionType.USERS_LIST_STREAM, (usersList) => {
        setUsersList(usersList);
      });
    }

    return () => {
      if(socketConnection) {
        socketConnection.off(ConnectionType.MESSAGES_STEAM);
        socketConnection.off(ConnectionType.USERS_LIST_STREAM);
      }
    }
 },[socketConnection]);

  useEffect(()=>{
    // in case of refresh, if username is not present, redirect to main page
    if(!userName){
      navigate('/', {replace: true});
    }
  },[userName, navigate]);

  return (
    <div {...{className}}>
      <div className="chatroom-header">
        <ChatHeader {...{onLeaveRoomClick:onLeaveRoomClick, userName, onlineUsers: usersList}}/>
      </div>
      <div className="chatbox-container">
        <ChatMessagesList {...{messages:messagesRecieved, userStreamId:socketConnection.id}}/>
      </div>
      <div className="chat-input-container">
        <ChatMessageInput {...{onMessageSubmit:sendMessage}}/>
      </div>
    </div>
  );

})`${styles.ChatRoomPage}`;