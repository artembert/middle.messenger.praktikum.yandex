import { IChatUser } from './chat-user.interface';

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unreadCount: number;
  lastMessage: {
    user: IChatUser;
    time: Date;
    content: string;
  };
}
