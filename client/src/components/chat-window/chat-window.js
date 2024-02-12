import {LitElement, html} from 'lit';
import style from './chat-window.css.js';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

/**
 * An example element.
 */
export class ChatWindow extends LitElement {
  static get properties() {
    return {
      messages:{type: Array},
    };
  }

  constructor() {
    super();
    this.messages = [];
    this.socket = io('http://localhost:3000', {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*"
    }});
    this.socket.on('response', this.handleResponse.bind(this));
    this.socket.on('message',  this.handleResponse.bind(this));
  }



  updated(changedProperties) {
    super.updated(changedProperties);
    this.scrollToBottom();
  }

  static styles = [style];

  handleResponse(response) {
    this.messages = [...this.messages, response];
    this.requestUpdate();
  }

  sendMessage(message) {
    this.socket.emit('message', {sender:'other-message', text: message});
    this.messages = [...this.messages, {sender:'user-message', text: message}];
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

  scrollToBottom() {
    // Scroll to the bottom of the chat window
    const chatWindow = this.shadowRoot.getElementById('chatWindow');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  render() {
    return html`
        <div id="chat-window" class="messages-list-container">
            ${this.messages.map(
                    (msg) => html`
                        <div class="message-item-container ${msg.sender}">
                            <div class="message-item">${msg.text}</div>
                        </div>
                    `
            )}
        </div>
        <div class="input-container">
            <input class="message-input" type="text" placeholder="Type your message..." @keydown="${this.handleKeyDown}" />
            <button class="send-message-button" @click="${this.sendMessageClick}">Send</button>
        </div>
    `;
  }
}

window.customElements.define('chat-window', ChatWindow);
