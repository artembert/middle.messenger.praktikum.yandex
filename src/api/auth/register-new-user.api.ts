import { INewUser } from '../../lib/interfaces/new-user.interface';
import { newUserMapper } from './mappers/new-user.mapper';
import { AuthEndpoint } from '../../constants/endpoints.constant';
import { HttpError } from '../../lib/http/http-error';
import { Http } from '../../lib/http/http';
import { IUserId } from '../../lib/interfaces/user-id.interface';

interface IRegisterApiResponseSuccess extends ApiResponse<IUserId> {
  isSuccess: true;
}

interface IRegisterApiResponseFailed extends ApiResponse<Error | unknown> {
  isSuccess: false;
}

const http = new Http();

export function registerNewUserApi(
  newUser: INewUser,
): Promise<IRegisterApiResponseSuccess | IRegisterApiResponseFailed> {
  const newUserDto = newUserMapper.toDTO(newUser);

  return http
    .post<IUserId>(AuthEndpoint.REGISTER, {
      data: JSON.stringify(newUserDto),
    })
    .then((res) => {
      if (typeof res.id === 'number') {
        return {
          isSuccess: true,
          payload: { id: res.id },
        };
      }
      return {
        isSuccess: false,
        payload: res,
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
