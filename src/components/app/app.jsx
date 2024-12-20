import { useEffect, useState } from 'react';
import { getIngredients } from '../../utils/api';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';

export default function App() {

  const [ingredients, setIngredients] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getIngredients()
    .then(res => {
      setIngredients(res.data);
      setDataReady(true);
    })
    .catch(message => {
      setErrorMessage(message);
    });
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader/>
      {dataReady
      ?
      <main className={styles.main}>
        <BurgerIngredients data={ingredients}/>
        <BurgerConstructor data={ingredients}/>
      </main>
      :
      <p className='mt-10 text text_type_main-default text_color_inactive'>{errorMessage}</p>}
    </div>
  )
}
