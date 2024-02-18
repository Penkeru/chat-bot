import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import * as styles from './chat-message-input.style';
import { ChatMessageInputProps } from './chat-message-input.model';

export const ChatMessageInput = styled(({className, onMessageSubmit}: ChatMessageInputProps) => {
  const [message, setMessage] = useState('');

  const sendMessage = useCallback(() => {
    if (message !== '') {
      onMessageSubmit(message);
      setMessage('');
    }
  },[onMessageSubmit, message]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      sendMessage();
    }
  };

  return <div {...{className}}>
    <input
      className="message-input"
      placeholder='Message...'
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={onKeyDown}
      value={message}
    />
    <button className='submit-button' onClick={sendMessage}>
      <svg style={{width:'24px', height:'24px'}} viewBox="0 0 24 24">
        <path fill="#3156FF" d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
      </svg>
    </button>
  </div>
})`${styles.ChatMessageInput}`;