import { css } from 'styled-components';
import { ChatMessageInputProps } from './chat-message-input.model';

export const ChatMessageInput = css<ChatMessageInputProps>(({theme}) => {
  return css`
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap: 10px;
    
    .message-input{
      color: #2f2f2f;
      font-family: Raleway, sans-serif;
      font-size: 16px;
      background-color: #d2d2d2;
      width: 100%;
      height: 40px;
      max-height: 120px;
      border: none;
      padding: 10px 15px;
      resize: none;
      box-sizing: border-box;
      border-radius: 10px;
      transition: 0.3s background-color;
    }
    
    .submit-button{
      cursor: pointer;
      background: white;
      border: none;
    }
  `;
});