import { HttpError } from '../../lib/http/http-error';
import { ChatsEndpoint } from '../../constants/endpoints.constant';
import { Http } from '../../lib/http/http';

interface IResponseSuccess extends ApiResponse<undefined> {
  isSuccess: true;
}

interface IResponseFailed extends ApiResponse<Error | unknown> {
  isSuccess: false;
}

const http = new Http();

export function createChatsApi(
  title: string,
): Promise<IResponseSuccess | IResponseFailed> {
  return http
    .post<undefined>(ChatsEndpoint.INDEX, {
      withCredentials: true,
      data: JSON.stringify({ title }),
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
