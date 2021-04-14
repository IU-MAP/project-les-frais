/* eslint-disable no-undef */
import { API_URL } from '../../constants';
import ApiError from './api-error';
import { store } from '../../../store';
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

var csrftoken = readCookie('csrftoken');


const http = async <T>(path: string, config: RequestInit): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
"X-CSRFToken": csrftoken,
  };
  if (store?.state?.token) headers.Authorization = `Token ${store.state.token}`;

  try {
    const req = new Request(API_URL + path, {
      ...config,
      headers,
    });
    const response = await fetch(req);
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

const request = {
  get: <T>(path: string, config?: RequestInit): Promise<T> => {
    const init = { method: 'get', ...config };
    return http<T>(path, init);
  },
  post: <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
    const init = { method: 'post', body: JSON.stringify(body), ...config };
    return http<U>(path, init);
  },
  put: <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
    const init = { method: 'put', body: JSON.stringify(body), ...config };
    return http<U>(path, init);
  },
  delete: <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
    const init = { method: 'delete', body: JSON.stringify(body), ...config };
    return http<U>(path, init);
  },
};

export default request;
