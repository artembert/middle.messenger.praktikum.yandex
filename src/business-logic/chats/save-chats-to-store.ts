import { Store } from '../../lib/store/store';
import { IChat } from '../../lib/interfaces/chat';

export function saveChatsToStore(chats: IChat[]): void {
  const store = new Store();
  store.setState('chats', [...chats.map((item) => structuredClone(item))]);
}
