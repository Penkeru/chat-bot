import { css } from 'styled-components';
import { ChatMessageInputProps } from './chat-message-input.model';

export const ChatMessageInput = css<ChatMessageInputProps>(({theme}) => {
  return css`
    display:flex;
    align-items:center;
    justify-content:space-between;
    
    .message-input{
      padding: 14px;
      margin-right: 16px;
      width: 80%;
      border-radius: 6px;
      border: 1px solid #3156FF;
      font-size: 0.9rem;
    }
    
    .submit-button{
      background-color: #3156FF;
      color: #FFFFFF;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      font-size: 14px;
      border-radius: 8px;
      padding: 10px 16px;
      border:0;
      font-weight: bold;
      line-height: 21px;
      cursor: pointer;
    }
  `;
});