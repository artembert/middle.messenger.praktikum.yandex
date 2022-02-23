import { EventBus } from '../EventBus/EventBus';
import { set } from '../data-utils/set';

export interface GlobalState {
  storeValue: string;
}

export const enum STORE_EVENT {
  UPDATE = 'update',
}

export class Store {
  static instance: Store;

  private _state: GlobalState = {
    storeValue: 'store-value',
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
    storeValue: '',
  };
}
