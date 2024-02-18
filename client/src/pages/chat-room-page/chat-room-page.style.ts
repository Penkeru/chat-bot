import { css } from 'styled-components';
import { ChatRoomPageProps } from './chat-room-page.model';

export const ChatRoomPage = css<ChatRoomPageProps>(({theme}) => {
  return css`
    margin: 40px auto;
    max-width: 900px;
    display:flex;
    flex-direction:column;
    overflow: hidden;
    gap: 20px;
    border-radius: 20px;
    
    overflow-y: auto; /* Enable vertical scrolling if content exceeds window height */
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    
    .chatroom-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding: 20px;
      border-bottom: 2px solid darkgray;
    }
    
    
    .chatbox-container{
      overflow: auto;
      padding: 0 20px;
      height: 60vh;
      display:flex;
      flex-direction: column;
      gap: 20px;
      justify-content: space-between;
    }
    
    .chat-input-container{
      border-top: 2px solid darkgray;
      padding: 20px;
    }
  `;
});