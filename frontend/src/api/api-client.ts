import axios from 'axios';
import { getBaseUrl } from './get-base-url';

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
});    