import { AsyncServiceResponse } from '../types/async-service-response.type';
import { logoutApi } from '../../api/auth/logout.api';
import { validationMessage } from '../../presentation-logic/forms/validate-input';
import { Store } from '../../lib/store/store';

interface LogoutSignInSuccess extends AsyncServiceResponse {
  isSuccess: true;
  payload: undefined;
}

interface LogoutFailed extends AsyncServiceResponse {
  isSuccess: false;
  payload: string;
}

export async function logout(): Promise<LogoutSignInSuccess | LogoutFailed> {
  const store = new Store();
  store.clearState();
  const res = await logoutApi();
  if (!res.isSuccess) {
    return {
      isSuccess: false,
      payload: validationMessage.unidentifiedError,
    };
  }
  return Promise.resolve({ isSuccess: true, payload: undefined });
}
