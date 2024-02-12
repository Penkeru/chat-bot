import {css} from 'lit';

export default css`
:host {
      display: block;
      font-family: Arial, sans-serif;
    }

    #messages {
      list-style-type: none;
      padding: 0;
    }

    .message {
      margin: 5px;
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 10px;
    }

    .user-message {
      text-align: right;
    }

    .bot-message {
      text-align: left;
    }
`;
