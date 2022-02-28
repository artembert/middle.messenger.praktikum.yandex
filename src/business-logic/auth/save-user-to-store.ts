import { IUser } from '../../lib/interfaces/user.interface';
import { Store } from '../../lib/store/store';

export function saveUserToStore(user: IUser): void {
  const store = new Store();
  store.setState('user', user);
}
