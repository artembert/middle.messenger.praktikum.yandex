import { AsyncServiceResponse } from '../types/async-service-response.type';
import { INewUser } from '../../lib/interfaces/new-user.interface';
import { registerNewUserApi } from '../../api/auth/register-new-user.api';
import { getUserApi } from '../../api/auth/get-user.api';
import { saveUserToStore } from './save-user-to-store';

interface RegisterNewUserSuccess extends AsyncServiceResponse {
  isSuccess: true;
  payload: undefined;
}

interface RegisterNewUserFailed extends AsyncServiceResponse {
  isSuccess: false;
  payload: unknown;
}

export async function registerNewUser(
  newUser: INewUser,
): Promise<RegisterNewUserSuccess | RegisterNewUserFailed> {
  const registerResponse = await registerNewUserApi(newUser);
  if (!registerResponse.isSuccess) {
    return {
      isSuccess: false,
      payload: registerResponse.payload,
    };
  }
  const userRes = await getUserApi();
  if (!userRes.isSuccess) {
    return {
      isSuccess: false,
      payload: userRes.payload,
    };
  }
  saveUserToStore(userRes.payload);
  return Promise.resolve({ isSuccess: true, payload: undefined });
}
