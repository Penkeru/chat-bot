import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import * as styles from './chat-message-item.style';
import { ChatMessageItemProps } from './chat-message-item.model';
import { formatDateFromTimestamp, getUserNameColor } from "../../../utils/converter.helper";
import classNames from "classnames";
import { TypingAnimation } from "../../typing-animation/typing-animation.component";

export const ChatMessageItem = styled(({className, message, date, username, isCurrentUser, messageAppearanceTime = 100}: ChatMessageItemProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const userInitials = useMemo(()=> username.slice(0,2).toUpperCase(),[username]);
  const userColor = useMemo(()=> getUserNameColor(username.toUpperCase()),[username]);
  const cleanMessage = useMemo(()=> message.trim(),[message]);
  const time = useMemo(()=> formatDateFromTimestamp(date).time,[date]);

  useEffect(()=>{
    setTimeout(()=>{
      setVisible(true);
    }, messageAppearanceTime)
  },[])

  return (
    <div {...{className:classNames(className, {'visible':visible})}}>
      <div className="message-user-avatar" style={{background: userColor}}>
        <span>{userInitials}</span>
      </div>
      <div className={classNames('message-text', {'current-user': isCurrentUser})}>
        <TypingAnimation text={cleanMessage}/>
        <div className="message-date">
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
})`${styles.ChatMessageItem}`;