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

export function addUsersToChatApi(
  users: number[],
  chatId: number,
): Promise<IResponseSuccess | IResponseFailed> {
  return http
    .put<undefined>(ChatsEndpoint.USERS, {
      withCredentials: true,
      data: JSON.stringify({ users, chatId }),
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
