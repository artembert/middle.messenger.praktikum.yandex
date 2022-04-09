import { INewUser } from './new-user.interface';

export interface IChatUser extends Omit<INewUser, 'password' | 'displayName'> {
  avatar: string;
}
