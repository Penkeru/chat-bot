import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as styles from './chat-room-page.style';
import { ChatRoomPageProps } from './chat-room-page.model';
import { useNavigate } from "react-router-dom";

export const ChatRoomPage = styled(({className, socketConnection, userName}: ChatRoomPageProps) => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userName){
      navigate('/', {replace: true});
    }
  },[userName])

  return (
    <div {...{className}}>
      <h1>Chat Room! hello {userName}</h1>
    </div>
  );

})`${styles.ChatRoomPage}`;