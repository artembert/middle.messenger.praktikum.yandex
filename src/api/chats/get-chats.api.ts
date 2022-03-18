import { ChatsEndpoint } from '../../constants/endpoints.constant';
import { Http } from '../../lib/http/http';
import { HttpError } from '../../lib/http/http-error';
import { chatMapper } from './mappers/chat.mapper';
import { IChatDto } from './dto/chat.dto';
import { IChat } from '../../lib/interfaces/chat';

interface IResponseSuccess extends ApiResponse<IChat[]> {
  isSuccess: true;
}

interface IResponseFailed extends ApiResponse<Error | unknown> {
  isSuccess: false;
}

const http = new Http();

export function getChatsApi(): Promise<IResponseSuccess | IResponseFailed> {
  return http
    .get<IChatDto[]>(ChatsEndpoint.INDEX, {
      withCredentials: true,
    })
    .then((res) => {
      const chats = res.map((item) => chatMapper.toDomain(item));
      return {
        isSuccess: true,
        payload: chats,
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
