import { UsersEndpoint } from '../../constants/endpoints.constant';
import { HttpError } from '../../services/http/http-error';
import { Http } from '../../services/http/http';
import { IUser } from '../../lib/interfaces/user.interface';
import { IEditableUserInfo } from '../../lib/interfaces/editable-user-info';
import { userInfoEditableMapper } from './mappers/update-user.mapper';
import { IUserDTO } from './dto/user.dto';
import { userMapper } from './mappers/user.mapper';

interface IUpdateUserApiResponseSuccess extends ApiResponse<IUser> {
  isSuccess: true;
}

interface IUpdateUserApiResponseFailed extends ApiResponse<Error | unknown> {
  isSuccess: false;
}

const http = new Http();

export function updateUserApi(
  user: IEditableUserInfo,
): Promise<IUpdateUserApiResponseSuccess | IUpdateUserApiResponseFailed> {
  const userInfoDto = userInfoEditableMapper.toDTO(user);

  return http
    .put<IUserDTO>(UsersEndpoint.UPDATE_INFO, {
      data: JSON.stringify(userInfoDto),
      withCredentials: true,
    })
    .then((res) => ({
      isSuccess: true,
      payload: userMapper.toDomain(res),
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
