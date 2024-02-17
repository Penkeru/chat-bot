import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as styles from './chat-messages-list.style';
import { ChatMessagesListProps } from "./chat-messages-list.model";
import { formatDateFromTimestamp, getUserNameColor } from "../../utils/converter.helper";
import classNames from "classnames";

export const ChatMessagesList = styled(({className, messages, userStreamId}: ChatMessagesListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);


  return <div {...{className}} ref={containerRef}>
    {messages.map((msg, i) => (
      <div className="message-container" key={i}>
        <div className="message-user-avatar" style={{background:getUserNameColor(msg.name)}}>
          <span>{msg.name.slice(0,2)}</span>
        </div>
        <div className={classNames('message-text', {'current-user': msg.streamId === userStreamId})}>
          <span>{msg.message}</span>
          <div className="message-date">
            <span>{formatDateFromTimestamp(msg.date).time}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
})`${styles.ChatMessagesList}`;