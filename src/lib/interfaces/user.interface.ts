import { INewUser } from './new-user.interface';

export interface IUser extends Omit<INewUser, 'password'> {
  id: number;
  avatar: string;
}
