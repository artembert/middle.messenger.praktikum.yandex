type Phone = `+${string}`;

declare function structuredClone<T>(obj: T): T;

interface ApiResponse<TPayload extends unknown> {
  isSuccess: boolean;
  payload: TPayload;
}
