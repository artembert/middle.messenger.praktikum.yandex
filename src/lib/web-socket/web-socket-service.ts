export interface ISocketOutgoingMessage {
  type: string;
  content?: string;
}

export interface ISocketIncomingMessage {
  type: string;
  data?: string;
}

const defaultInterval = 60 * 1000;

export abstract class WebSocketService {
  protected _ws: WebSocket | null = null;

  private _pingInterval: number | null = null;

  private _isOpened: boolean = false;

  connect(path: string): void {
    this._ws = new WebSocket(path);
  }

  dispose(): void {
    if (this._pingInterval) {
      clearInterval(this._pingInterval);
      this._pingInterval = null;
    }
    if (this._isOpened) {
      this._ws?.close();
    }
  }

  start(interval = defaultInterval) {
    this.subscribe('open', () => {
      this._isOpened = true;
    });
    this._pingInterval = window.setInterval(() => this.ping(), interval);
    this.subscribe('close', () => this.dispose());
  }

  ping(): void {
    this.send({ type: 'ping' });
  }

  send(message: ISocketOutgoingMessage): void {
    this._ws?.send(JSON.stringify(message));
  }

  subscribe(
    event: string,
    callback: (incomingMessage?: ISocketIncomingMessage) => void,
  ): void {
    this._ws?.addEventListener(event, callback);
  }
}
