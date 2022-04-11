import { AsyncServiceResponse } from '../types/async-service-response.type';
import { getChats } from './get-chats';
import { addUsersToChatApi } from '../../api/chats';

interface Success extends AsyncServiceResponse {
  isSuccess: true;
  payload: undefined;
}

interface Failed extends AsyncServiceResponse {
  isSuccess: false;
  payload: Error | unknown;
}

export async function addUsersToChat(
  users: number[],
  chatId: number,
): Promise<Success | Failed> {
  const chatsRes = await addUsersToChatApi(users, chatId);
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
