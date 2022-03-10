import { AsyncServiceResponse } from '../types/async-service-response.type';
import { saveUserToStore } from '../auth/save-user-to-store';
import { IEditableUserInfo } from '../../lib/interfaces/editable-user-info';
import { IUser } from '../../lib/interfaces/user.interface';
import { updateUserApi } from '../../api/auth/update-user.api';

interface UpdateUserSuccess extends AsyncServiceResponse {
  isSuccess: true;
  payload: IUser;
}

interface UpdateUserFailed extends AsyncServiceResponse {
  isSuccess: false;
  payload: unknown;
}

export async function updateUser(
  user: IEditableUserInfo,
): Promise<UpdateUserSuccess | UpdateUserFailed> {
  const updateResponse = await updateUserApi(user);
  if (!updateResponse.isSuccess) {
    return {
      isSuccess: false,
      payload: updateResponse.payload,
    };
  }
  saveUserToStore(updateResponse.payload);
  return {
    isSuccess: true,
    payload: updateResponse.payload,
  };
}
