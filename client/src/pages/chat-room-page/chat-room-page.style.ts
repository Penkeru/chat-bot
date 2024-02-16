import { css } from 'styled-components';
import { ChatRoomPageProps } from './chat-room-page.model';

export const ChatRoomPage = css<ChatRoomPageProps>(({theme}) => {
  return css`
    padding: 20px;
    margin: 20px auto 0;
    max-width: 900px;
    display: grid;
    grid-template-columns: 200px calc(90% - 160px);
    overflow: hidden;
    gap: 20px;
    
    overflow-y: auto; /* Enable vertical scrolling if content exceeds window height */
    height: 100%;
    background: linear-gradient(135deg, #8ab4f8, #c0d7fc);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    
    .side-bar {
      border-right: 1px solid #dfdfdf;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      gap: 20px;
      
      > .room-title {
        color: #ffffff;
        font-size: 30px;
        font-weight: 700;
      }
      
      > .leave-button {
        background-color: #3156FF;
        color: #FFFFFF;
        padding: 10px 16px;
        border-radius: 8px;
        border:0;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        font-weight: bold;
        font-size: 14px;
        line-height: 21px;
        cursor: pointer;
      }
    }
    
    .chatbox-container{
      height: 85vh;
      overflow: auto;
      padding: 10px 10px 10px 40px;
      display:flex;
      flex-direction: column;
      gap: 20px;
      justify-content: space-between;
    }
  `;
});