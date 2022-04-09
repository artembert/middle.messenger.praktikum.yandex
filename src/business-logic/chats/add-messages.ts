import { IChatMessage } from '../../lib/interfaces/chat-message.interface';
import { Store } from '../../lib/store/store';

export function addMessages(messages: IChatMessage[]): void {
  const store = new Store();
  const existingMessages = store.getState().chatMessages;
  store.setState('chatMessages', [
    ...existingMessages,
    ...messages.map((item) => structuredClone(item)),
  ]);
}
