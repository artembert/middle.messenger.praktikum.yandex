import { INewUserDTO } from '../../auth/dto/new-user.dto';

export interface IChatUserDTO
  extends Omit<INewUserDTO, 'password' | 'display_name'> {
  avatar: string;
}
