/* eslint-disable no-undef, no-param-reassign */
import { API_URL } from '../constants';

const http = async <T>(path: string, config: RequestInit): Promise<T> => {
  try {
    const request = new Request(API_URL + path, config);
    const response = await fetch(request);
    return response.json().catch(() => ({}));
  } catch (e) {
    throw new Error(e?.response?.status || 500);
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
