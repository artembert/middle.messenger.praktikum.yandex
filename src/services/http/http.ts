import { HttpError } from './http-error';

const enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type RequestHeaders = Record<string, string>;

type Options = {
  method: METHOD;
  data?: any;
  timeout?: number;
  headers?: RequestHeaders;
  withCredentials?: boolean;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

const defaultHeaders: RequestHeaders = {
  'content-type': 'application/json',
};

/* eslint-disable class-methods-use-this */
export class Http {
  get<T extends unknown>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<T> {
    return request(url, { ...options, method: METHOD.GET }, options.timeout);
  }

  put<T extends unknown>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<T> {
    return request(url, { ...options, method: METHOD.PUT }, options.timeout);
  }

  post<T extends unknown>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<T> {
    return request(url, { ...options, method: METHOD.POST }, options.timeout);
  }

  patch<T extends unknown>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<T> {
    return request(url, { ...options, method: METHOD.PATCH }, options.timeout);
  }

  delete<T extends unknown>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<T> {
    return request(url, { ...options, method: METHOD.DELETE }, options.timeout);
  }
}

/* eslint-enable class-methods-use-this */

function request<T extends unknown>(
  url: string,
  options: Options = { method: METHOD.GET },
  timeout = 5000,
): Promise<T> {
  const { method, data } = options;

  return new Promise((resolve, reject) => {
    if (!method) {
      reject(new Error('No method provided'));
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open(method, resolveUrl(url, options));
    setHeaders(xhr, defaultHeaders);
    setHeaders(xhr, options.headers);
    xhr.withCredentials = options.withCredentials ?? false;

    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject(
          new HttpError({
            code: xhr.status,
            payload: JSON.parse(xhr.response),
          }),
        );
      }
      const response = JSON.parse(xhr.response) as T;
      resolve(response);
    };

    xhr.onabort = reject;
    xhr.onerror = reject;
    xhr.ontimeout = reject;

    xhr.timeout = timeout;
    if (method === METHOD.GET || !data) {
      xhr.send();
    } else {
      xhr.send(data);
    }
  });
}

function queryStringify(data: Record<string | number, any>): string {
  const queryParams = new URLSearchParams(data).toString();
  return `?${queryParams}`;
}

function setHeaders(xhr: XMLHttpRequest, headers?: RequestHeaders): void {
  if (!headers) {
    return;
  }
  Object.entries(headers).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value);
  });
}

function isGet(method: METHOD): boolean {
  return method === METHOD.GET;
}

function resolveUrl(
  url: string,
  options: Pick<Options, 'data' | 'method'>,
): string {
  if (isGet(options.method)) {
    return options.data ? url + queryStringify(options.data) : url;
  }
  return url;
}
