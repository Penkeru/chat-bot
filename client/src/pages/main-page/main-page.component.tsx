import React, { useCallback } from 'react';
import styled from 'styled-components';
import * as styles from './main-page.style';
import { MainPageProps } from './main-page.model';
import { useNavigate } from "react-router-dom";

export const MainPage = styled(({className, userName, setUserName, socketConnection}: MainPageProps) => {
  const navigate = useNavigate();

  const onUserNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  },[setUserName]);

  const onSubmitClick = useCallback(() => {
    if(userName){
      socketConnection.emit('join_room', { userName });
      navigate('/chat-room', { replace: true });
    }
  },[socketConnection, userName, navigate]);

  return (
    <div {...{className}}>
      <div className="form-container">
        <h1 className="form-title">Chat Room</h1>
        <input className="form-input" placeholder='Username...'  onChange={onUserNameChange}/>
        <button className="form-button" onClick={onSubmitClick}>Join Room</button>
      </div>
    </div>
  );
})`${styles.MainPage}`;