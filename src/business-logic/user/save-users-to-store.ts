import { Store } from '../../lib/store/store';
import { IUser } from '../../lib/interfaces/user.interface';

export function saveUsersToStore(users: IUser[]): void {
  const store = new Store();
  store.setState('users', users);
}
