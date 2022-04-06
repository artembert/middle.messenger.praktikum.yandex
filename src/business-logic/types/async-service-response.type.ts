export interface AsyncServiceResponse<TPayload extends unknown = unknown> {
  isSuccess: boolean;
  payload?: TPayload | Error;
}
