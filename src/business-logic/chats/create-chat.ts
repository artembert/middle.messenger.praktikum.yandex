import { AsyncServiceResponse } from '../types/async-service-response.type';
import { getChats } from './get-chats';
import { createChatsApi } from '../../api/chats/create-chat.api';

interface Success extends AsyncServiceResponse {
  isSuccess: true;
  payload: undefined;
}

interface Failed extends AsyncServiceResponse {
  isSuccess: false;
  payload: Error | unknown;
}

export async function createChat(title: string): Promise<Success | Failed> {
  const chatsRes = await createChatsApi(title);
  if (!chatsRes.isSuccess) {
    return {
      isSuccess: false,
      payload: chatsRes.payload,
    };
  }
  const getChatsRes = await getChats();
  if (getChatsRes.isSuccess) {
    return {
      isSuccess: true,
      payload: undefined,
    };
  }
  return {
    isSuccess: false,
    payload: undefined,
  };
}
