import { AsyncServiceResponse } from '../types/async-service-response.type';
import { getChatTokenApi } from '../../api/chats/get-chat-token.api';

interface Success extends AsyncServiceResponse {
  isSuccess: true;
  payload: string;
}

interface Failed extends AsyncServiceResponse {
  isSuccess: false;
  payload: undefined;
}

export async function getChatToken(chatId: number): Promise<Success | Failed> {
  const chatsRes = await getChatTokenApi(chatId);
  if (chatsRes.isSuccess) {
    return {
      isSuccess: true,
      payload: chatsRes.payload,
    };
  }
  return {
    isSuccess: false,
    payload: undefined,
  };
}
