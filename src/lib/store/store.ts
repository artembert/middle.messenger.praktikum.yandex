import { EventBus } from '../event-bus/event-bus';
import { set } from '../data-utils/set';
import { INewUser } from '../interfaces/new-user.interface';
import { getRandomString } from '../data-utils/get-random-string';
import { IUser } from '../interfaces/user.interface';
import { IChat } from '../interfaces/chat';

export interface GlobalState {
  storeValue: string;
  initialNewUser: INewUser;
  user: IUser | null;
  chats: IChat[];
  users: IUser[];
}

export const enum STORE_EVENT {
  UPDATE = 'update',
}

const localStorageKey = 'messenger-app-store';

export class Store {
  static instance: Store;

  private _state!: GlobalState;

  private _eventBus: EventBus = new EventBus();

  constructor() {
    if (Store.instance) {
      // eslint-disable-next-line no-constructor-return
      return Store.instance;
    }
    const savedState = localStorage.getItem(localStorageKey);
    this._state = savedState
      ? JSON.parse(savedState) ?? getInitialState()
      : getInitialState();
    this.on(STORE_EVENT.UPDATE, () => {
      localStorage.setItem(localStorageKey, JSON.stringify(this._state));
    });
    Store.instance = this;
  }

  getState(): GlobalState {
    return this._state;
  }

  setState(path: keyof GlobalState | string, value: any): GlobalState {
    this._state = set(this._state, path, value);
    this._eventBus.emit(STORE_EVENT.UPDATE);
    return this._state;
  }

  clearState(): GlobalState {
    this._state = getInitialState();
    this._eventBus.emit(STORE_EVENT.UPDATE);
    return this._state;
  }

  on(event: string, callback: (...args: any) => void): void {
    this._eventBus.on(event, callback);
  }
}

function getInitialState(): GlobalState {
  return {
    storeValue: 'store-value',
    initialNewUser: getInitialNewUser(),
    user: null,
    chats: [],
    users: [],
  };
}

function getInitialNewUser(): INewUser {
  const userSuffix = getRandomString(6);
  return {
    firstName: 'Дмитрий',
    secondName: 'Федоров',
    displayName: '',
    email: `dmitry95-${userSuffix}@gmail.com`,
    login: `dmitry_95-${userSuffix}`,
    password: 'gcP!@S&Qup3^%uS#',
    phone: '+73841370944',
  };
}
