export class HttpError extends Error {
  public code?: number;

  public payload?: unknown;

  constructor({
    code,
    payload,
    message,
  }: {
    code?: number;
    payload?: unknown;
    message?: string;
  }) {
    super(message);
    this.code = code;
    this.payload = payload;
  }
}
