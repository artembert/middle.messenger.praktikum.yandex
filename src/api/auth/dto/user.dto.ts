import { INewUserDTO } from './new-user.dto';

export interface IUserDTO extends Omit<INewUserDTO, 'password'> {
  id: number;
  avatar: string;
}
