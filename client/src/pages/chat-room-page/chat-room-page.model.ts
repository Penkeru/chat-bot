import { Socket } from "socket.io-client";

export interface ChatRoomPageProps {
  className?: string;
  socketConnection:Socket;
  userName: string;
}