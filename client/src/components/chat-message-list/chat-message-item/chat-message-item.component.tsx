import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import * as styles from './chat-message-item.style';
import { ChatMessageItemProps } from './chat-message-item.model';
import { formatDateFromTimestamp, getUserNameColor } from "../../../utils/converter.helper";
import classNames from "classnames";

export const ChatMessageItem = styled(({className, message, date, username, isCurrentUser, messageAppearanceTime = 100}: ChatMessageItemProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const {userColor, userInitials} = useMemo(()=> {
    if(username) {
      const currentUserName = username.toUpperCase();
      const userColor = getUserNameColor(currentUserName);
      const userInitials = currentUserName.length > 2 ? currentUserName.slice(0,2) : currentUserName;
      return {userColor, userInitials};
    } else{
      return {};
    }
  },[username]);
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
        <span>{cleanMessage}</span>
        <div className="message-date">
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
})`${styles.ChatMessageItem}`;