import { css } from 'styled-components';
import { ChatRoomPageProps } from './chat-room-page.model';

export const ChatRoomPage = css<ChatRoomPageProps>(({theme}) => {
  return css`
    padding: 20px;
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
      padding: 10px;
      border-bottom: 2px solid darkgray;
      padding-bottom: 20px;
    }
    
    
    .chatbox-container{
      overflow: auto;
      padding: 10px;
      height: 60vh;
      display:flex;
      flex-direction: column;
      gap: 20px;
      justify-content: space-between;
    }
    
    .chat-input-container{
      border-top: 2px solid darkgray;
      padding: 10px;
      padding-top: 20px;
    }
  `;
});