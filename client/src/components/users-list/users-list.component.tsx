import React from 'react';
import styled from 'styled-components';
import * as styles from './users-list.style';
import { UsersListProps } from './users-list.model';
import { getUserNameColor } from "../../utils/converter.helper";
import classNames from "classnames";

export const UsersList = styled(({className, usersList, userConnectionId}: UsersListProps) => {
  return (usersList.length > 0 ?
      (<div {...{className}}>
        <ul className="users-list">
        {usersList.map((user, index) => (
          <li className={classNames({active: userConnectionId === user.userConnectionId})}
              key={index}>
            <div className="initials-container"
                 style={{background:getUserNameColor(user.userName)}}
            >
              <span>{user.userName.slice(0,2)}</span>
            </div>
            <div className="name-container">
              <span>{user.userName}</span>
            </div>


          </li>
        ))}
        </ul>
       </div> ): <></>);

})`${styles.UsersList}`;