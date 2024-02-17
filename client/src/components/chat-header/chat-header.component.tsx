import React from 'react';
import styled from 'styled-components';
import * as styles from './chat-header.style';
import { ChatHeaderProps } from './chat-header.model';
import { getUserNameColor } from "../../utils/converter.helper";

export const ChatHeader = styled(({className, onLeaveRoomClick, userName, onlineUsers}: ChatHeaderProps) => {
  return (
    <div {...{className}}>
      <div className="user-info-container">
        <div className="user-avatar" style={{background:getUserNameColor(userName)}}><span>{userName.slice(0,2)}</span></div>
        <div className="user-name-container">
          <span>{userName}</span>
        </div>
      </div>
      <div className="user-panel-options">
        <div className="online-users-container">
          <span>Online Users: {onlineUsers.length}</span>
        </div>

        <button className="leave-button" onClick={onLeaveRoomClick}>Leave</button>
      </div>
    </div>
  );
})`${styles.ChatHeader}`;