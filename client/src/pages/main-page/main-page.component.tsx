import React, { useCallback } from 'react';
import styled from 'styled-components';
import * as styles from './main-page.style';
import { MainPageProps } from './main-page.model';
import { useNavigate } from "react-router-dom";
import { ConnectionType } from "../../enum/connection-type.enum";

export const MainPage = styled(({className, userName, setUserName, socketConnection}: MainPageProps) => {
  const navigate = useNavigate();

  const onSubmitClick = useCallback(() => {
    if(userName){
      socketConnection.emit(ConnectionType.USER_JOINED_ROOM, { userName });
      navigate('/chat-room', { replace: true });
    }
  },[userName, navigate, socketConnection]);

  const onEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      onSubmitClick();
    }
  };


  return (
    <div {...{className}}>
      <div className="form-container">
        <h1 className="form-title">Chat Room</h1>
        <input className="form-input"
               placeholder='Username...'
               onChange={(e) => setUserName(e.currentTarget.value)}
               value={userName}
               onKeyDown={onEnterPressed}/>
        <button className="form-button"
                onClick={onSubmitClick}>Join Room</button>
      </div>
    </div>
  );
})`${styles.MainPage}`;