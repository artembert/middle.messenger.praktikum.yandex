export class HttpError extends Error {
  public code?: number;

  public payload: string;

  constructor({
    code,
    payload,
    message,
  }: {
    code?: number;
    payload?: {
      reason?: string;
    };
    message?: string;
  }) {
    super(message);
    this.code = code;
    const hasReason = payload && 'reason' in payload;
    const isReasonString = hasReason && typeof payload.reason === 'string';
    if (hasReason && isReasonString) {
      this.payload = payload.reason as string;
    } else {
      this.payload = payload?.reason?.toString() ?? '';
    }
  }
}
