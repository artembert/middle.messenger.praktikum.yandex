import { Store } from '../../lib/store/store';
import { IChat } from '../../lib/interfaces/chat';
import { getChatToken } from './get-chat-token';

export async function chooseChat(chat: IChat): Promise<void> {
  const store = new Store();
  const tokenRes = await getChatToken(chat.id);
  if (tokenRes.isSuccess) {
    store.setState(
      'currentChat',
      structuredClone({ ...chat, token: tokenRes.payload }),
    );
  }
}
