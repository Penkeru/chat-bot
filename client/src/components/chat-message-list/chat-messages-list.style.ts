import { css } from 'styled-components';
import { ChatMessagesListProps } from "./chat-messages-list.model";

export const ChatMessagesList = css<ChatMessagesListProps>(({theme}) => {
  return css`
    height: 100%;
    overflow-y: auto;
    scroll-behavior: smooth;
  `;
});