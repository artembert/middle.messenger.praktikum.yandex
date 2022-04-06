import { INewUser } from './new-user.interface';

export interface IEditableUserInfo extends Omit<INewUser, 'password'> {}
