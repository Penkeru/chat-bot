import { css } from 'styled-components';
import { ChatRoomPageProps } from './chat-room-page.model';

export const ChatRoomPage = css<ChatRoomPageProps>(({theme}) => {
  return css`
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: 20px;
    
    .users-list-container {
      border-right: 1px solid #dfdfdf;
    }
    
    .chat-room-title {
      
    }
  `;
});