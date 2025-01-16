import { BURGER_API_URL } from './constants';

export const getIngredients = () => request('/ingredients');
export const postIngredients = (data) => request('/orders', 'POST', data);

async function request(endpoint, method, data) {

  const url = BURGER_API_URL + endpoint;
  const headers = { 'Content-Type': !method ? null : 'application/json; charset=utf-8' };
  const body = !method ? null : JSON.stringify(data);

  try {
    const response = await fetch(url, { method, headers, body });

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
