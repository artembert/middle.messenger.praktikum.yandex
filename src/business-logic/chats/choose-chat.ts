import { Store } from '../../lib/store/store';
import { IChat } from '../../lib/interfaces/chat';

export function chooseChat(chat: IChat): void {
  const store = new Store();
  store.setState('currentChat', structuredClone(chat));
}
