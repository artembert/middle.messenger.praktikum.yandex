import { HttpError } from '../../lib/http/http-error';
import { UsersEndpoint } from '../../constants/endpoints.constant';
import { Http } from '../../lib/http/http';
import { IUser } from '../../lib/interfaces/user.interface';
import { userMapper } from '../auth/mappers/user.mapper';
import { IUserDTO } from '../auth/dto/user.dto';

interface IResponseSuccess extends ApiResponse<IUser[]> {
  isSuccess: true;
}

interface IResponseFailed extends ApiResponse<Error | unknown> {
  isSuccess: false;
}

const http = new Http();

export function searchForUsersApi(
  login: string,
): Promise<IResponseSuccess | IResponseFailed> {
  return http
    .post<IUserDTO[]>(UsersEndpoint.SEARCH, {
      withCredentials: true,
      data: JSON.stringify({ login }),
    })
    .then((res) => {
      const users = res.map((item) => userMapper.toDomain(item));
      return { isSuccess: true, payload: users };
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
