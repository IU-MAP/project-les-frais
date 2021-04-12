/* eslint-disable no-undef */
import { API_URL } from '../constants';

export class ApiError extends Error {
  name: string;
  status: number;
  data: Record<string, any>;

  constructor (params: { status: number, data: Record<string, any> }) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, ApiError);
    }

    this.name = 'ApiError';
    this.status = params.status;
    this.data = params.data;
  }
}

const http = async <T>(path: string, config: RequestInit): Promise<T> => {
  try {
    const request = new Request(API_URL + path, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await fetch(request);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError({ status: response?.status || 500, data });
    }

    return data;
  } catch (e) {
    if (e instanceof ApiError) {
      throw e;
    } else {
      console.error(e);
      throw new Error(e.message);
    }
  }
};

const get = <T>(path: string, config?: RequestInit): Promise<T> => {
  const init = { method: 'get', ...config };
  return http<T>(path, init);
};

const post = <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
  const init = { method: 'post', body: JSON.stringify(body), ...config };
  return http<U>(path, init);
};

const put = <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
  const init = { method: 'put', body: JSON.stringify(body), ...config };
  return http<U>(path, init);
};

const del = <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
  const init = { method: 'delete', body: JSON.stringify(body), ...config };
  return http<U>(path, init);
};

const api = {
  get,
  post,
  put,
  delete: del,
};

export type ApiType = typeof api;
export default api;
