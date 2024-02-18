export interface ChatMessageItemProps {
  className?: string;
  username: string;
  isCurrentUser:boolean;
  message:string;
  date:string;
  messageAppearanceTime?:number;
}