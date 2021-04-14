/* eslint-disable no-undef */
import { API_URL } from '../../constants';
import ApiError from './api-error';
import { store } from '../../../store';

/**
 * A request wrapper method that handles authorization token passing, setting fetch
 * headers, catching errors and useful data passing into the request.
 * @param path – URL of the endpoint relative to the API host environmental constant
 * @param config – additional fetch configuration.
 */

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
    'X-CSRFToken': csrftoken,
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

/**
 * Several more useful functions for requests making depending on the
 * request method that you need.
 */
const request = {
  /**
   * GET-request: no body needed. Use it to receive data from the backend
   */
  get: <T>(path: string, config?: RequestInit): Promise<T> => {
    const init = { method: 'get', ...config };
    return http<T>(path, init);
  },

  /**
   * POST-request: has optional body. Use it to create new entity instances
   */
  post: <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
    const init = { method: 'post', body: JSON.stringify(body), ...config };
    return http<U>(path, init);
  },

  /**
   * PUT-request. Use it to update entity instances
   */
  put: <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
    const init = { method: 'put', body: JSON.stringify(body), ...config };
    return http<U>(path, init);
  },

  /**
   * PUT-request. Use it to delete entities
   */
  delete: <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
    const init = { method: 'delete', body: JSON.stringify(body), ...config };
    return http<U>(path, init);
  },
};

export default request;
