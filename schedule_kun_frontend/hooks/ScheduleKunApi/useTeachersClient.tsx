import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CookieKeys } from '@/config/CookieKeys';
import { ErrorCode } from '@/config/ErrorCodes';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

export const ApiConfig = {
  domain: `${process.env.APP_API_DOMAIN}`,
  csrf_header_key: 'x-csrf-token',
};

const target = 'teachers';
const baseUrl = `${ApiConfig.domain}/schedule_kun/${target}`;

export const TeachersApiUrl = (path: string) => {
  return path.match(/^\//g)
    ? `${baseUrl}${path}`
    : `${baseUrl}/${path}`;
};

export const useTeachersClient = () => {
  const body = () => {};
  const router = useRouter();
  const cookies = new Cookies();

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

      router.push(`/${target}/500`);
      return;
    }

    const errorCode = e.response.status;
    const dataCode = e.response.data.code;

    switch (true) {
      case errorCode === 401:
        router.replace(`/${target}/401`);
        break;
      case errorCode === 404:
        router.replace(`/${target}/404`);
        break;
      case errorCode === 409 && [ErrorCode.invalid_lesson_params].includes(dataCode):
        reject(e);
        break;
      case errorCode === 409:
        router.replace(`/${target}/409`);
        break;
      case errorCode === 500:
        // router.replace(`/${target}/500`);
        throw new Error('エラーが発生しました。');
        break;
      default:
        return reject(e);
    }
  };

  body.get = function get<T = any, D = any>(
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

  body.post = function post<T = any, D = any>(
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

  body.put = function put<T = any, D = any>(
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

  body.delete = function deleteFunc<T = any, D = any>(
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

  return body;
};
