import { AsyncServiceResponse } from '../types/async-service-response.type';
import { getUserApi } from '../../api/auth/get-user.api';
import { saveUserToStore } from './save-user-to-store';

interface AuthorizationSuccess extends AsyncServiceResponse {
  isSuccess: true;
  payload: undefined;
}

interface AuthorizationFailed extends AsyncServiceResponse {
  isSuccess: false;
  payload: undefined;
}

export async function checkAuthorization(): Promise<
  AuthorizationSuccess | AuthorizationFailed
> {
  const signInAttempt = await getUserApi();
  if (signInAttempt.isSuccess) {
    saveUserToStore(signInAttempt.payload);
  }
  return {
    isSuccess: signInAttempt.isSuccess,
    payload: undefined,
  };
}
