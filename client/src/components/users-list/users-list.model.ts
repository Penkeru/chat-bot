export interface userInfo {
  userName:string;
  userConnectionId: string;
}

export interface UsersListProps {
  className?: string;
  usersList: userInfo[];
  userConnectionId?: string;
}