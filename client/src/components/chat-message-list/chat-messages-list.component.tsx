import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as styles from './chat-messages-list.style';
import { ChatMessagesListProps } from "./chat-messages-list.model";
import { formatDateFromTimestamp, getUserNameColor } from "../../utils/converter.helper";

export const ChatMessagesList = styled(({className, messages}: ChatMessagesListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);


  return <div {...{className}} ref={containerRef}>
    {messages.map((msg, i) => (
      <div className="message-container" key={i}>
        <div className="message-info">
          <span className="message-user" style={{color:getUserNameColor(msg.name)}}>{msg.name}</span>
          <span className="message-date">
              {formatDateFromTimestamp(msg.date)}
            </span>
        </div>
        <div className="message-text">
          <span>{msg.message}</span>
        </div>
      </div>
    ))}
  </div>
})`${styles.ChatMessagesList}`;