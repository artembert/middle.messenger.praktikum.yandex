import { AsyncServiceResponse } from '../types/async-service-response.type';
import { getUserApi, signInApi } from '../../api/auth';
import { ICredentials } from '../../lib/interfaces/credentials.interface';
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
  const signInFirstAttempt = await signInApi(credentials);
  if (!signInFirstAttempt.isSuccess) {
    if (signInFirstAttempt.payload?.code === 400) {
      const logoutRes = await logout();
      if (!logoutRes.isSuccess) {
        return {
          isSuccess: false,
          payload: validationMessage.userAlreadyInSystem,
        };
      }
      const signInSecondAttempt = await signInApi(credentials);
      if (!signInSecondAttempt.isSuccess) {
        return {
          isSuccess: false,
          payload: signInSecondAttempt.payload.message,
        };
      }
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
