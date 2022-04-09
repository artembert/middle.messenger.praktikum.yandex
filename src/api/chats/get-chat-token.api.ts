import { ChatsEndpoint } from '../../constants/endpoints.constant';
import { Http } from '../../lib/http/http';
import { HttpError } from '../../lib/http/http-error';

interface TokenApiResponse {
  token: string;
}

interface IResponseSuccess extends ApiResponse<string> {
  isSuccess: true;
}

interface IResponseFailed extends ApiResponse<Error | unknown> {
  isSuccess: false;
}

const http = new Http();

export function getChatTokenApi(
  chatId: number,
): Promise<IResponseSuccess | IResponseFailed> {
  return http
    .post<TokenApiResponse>(ChatsEndpoint.TOKEN(chatId), {
      withCredentials: true,
    })
    .then((res) => {
      const token = res?.token;
      if (token) {
        return {
          isSuccess: true,
          payload: token,
        };
      }
      return {
        isSuccess: false,
        payload: 'Unable to load token',
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
