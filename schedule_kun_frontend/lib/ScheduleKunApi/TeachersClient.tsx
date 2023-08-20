import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Cookies } from 'react-cookie';
import { CookieKeys } from '@/config/CookieKeys';
import Router from 'next/router';
import { ErrorCode } from '@/config/ErrorCodes';

export const ApiConfig = {
  domain: `${process.env.APP_API_DOMAIN}`,
  csrf_header_key: 'x-csrf-token',
};

const target = 'teachers';
const baseUrl = `${ApiConfig.domain}/schedule_kun/${target}`;

const cookies = new Cookies();

export const TeachersApiUrl = (path: string) => {
  return path.match(/^\//g)
    ? `${baseUrl}${path}`
    : `${baseUrl}/${path}`;
};

const queryString = (hash: any) => {
  return Object.keys(hash).map((key) => `${key}=${hash[key]}`).join('&');
};

const onErrorOccurred = (e: any, reject: any) => {
  if (!e.response) {
    if (!navigator.onLine) {
      reject();
      return;
    }

    if (e.message === 'canceled') return;

    Router.push('/500');
    return;
  }

  const errorCode = e.response.status;
  const dataCode = e.response.data.code;

  switch (true) {
    case errorCode === 401:
      Router.replace({ pathname: `/${target}/401` });
      break;
    case errorCode === 404:
      Router.replace({ pathname: `/${target}/404` });
      break;
    case errorCode === 409 && [ErrorCode.invalid_lesson_params].includes(dataCode):
      reject(e);
      break;
    case errorCode === 409:
      Router.replace({ pathname: `${target}/409` });
      break;
    default:
      return reject(e);
  }
};

export const TeachersClient = () => {};

TeachersClient.get = function get<T = any, D = any>(
  path: string,
  query: Object = {},
  config: AxiosRequestConfig<D> = {}
) {
  return new Promise<AxiosResponse<T, D>>((resolve, reject) => {
    axios({
      method: 'GET',
      url: `${TeachersApiUrl(path)}?${queryString(query)}`,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      ...config,
    })
      .then((res) => {
        cookies.set(
          CookieKeys.csrf_cookie_key,
          res.headers[ApiConfig.csrf_header_key]
        );

        resolve(res);
      })
      .catch((e) => {
        onErrorOccurred(e, reject);
      });
  });
};

TeachersClient.post = function post<T = any, D = any>(
  path: string,
  requestBody: any
) {
  return new Promise<AxiosResponse<T, D>>((resolve, reject) => {
    axios({
      method: 'POST',
      url: TeachersApiUrl(path),
      headers: {
        'Content-Type': 'application/json',
        'X-Csrf-Token': cookies.get(CookieKeys.csrf_cookie_key),
      },
      data: requestBody,
      withCredentials: true,
    })
      .then((res) => {
        cookies.set(
          CookieKeys.csrf_cookie_key,
          res.headers[ApiConfig.csrf_header_key]
        );

        resolve(res);
      })
      .catch((e) => {
        onErrorOccurred(e, reject);
      });
  });
};

TeachersClient.put = function put<T = any, D = any>(
  path: string,
  requestBody: any
) {
  return new Promise<AxiosResponse<T, D>>((resolve, reject) => {
    axios({
      method: 'PUT',
      url: TeachersApiUrl(path),
      headers: {
        'Content-Type': 'application/json',
        'X-Csrf-Token': cookies.get(CookieKeys.csrf_cookie_key),
      },
      data: requestBody,
      withCredentials: true,
    })
      .then((res) => {
        cookies.set(
          CookieKeys.csrf_cookie_key,
          res.headers[ApiConfig.csrf_header_key]
        );

        resolve(res);
      })
      .catch((e) => {
        onErrorOccurred(e, reject);
      });
  });
};

TeachersClient.delete = function deleteFunc<T = any, D = any>(
  path: string,
  config: AxiosRequestConfig<D> = {}
) {
  return new Promise<AxiosResponse<T, D>>((resolve, reject) => {
    axios({
      method: 'DELETE',
      url: TeachersApiUrl(path),
      headers: {
        'Content-Type': 'application/json',
        'X-Csrf-Token': cookies.get(CookieKeys.csrf_cookie_key),
      },
      withCredentials: true,
      ...config,
    })
      .then((res) => {
        cookies.set(
          CookieKeys.csrf_cookie_key,
          res.headers[ApiConfig.csrf_header_key]
        );

        resolve(res);
      })
      .catch((e) => {
        onErrorOccurred(e, reject);
      });
  });
};
