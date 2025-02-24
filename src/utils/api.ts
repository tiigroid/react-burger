import { BURGER_API_URL } from './constants';
import { IUserData } from './types';

interface IRegisterData {
  email: string;
  password: string;
}

interface ILoginData {
  email: string;
  password: string;
}

interface IRefreshTokenData {
  token: string | undefined;
}

interface IResetPasswordData {
  email: string;
}

interface IPasswordResetData {
  password: string;
  token: string;
}

interface IOrderData {
  ingredients: string[];
}

export const registerUser = (data: IRegisterData) => request({ endpoint: '/auth/register', method: 'POST', data });
export const loginUser = (data: ILoginData) => request({ endpoint: '/auth/login', method: 'POST', data });
export const logoutUser = () => request({ endpoint: '/auth/logout', method: 'POST', data: { token: document.cookie.match(new RegExp('(^| )' + 'refreshToken' + '=([^;]+)'))?.[2] }});
export const refreshToken = (data: IRefreshTokenData) => request({ endpoint: '/auth/token', method: 'POST', data });

export const getUserData = () => request({ endpoint: '/auth/user' });
export const updateUserData = (data: IUserData) => request({ endpoint: '/auth/user', method: 'PATCH', data });

export const requestResetPassword = (data: IResetPasswordData) => request({ endpoint: '/password-reset', method: 'POST', data });
export const resetPassword = (data: IPasswordResetData) => request({ endpoint: '/password-reset/reset', method: 'POST', data });

export const getIngredients = () => request({ endpoint: '/ingredients' });
export const postIngredients = (data: IOrderData) => request({ endpoint: '/orders', method: 'POST', data });

interface IRequestParams {
  endpoint: string;
  method?: string;
  data?: any;
  token?: string;
}

interface IApiResponse {
  [key: string]: any;
}

async function request({ endpoint, method = 'GET', data, token = document.cookie.match(new RegExp('(^| )' + 'accessToken' + '=([^;]+)'))?.[2] }: IRequestParams): Promise<IApiResponse> {
  const url = BURGER_API_URL + endpoint;
  const headers: HeadersInit = new Headers({
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': method === 'GET' ? '' : 'application/json; charset=utf-8',
  });

  const body = method === 'GET' ? undefined : JSON.stringify(data);

  try {
    let response = await fetch(url, { method, headers, body });

    if (response.status === 403) {
      const error = await response.json();
      if (error.message === 'jwt expired') {
        const newTokens = await refreshToken({ token: document.cookie.match(new RegExp('(^| )' + 'refreshToken' + '=([^;]+)'))?.[2] });
        if (newTokens) {
          document.cookie = `accessToken=${newTokens.accessToken.split('Bearer ')[1]}; path=/`;
          document.cookie = `refreshToken=${newTokens.refreshToken}; max-age=${60 * 60 * 24 * 30}; path=/`;
          headers.set('Authorization', `Bearer ${newTokens.accessToken}`);
          response = await fetch(url, { method, headers, body });
        } else {
          throw new Error('Failed to refresh token');
        }
      }
    }

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    const json = await response.json();

    if (!json) {
      throw new Error(`API returned invalid data`);
    }

    return json;

  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
}

