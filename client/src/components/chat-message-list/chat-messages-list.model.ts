export interface MessageItem {
  message: string;
  name: string;
  date: string;
}


export interface ChatMessagesListProps {
  className?: string;
  messages: MessageItem[];
}