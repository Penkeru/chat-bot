import React from 'react';
import styled from 'styled-components';
import * as styles from './users-list.style';
import { UsersListProps } from './users-list.model';
import { getUserNameColor } from "../../utils/converter.helper";
import classNames from "classnames";

export const UsersList = styled(({className, usersList, currentUsername}: UsersListProps) => {
  return (usersList.length > 0 ?
      (<div {...{className}}>
        <ul className="users-list">
        {usersList.map((user, index) => (
          <li className={classNames({active: currentUsername === user.userName})} style={{color:getUserNameColor(user.userName)}} key={index}>{user.userName}</li>
        ))}
        </ul>
       </div> ): <></>);

})`${styles.UsersList}`;