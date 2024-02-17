import { UserInfo } from "../../models/user.model";


export interface UsersListProps {
  className?: string;
  usersList: UserInfo[];
  userConnectionId?: string;
}