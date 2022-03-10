import { AsyncServiceResponse } from '../types/async-service-response.type';
import { INewUser } from '../../lib/interfaces/new-user.interface';
import { registerNewUserApi } from '../../api/auth/register-new-user.api';

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
  return Promise.resolve({ isSuccess: true, payload: undefined });
}
