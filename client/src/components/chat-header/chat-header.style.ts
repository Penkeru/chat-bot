import { css } from 'styled-components';
import { ChatHeaderProps } from './chat-header.model';

export const ChatHeader = css<ChatHeaderProps>(({theme}) => {
  return css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    
    .user-info-container{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      
      .user-avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        
        > span{
          font-size: 1.2rem;
        }
      }
      
      .user-name-container > span{
        color: #002169;
        font-size: 24px;
      }
    }
    
    .online-users-container{
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 700;
      color: #002169;
    }
    .user-panel-options {
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 20px;
      > .leave-button {
        background-color: #3156FF;
        color: #FFFFFF;
        padding: 10px 16px;
        border-radius: 8px;
        border: 0;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        font-weight: bold;
        font-size: 14px;
        line-height: 21px;
        cursor: pointer;
        width: 116px;
      }
    }
  `;
});