import { css } from 'styled-components';
import { ChatMessagesListProps } from "./chat-messages-list.model";

export const ChatMessagesList = css<ChatMessagesListProps>(({theme}) => {
  return css`
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
        color: #3156FF;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > span {
          font-weight: bold;
          margin-right: 5px;
        }
      }

      .message-text {
        color: #000000;
        font-size: 14px;
      }
    }
  `;
});