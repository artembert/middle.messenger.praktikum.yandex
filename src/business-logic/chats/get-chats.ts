import { AsyncServiceResponse } from '../types/async-service-response.type';
import { IChat } from '../../lib/interfaces/chat';
import { getChatsApi } from '../../api/chats/get-chats.api';
import { saveChatsToStore } from './save-chats-to-store';

interface Success extends AsyncServiceResponse {
  isSuccess: true;
  payload: IChat[];
}

interface Failed extends AsyncServiceResponse {
  isSuccess: false;
  payload: undefined;
}

export async function getChats(): Promise<Success | Failed> {
  const chatsRes = await getChatsApi();
  if (chatsRes.isSuccess) {
    saveChatsToStore(chatsRes.payload);
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
