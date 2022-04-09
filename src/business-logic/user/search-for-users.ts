import { AsyncServiceResponse } from '../types/async-service-response.type';
import { searchForUsersApi } from '../../api/users';
import { IUser } from '../../lib/interfaces/user.interface';
import { saveUsersToStore } from './save-users-to-store';

interface Success extends AsyncServiceResponse {
  isSuccess: true;
  payload: IUser[];
}

interface Failed extends AsyncServiceResponse {
  isSuccess: false;
  payload: undefined;
}

export async function searchForUsers(login: string): Promise<Success | Failed> {
  const usersRes = await searchForUsersApi(login);
  if (usersRes.isSuccess) {
    saveUsersToStore(usersRes.payload);
    return {
      isSuccess: true,
      payload: usersRes.payload,
    };
  }
  return {
    isSuccess: false,
    payload: undefined,
  };
}
