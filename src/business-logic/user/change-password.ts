import { AsyncServiceResponse } from '../types/async-service-response.type';
import { changePasswordApi } from '../../api/auth/change-password.api';
import { INewPassword } from '../../lib/interfaces/new-password.interface';

interface ChangePasswordSuccess extends AsyncServiceResponse {
  isSuccess: true;
  payload: undefined;
}

interface ChangePasswordFailed extends AsyncServiceResponse {
  isSuccess: false;
  payload: unknown;
}

export async function changePassword(
  newPassword: INewPassword,
): Promise<ChangePasswordSuccess | ChangePasswordFailed> {
  const res = await changePasswordApi(newPassword);
  if (!res.isSuccess) {
    return {
      isSuccess: false,
      payload: res.payload,
    };
  }
  return {
    isSuccess: true,
    payload: undefined,
  };
}
