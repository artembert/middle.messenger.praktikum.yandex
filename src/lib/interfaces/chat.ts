import { IChatUser } from './chat-user.interface';

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unreadCount: number;
  lastMessage: ILastMessage | undefined;
}

export interface ILastMessage {
  user: IChatUser;
  time: Date;
  content: string;
}
