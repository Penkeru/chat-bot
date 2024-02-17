export interface MessageItem {
  message: string;
  name: string;
  date: string;
  streamId: string;
}


export interface ChatMessagesListProps {
  className?: string;
  messages: MessageItem[];
  userStreamId?: string;
}