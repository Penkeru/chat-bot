import {css} from 'lit';

export default css`
  :host {
    display: block;
    font-family: Arial, sans-serif;
    background-color: #f5f5f5; 
    border: 1px solid #ccc; 
    border-radius: 10px;
    padding: 20px;
  }

  .messages-list-container {
    padding: 0;
    margin: 0;
    overflow-y: auto;
    max-height: 300px;
  }
  .message-item-container {
    display: flex;
    margin: 10px;
  }

  .message-item-container.user-message{
    justify-content: flex-end;
  }
  
  .message-item-container.other-message{
    justify-content: flex-start;
  }

  .message-item-container.bot-message{
    justify-content: center;
  }
  
  .message-item {
    padding: 10px;
    border-radius: 10px;
    text-align: left;
    white-space:pre-line;
  }

  .message-item-container.user-message .message-item {
    background-color: #4CAF50;
    color: #ffffff;
  }

  .message-item-container.bot-message{
    justify-content: center;
    background-color: #FFB04C;
    color: #ffffff;
  }

  .message-item-container.other-message .message-item {
    background-color: #008CBA;
  }

  .input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .input-container .message-input {
    flex: 1;
    margin-right: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .input-container .send-message-button {
    padding: 8px 16px;
    border: none;
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
`;
