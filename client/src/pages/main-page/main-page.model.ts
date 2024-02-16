import { Socket } from "socket.io-client";

export interface MainPageProps {
  className?: string;
  userName:string;
  setUserName: (userName: string) => void;
  socketConnection:Socket;
}