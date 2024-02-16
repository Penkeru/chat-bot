import { css } from 'styled-components';
import { MainPageProps } from './main-page.model';

export const MainPage = css<MainPageProps>(() => {
  return css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #F5F7FF;
    color: #002169;
    
    > .form-container{
      width: 400px;
      margin: 0 auto 0 auto;
      padding: 32px;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 28px;
      border-radius: 12px;
      text-align:center;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      
      .form-title{
        font-size: 24px;
        font-weight: bold;
      }
      
      .form-input{
        padding: 8px 16px;
        border: 1px solid #B2BCD2;
        width: 312px;
        border-radius: 8px;
        transition: 0.3s;
        font-size: 21px;
        font-weight: 500;
        
        &:focus{
          border: 2px solid #3156FF;
        }
      }
      
      .form-button{
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
  `;
});

