import { css } from 'styled-components';
import { ChatMessagesListProps } from "./chat-messages-list.model";

export const ChatMessagesList = css<ChatMessagesListProps>(({theme}) => {
  return css`
    max-height: 90%;
    overflow-y: auto;
    scroll-behavior: smooth; 
  
    .message-container {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 10px;
      max-width: 70%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      
      .message-info {
        font-size: 12px;
        color: #002169;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .message-user{
          font-weight: 600;
          font-size: 14px;
        }
        
        .message-date {
          font-size: 12px;
          color: #002169;
        }
      }

      .message-text {
        color: #002169;
        font-size: 14px;
      }
    }
  `;
});