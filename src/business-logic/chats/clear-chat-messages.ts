import { Store } from '../../lib/store/store';

export function clearChatMessages(): void {
  const store = new Store();
  store.setState('chatMessages', []);
}
