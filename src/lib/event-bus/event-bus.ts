type EventHandler = (...args: any) => void;

export class EventBus {
  protected listeners: Record<string, EventHandler[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (...args: any) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: (...args: any) => void): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: any): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }

  removeAll(event: string): void {
    delete this.listeners[event];
  }
}
