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
      Send Message
    </button>
  </div>
})`${styles.ChatMessageInput}`;