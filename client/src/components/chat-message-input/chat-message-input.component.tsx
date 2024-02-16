import React, { useState } from 'react';
import styled from 'styled-components';
import * as styles from './chat-message-input.style';
import { ChatMessageInputProps } from './chat-message-input.model';

export const ChatMessageInput = styled(({className, onMessageSubmit}: ChatMessageInputProps) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '') {
      onMessageSubmit(message);
      setMessage('');
    }
  }

  return <div {...{className}}>
    <input
      className="message-input"
      placeholder='Message...'
      onChange={(e) => setMessage(e.target.value)}
      value={message}
    />
    <button className='submit-button' onClick={sendMessage}>
      Send Message
    </button>
  </div>
})`${styles.ChatMessageInput}`;