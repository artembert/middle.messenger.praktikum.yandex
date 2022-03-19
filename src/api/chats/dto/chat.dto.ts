import { IChatUserDTO } from './chat-user.dto';

export interface IChatDto {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: IChatUserDTO;
    time: string;
    content: string;
  };
}
