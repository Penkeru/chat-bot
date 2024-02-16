export interface userInfo {
  userName:string;
  id: string;
}

export interface UsersListProps {
  className?: string;
  usersList: userInfo[];
  title?:string;
  currentUsername: string;
}