import { IUser } from './user.interface';

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unreadCount: number;
  lastMessage: {
    user: IUser;
    time: string;
    content: string;
  };
}
