import { css } from 'styled-components';
import { UsersListProps } from './users-list.model';

export const UsersList = css<UsersListProps>(({theme}) => {
  return css`
    font-family: Arial, sans-serif;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    width: 100%;
    height: 100%;
    
    > .users-list{
      list-style-type: none;
      padding: 0;
      margin: 0;

      li {
        padding: 5px 10px;
        cursor: pointer;
        
        &:last-child {
          border-bottom: none;
        }
        
        &.active{
          font-weight: bold;
          background-color: #e5e5e5;
        }
      }
    }
  `;
});