import { Store } from '../../lib/store/store';

export function clearUsersInStore(): void {
  const store = new Store();
  store.setState('users', []);
}
