import { UsersEndpoint } from '../../constants/endpoints.constant';
import { HttpError } from '../../lib/http/http-error';
import { Http } from '../../lib/http/http';
import { newPasswordMapper } from './mappers/new-password.mapper';
import { INewPassword } from '../../lib/interfaces/new-password.interface';

interface IChangePasswordApiResponseSuccess extends ApiResponse<undefined> {
  isSuccess: true;
}

interface IChangePasswordApiResponseFailed
  extends ApiResponse<Error | unknown> {
  isSuccess: false;
}

const http = new Http();

export function changePasswordApi(
  newPassword: INewPassword,
): Promise<
  IChangePasswordApiResponseSuccess | IChangePasswordApiResponseFailed
> {
  const newPasswordDto = newPasswordMapper.toDTO(newPassword);

  return http
    .put<undefined>(UsersEndpoint.CHANGE_PASSWORD, {
      data: JSON.stringify(newPasswordDto),
      withCredentials: true,
    })
    .then(() => ({
      isSuccess: true,
      payload: undefined,
    }))
    .catch((error) => {
      if (error instanceof HttpError) {
        return {
          isSuccess: false,
          payload: error.payload,
        };
      }
      return {
        isSuccess: false,
        payload: error,
      };
    });
}
