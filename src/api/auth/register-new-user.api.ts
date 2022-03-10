import { INewUser } from '../../lib/interfaces/new-user.interface';
import { newUserMapper } from './mappers/new-user.mapper';
import { AuthEndpoint } from '../../configs/endpoints.constant';
import { HttpError } from '../../services/http/http-error';
import { Http } from '../../services/http/http';
import { IUserId } from '../../lib/interfaces/user-id.interface';

interface IRegisterApiResponseSuccess extends ApiResponse<IUserId> {
  isSuccess: true;
  payload: IUserId;
}

interface IRegisterApiResponseFailed extends ApiResponse<IUserId> {
  isSuccess: false;
  payload: Error | unknown;
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