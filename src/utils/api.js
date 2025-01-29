import { BURGER_API_URL } from './constants';

export const registerUser = (data) => request('/auth/register', 'POST', data);
export const loginUser = (data) => request('/auth/login', 'POST', data);
export const logoutUser = () => request('/auth/logout', 'POST', { token: document.cookie.match(new RegExp('(^| )' + 'refreshToken' + '=([^;]+)'))?.[2] });
export const refreshToken = (data) => request('/auth/token', 'POST', data);

export const getUserData = () => request('/auth/user');
export const updateUserData = (data) => request('/auth/user', 'PATCH', data);

export const requestResetPassword = (data) => request('/password-reset', 'POST', data);
export const resetPassword = (data) => request('/password-reset/reset', 'POST', data);

export const getIngredients = () => request('/ingredients');
export const postIngredients = (data) => request('/orders', 'POST', data);

async function request(endpoint, method = 'GET', data, token = document.cookie.match(new RegExp('(^| )' + 'accessToken' + '=([^;]+)'))?.[2]) {

  const url = BURGER_API_URL + endpoint;
  const headers = {
    'Authorization': token ? `Bearer ${token}` : undefined,
    'Content-Type': method == 'GET' ? null : 'application/json; charset=utf-8',
  };
  const body = method == 'GET' ? null : JSON.stringify(data);

  try {
    let response = await fetch(url, { method, headers, body });

    if (response.status == 403) {
      const error = await response.json();
      if (error.message == 'jwt expired') {
        const newTokens = await refreshToken({ token: document.cookie.match(new RegExp('(^| )' + 'refreshToken' + '=([^;]+)'))?.[2] });
        if (newTokens) {
          document.cookie = `accessToken=${newTokens.accessToken.split('Bearer ')[1]}; path=/`;
          document.cookie = `refreshToken=${newTokens.refreshToken}; max-age=${60 * 60 * 24 * 30}; path=/`;
          headers.Authorization = newTokens.accessToken;
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
