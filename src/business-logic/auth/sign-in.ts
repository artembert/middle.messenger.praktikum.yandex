import { AsyncServiceResponse } from '../types/async-service-response.type';
import { signInApi } from '../../api/auth/sign-in.api';
import { ICredentials } from '../../lib/interfaces/credentials.interface';
import { getUserApi } from '../../api/auth/get-user.api';
import { saveUserToStore } from './save-user-to-store';

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
    return res;
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
