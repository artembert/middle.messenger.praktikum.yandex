import { AuthEndpoint } from '../../configs/endpoints.constant';
import { Http } from '../../services/http/http';
import { HttpError } from '../../services/http/http-error';

interface ILogoutApiResponseSuccess extends ApiResponse<undefined> {
  isSuccess: true;
}

interface ILogoutApiResponseFailed extends ApiResponse<Error | unknown> {
  isSuccess: false;
}

const http = new Http();

export function logoutApi(): Promise<
  ILogoutApiResponseSuccess | ILogoutApiResponseFailed
> {
  return http
    .post<undefined>(AuthEndpoint.LOGOUT, {
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
