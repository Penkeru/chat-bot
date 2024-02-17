import { css } from 'styled-components';
import { UsersListProps } from './users-list.model';

export const UsersList = css<UsersListProps>(({theme}) => {
  return css`
    font-family: Arial, sans-serif;
    max-width: 400px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 8px;
    width: 100%;
    max-height: 620px;
    overflow-y: auto;
    overflow-x:hidden;
    
    > .users-list{
      list-style-type: none;
      padding: 0;
      margin: 0;

      li {
        padding: 5px 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
        
        .initials-container{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          
          > span{
            font-size: 1.2rem;
          }
        }
        
        .name-container{
            span{
              font-size: 1.2rem;
              color: #002169;
            }
        }
        &.active {
          .name-container{
            span{
              font-weight: bold;
            }
          }
        }
      }
    }
  `;
});