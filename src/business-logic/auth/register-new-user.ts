import { AsyncServiceResponse } from '../types/async-service-response.type';
import { INewUser } from '../../lib/interfaces/new-user.interface';
import { registerNewUserApi } from '../../api/auth';
import { signIn } from './sign-in';

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
  const signInRes = await signIn({
    login: newUser.login,
    password: newUser.password,
  });
  if (!signInRes.isSuccess) {
    return {
      isSuccess: false,
      payload: signInRes.payload,
    };
  }
  return Promise.resolve({ isSuccess: true, payload: undefined });
}
