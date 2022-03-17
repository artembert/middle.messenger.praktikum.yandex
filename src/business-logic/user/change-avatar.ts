import { AsyncServiceResponse } from '../types/async-service-response.type';
import { changeAvatarApi } from '../../api/auth/change-avatar.api';
import { IUser } from '../../lib/interfaces/user.interface';
import { saveUserToStore } from '../auth/save-user-to-store';

interface ChangeAvatarSuccess extends AsyncServiceResponse {
  isSuccess: true;
  payload: IUser;
}

interface ChangeAvatarFailed extends AsyncServiceResponse {
  isSuccess: false;
  payload: unknown;
}

export async function changeAvatar(
  formData: FormData,
): Promise<ChangeAvatarSuccess | ChangeAvatarFailed> {
  const res = await changeAvatarApi(formData);
  if (!res.isSuccess) {
    return {
      isSuccess: false,
      payload: res.payload,
    };
  }
  saveUserToStore(res.payload);
  return {
    isSuccess: true,
    payload: res.payload,
  };
}
