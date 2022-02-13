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
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

/* eslint-disable class-methods-use-this */
export class Http {
  get(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return request(url, { ...options, method: METHOD.GET }, options.timeout);
  }

  put(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return request(url, { ...options, method: METHOD.PUT }, options.timeout);
  }

  post(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return request(url, { ...options, method: METHOD.POST }, options.timeout);
  }

  patch(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return request(url, { ...options, method: METHOD.PATCH }, options.timeout);
  }

  delete(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return request(url, { ...options, method: METHOD.DELETE }, options.timeout);
  }
}

/* eslint-enable class-methods-use-this */

function request(
  url: string,
  options: Options = { method: METHOD.GET },
  timeout = 5000,
): Promise<XMLHttpRequest> {
  const { method, data } = options;

  return new Promise((resolve, reject) => {
    if (!method) {
      reject(new Error('No method provided'));
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open(method, resolveUrl(url, options));
    setHeaders(xhr, options.headers);

    xhr.onload = () => {
      resolve(xhr);
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
