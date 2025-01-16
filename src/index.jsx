import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import burgerConstructorReducer from './services/burger-constructor';
import burgerIngredientsReducer from './services/burger-ingredients';
import orderDetailsReducer from './services/order-details';
import ingredientDetailsReducer from './services/ingredient-details';
import App from './components/app/app';

const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    orderDetails: orderDetailsReducer,
    ingredientDetails: ingredientDetailsReducer
  },
  devTools: import.meta.env.NODE_ENV !== 'production'
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </StrictMode>,
)
