import { DictOf } from "../types";

type ResponseType = "json" | "text" | "blob";
type FetchResponse = DictOf<any>;
type PromiseRejector = (error: FetchResponse) => void;
type PromiseResolver = (value: FetchResponse) => void;

export type FetchArgs = { url: string; options?: RequestOptions };
export type FetchResult = Promise<FetchResponse> | PromiseLike<FetchResponse>;
export type FetchFn = (args: FetchArgs) => FetchResult;

export type Method = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";

export type RequestOptions = RequestInit & {
  multipart?: boolean;
  params?: DictOf<any>;
  data?: DictOf<any>;
  responseType?: ResponseType;
};

/**
 * Builds the query string based on arguments.
 */
export const buildQueryString = (params: DictOf<any> = {}) =>
  Object.keys(params)
    .filter(
      (key: string) =>
        ![undefined, null].includes(params[key]) &&
        params[key].toString().trim() !== ""
    )
    .map((key: string) => [
      key,
      // encodes `value` to use it in URL addresses
      encodeURIComponent(params[key]),
    ])
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

export const buildFormData = (body: DictOf<any> = {}): FormData =>
  Object.keys(body).reduce((acc, key) => {
    const value = body[key];
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((val: any) => acc.append(key, val));
      } else {
        acc.append(key, value);
      }
    }
    return acc;
  }, new FormData());

export default function handleResponse(
  response: Response,
  responseType: ResponseType,
  resolve: PromiseResolver,
  reject: PromiseRejector
) {
  if (response.status < 500) {
    switch (responseType) {
      // case 'blob':
      //   return response // prettier
      //     .blob()
      //     .then((blob: Blob) => blobToBase64(blob))
      //     .then((base64: string) => resolve({base64}));

      case "text":
        return response // prettier
          .text()
          .then((text: string) => resolve({ text }));

      default:
        return response // prettier
          .json()
          .then((data: DictOf<any>) => resolve(data));
    }
  } else {
    return response
      .json()
      .then((content: any) => {
        const err = { status: response.status, error: content.message };

        return reject(err);
      })
      .catch(() => {
        // response is not JSON, ignore content
        return reject({ status: `${response.status}` });
      });
  }
}

export function request(
  method: Method,
  url: string,
  {
    headers,
    multipart,
    params,
    data,
    responseType = "json",
    ...rest
  }: RequestOptions
): Promise<FetchResponse> {
  return new Promise((resolve: PromiseResolver, reject: PromiseRejector) => {
    const options: RequestInit = { ...rest, method, headers: headers || {} };
    if (data) {
      if (multipart) {
        // options.headers = { ...options.headers, 'Content-Type': 'multipart/form-data' };
        options.body = buildFormData(data);
      } else {
        options.headers = {
          ...options.headers,
          "Content-Type": "application/json",
        };
        options.body = JSON.stringify(data);
      }
    }

    const path = params ? `${url}/?${buildQueryString(params)}` : url;

    fetch(path, options)
      .then((response) =>
        handleResponse(response, responseType, resolve, reject)
      )
      .catch((error) => reject(error));
  });
}
