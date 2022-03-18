import { UsersEndpoint } from '../../constants/endpoints.constant';
import { HttpError } from '../../lib/http/http-error';
import { Http } from '../../lib/http/http';
import { IUserDTO } from './dto/user.dto';
import { IUser } from '../../lib/interfaces/user.interface';
import { userMapper } from './mappers/user.mapper';

interface IChangeAvatarApiResponseSuccess extends ApiResponse<IUser> {
  isSuccess: true;
}

interface IChangeAvatarApiResponseFailed extends ApiResponse<Error | unknown> {
  isSuccess: false;
}

const http = new Http();

export function changeAvatarApi(
  avatarFormData: FormData,
): Promise<IChangeAvatarApiResponseSuccess | IChangeAvatarApiResponseFailed> {
  return http
    .put<IUserDTO>(UsersEndpoint.UPDATE_AVATAR, {
      data: avatarFormData,
      withCredentials: true,
      isFormData: true,
    })
    .then((userDto) => ({
      isSuccess: true,
      payload: userMapper.toDomain(userDto),
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
