import { apiClient } from './api-client';
import type { HttpMethods } from '../types';
import { HTTP_METHODS } from '../constants';

async function request<T>(
  url: string,
  method: HttpMethods = 'GET',
  data: any = null,
  config = {},
): Promise<T> {
  const res = await apiClient.request<T>({
    url,
    method,
    data,
    ...config,
  });
  return res.data;
}

export const http = {
  get: <T>(url: string, config = {}) =>
    request<T>(url, HTTP_METHODS.GET, null, config),
  post: <T>(url: string, data: any, config = {}) =>
    request<T>(url, HTTP_METHODS.POST, data, config),
  put: <T>(url: string, data: any, config = {}) =>
    request<T>(url, HTTP_METHODS.PUT, data, config),
  delete: <T>(url: string, config = {}) =>
    request<T>(url, HTTP_METHODS.DELETE, null, config),
};
