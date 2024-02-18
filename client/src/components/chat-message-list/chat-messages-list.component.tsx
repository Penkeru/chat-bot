import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as styles from './chat-messages-list.style';
import { ChatMessagesListProps } from "./chat-messages-list.model";
import { ChatMessageItem } from "./chat-message-item/chat-message-item.component";

export const ChatMessagesList = styled(({className, messages, userStreamId}: ChatMessagesListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);


  return <div {...{className}} ref={containerRef}>
    {messages.map((msg, i) => (
      <ChatMessageItem message={msg.message} date={msg.date} username={msg.name} isCurrentUser={msg.streamId === userStreamId} key={i}/>
    ))}
  </div>

})`${styles.ChatMessagesList}`;