type EventHandler = (...args: any) => void;

export class EventDispatcher {
  protected _node!: Element;

  private _events = new Set<{ eventName: string; callback: EventHandler }>();

  constructor(element?: Element) {
    if (element) {
      this.node = element;
    }
  }

  get node(): Element {
    return this._node;
  }

  set node(node: Element) {
    this._node = node;
  }

  add(eventName: string, callback: (e: Event) => void): void {
    this._checkNode();
    this._node.addEventListener(eventName, callback);
    this._events.add({ eventName, callback });
  }

  remove(eventName: string, callback: (e: Event) => void): void {
    this._checkNode();
    this._node.removeEventListener(eventName, callback);
    this._events.delete({ eventName, callback });
  }

  clear() {
    this._events.forEach(({ eventName, callback }) => {
      this._node.removeEventListener(eventName, callback);
    });
    this._events = new Set();
  }

  private _checkNode() {
    if (!this._node) {
      throw new Error('No node');
    }
  }
}
