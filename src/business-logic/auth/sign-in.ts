import { AsyncServiceResponse } from '../types/async-service-response.type';
import { signInApi } from '../../api/auth/sign-in.api';
import { ICredentials } from '../../lib/interfaces/credentials.interface';
import { getUserApi } from '../../api/auth/get-user.api';
import { saveUserToStore } from './save-user-to-store';
import { logout } from './logout';
import { validationMessage } from '../../presentation-logic/forms/validate-input';

interface SignInSuccess extends AsyncServiceResponse {
  isSuccess: true;
  payload: undefined;
}

interface SignInFailed extends AsyncServiceResponse {
  isSuccess: false;
  payload: string;
}

export async function signIn(
  credentials: ICredentials,
): Promise<SignInSuccess | SignInFailed> {
  const res = await signInApi(credentials);
  if (!res.isSuccess) {
    if (res.payload?.code === 400) {
      const logoutRes = await logout();
      if (!logoutRes.isSuccess) {
        return {
          isSuccess: false,
          payload: validationMessage.userAlreadyInSystem,
        };
      }
      await signIn(credentials);
    }
  }
  const userRes = await getUserApi();
  if (!userRes.isSuccess) {
    return {
      isSuccess: false,
      payload: userRes.payload as string,
    };
  }
  saveUserToStore(userRes.payload);
  return Promise.resolve({ isSuccess: true, payload: undefined });
}
