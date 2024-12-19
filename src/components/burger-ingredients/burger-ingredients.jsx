import { useEffect, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import styles from './burger-ingredients.module.css';
import IngredientSection from '../ingredient-section/ingredient-section';

export default function BurgerIngredients() {

  const [currentTab, setCurrentTab] = useState('Булки');

  useEffect(() => {
    document.getElementById(currentTab).scrollIntoView();
  }, [currentTab]);

  const buns = data.filter(item => item.type == 'bun');
  const sauces = data.filter(item => item.type == 'sauce');
  const mains = data.filter(item => item.type == 'main');

  return (
    <div className={styles.container}>

      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      
      <div className={styles.tabs}>
        <Tab value="Булки" active={currentTab === 'Булки'} onClick={setCurrentTab}>Булки</Tab>
        <Tab value="Соусы" active={currentTab === 'Соусы'} onClick={setCurrentTab}>Соусы</Tab>
        <Tab value="Начинки" active={currentTab === 'Начинки'} onClick={setCurrentTab}>Начинки</Tab>
      </div>

      <div className={styles.ingredients}>
        <IngredientSection type='Булки' data={buns}/>
        <IngredientSection type='Соусы' data={sauces}/>
        <IngredientSection type='Начинки' data={mains}/>
      </div>
    </div>
  )
}