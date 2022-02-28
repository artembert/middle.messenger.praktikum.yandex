import { AsyncServiceResponse } from '../types/async-service-response.type';
import { IUser } from '../../lib/interfaces/user.interface';
import { INewUser } from '../../lib/interfaces/new-user.interface';
import { registerNewUserApi } from '../../api/auth/register-new-user.api';
import { getUserApi } from '../../api/auth/get-user.api';

interface RegisterNewUserSuccess extends AsyncServiceResponse {
  isSuccess: true;
  payload: IUser;
}

interface RegisterNewUserFailed extends AsyncServiceResponse {
  isSuccess: false;
  payload: unknown;
}

export async function registerNewUser(
  newUser: INewUser,
): Promise<RegisterNewUserSuccess | RegisterNewUserFailed> {
  const registerResponse = await registerNewUserApi(newUser);
  if (registerResponse.isSuccess) {
    const res = await getUserApi();
    if (res.isSuccess) {
      return {
        isSuccess: true,
        payload: res.payload,
      };
    }
    return {
      isSuccess: false,
      payload: res.payload,
    };
  }
  return {
    isSuccess: false,
    payload: registerResponse.payload,
  };
}
