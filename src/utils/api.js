import { BURGER_API_URL } from './constants';

export const getIngredients = () => request('/ingredients');

async function request(endpoint) {
  try {
    const response = await fetch(BURGER_API_URL + endpoint);

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
    return Promise.reject('Заминка с поставкой ингредиентов, попробуйте обновить страницу');
  }
}
