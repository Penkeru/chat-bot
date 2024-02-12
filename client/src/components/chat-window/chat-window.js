import {LitElement, html} from 'lit';
import style from './chat-window.css.js';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

/**
 * An example element.
 */
export class ChatWindow extends LitElement {
  static get properties() {
    return {
      name: {type: String},
      messages:{type: Array},
    };
  }

  constructor() {
    super();
    this.name = 'Unknown User';
    this.messages = [];
    this.socket = io('http://localhost:3000', {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*"
    }});
    this.socket.on('response', this.handleResponse.bind(this));
    this.socket.on('message',  this.handleResponse.bind(this));
  }

  static styles = [style];

  handleResponse(response) {
    this.messages = [...this.messages, response];
    this.requestUpdate();
  }

  sendMessage(message) {
    this.socket.emit('message', {sender:false, text: message, name: this.name});
    this.messages = [...this.messages, {sender:true, text: message, name: this.name}];
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.sendMessage(event.target.value);
      event.target.value = '';
    }
  }

  sendMessageClick() {
    const input = this.shadowRoot.getElementById('messageInput');
    const message = input.value.trim();
    if (message !== '') {
      this.sendMessage(message);
      input.value = '';
    }
  }

  render() {
    return html`
        <ul id="messages">
            ${this.messages.map(
                    (msg) => html`
            <li class="message ${msg.sender ? 'user-message' : 'regular-message'}">${msg.name+': '+msg.text}</li>
          `
            )}
        </ul>
        <input id="messageInput" type="text" placeholder="Type your message..." @keydown="${this.handleKeyDown}" />
        <button @click="${this.sendMessageClick}">Send</button>
    `;
  }
}

window.customElements.define('chat-window', ChatWindow);
