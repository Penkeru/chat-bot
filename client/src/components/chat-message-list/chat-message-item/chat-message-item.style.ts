import { css } from 'styled-components';
import { ChatMessageItemProps } from './chat-message-item.model';

export const ChatMessageItem = css<ChatMessageItemProps>(({theme}) => {
  return css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    margin-bottom: 15px;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    
    &.visible{
      opacity: 1;
    }

    .message-user-avatar{
      min-width: 50px;
      max-width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #3156FF;
      color: #FFFFFF;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .message-text {
      position: relative;
      border-radius: 8px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      padding: 20px 20px 30px 20px;
      color: #000000;
      font-size: 14px;
      background: #e2e2e2;


      &.current-user{
        background-color: #3156FF;
        color: #FFFFFF;
        >.message-date{
          color: #ffffff;
        }
      }

      .message-date{
        position: absolute;
        bottom: 5px;
        right: 7px;
        font-size: 10px;
        color: #000000;
      }
    }
  `;
});