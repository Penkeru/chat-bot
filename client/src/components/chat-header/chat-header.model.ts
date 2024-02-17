import { UserInfo } from "../../models/user.model";

export interface ChatHeaderProps {
  className?: string;
  onLeaveRoomClick: () => void;
  userName: string;
  onlineUsers: UserInfo[];
}