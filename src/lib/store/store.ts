import { EventBus } from '../EventBus/EventBus';
import { set } from '../data-utils/set';
import { INewUser } from '../interfaces/new-user.interface';
import { getRandomString } from '../data-utils/get-random-string';

export interface GlobalState {
  storeValue: string;
  initialNewUser: INewUser;
}

export const enum STORE_EVENT {
  UPDATE = 'update',
}

export class Store {
  static instance: Store;

  private _state: GlobalState = {
    ...getInitialState(),
  };

  private _eventBus: EventBus = new EventBus();

  constructor() {
    if (Store.instance) {
      // eslint-disable-next-line no-constructor-return
      return Store.instance;
    }
    Store.instance = this;
  }

  getState(): GlobalState {
    return this._state;
  }

  setState(path: string, value: any): GlobalState {
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
