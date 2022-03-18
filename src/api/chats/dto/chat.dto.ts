import { IUserDTO } from '../../auth/dto/user.dto';

export interface IChatDto {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: IUserDTO;
    time: string;
    content: string;
  };
}
