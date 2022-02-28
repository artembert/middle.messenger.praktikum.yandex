type Phone = `+${string}`;

interface ApiResponse<TPayload extends unknown> {
  isSuccess: boolean;
  payload?: TPayload | Error | unknown;
}
