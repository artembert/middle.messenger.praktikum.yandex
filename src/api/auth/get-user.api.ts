import { AuthEndpoint } from '../../constants/endpoints.constant';
import { Http } from '../../services/http/http';
import { IUser } from '../../lib/interfaces/user.interface';
import { IUserDTO } from './dto/user.dto';
import { userMapper } from './mappers/user.mapper';
import { HttpError } from '../../services/http/http-error';

interface IGetUserApiResponseSuccess extends ApiResponse<IUser> {
  isSuccess: true;
}

interface IGetUserApiResponseFailed extends ApiResponse<Error | unknown> {
  isSuccess: false;
}

const http = new Http();

export function getUserApi(): Promise<
  IGetUserApiResponseSuccess | IGetUserApiResponseFailed
> {
  return http
    .get<IUserDTO>(AuthEndpoint.USER, {
      withCredentials: true,
    })
    .then((res) => {
      const user = userMapper.toDomain(res);
      return {
        isSuccess: true,
        payload: user,
      };
    })
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
