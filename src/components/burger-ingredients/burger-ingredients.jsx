import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientGroup from '../ingredient-group/ingredient-group';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { INGREDIENT_OBJECT } from '../../utils/types';
import Modal from '../modal/modal';

export default function BurgerIngredients({ data }) {

  const [currentTab, setCurrentTab] = useState('Булки');
  const [detailedIngredient, setDetailedIngredient] = useState(undefined);

  useEffect(() => {
    document.getElementById(currentTab)?.scrollIntoView();
  }, [currentTab]);

  function handleIngredientClick(ingredient) {
    setDetailedIngredient(data.find(item => item._id === ingredient));
  }

  const buns = data.filter(item => item.type == 'bun');
  const sauces = data.filter(item => item.type == 'sauce');
  const mains = data.filter(item => item.type == 'main');

  return (
    <section className={styles.container}>

      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      
      <div className={styles.tabs}>
        <Tab value="Булки" active={currentTab === 'Булки'} onClick={setCurrentTab}>Булки</Tab>
        <Tab value="Соусы" active={currentTab === 'Соусы'} onClick={setCurrentTab}>Соусы</Tab>
        <Tab value="Начинки" active={currentTab === 'Начинки'} onClick={setCurrentTab}>Начинки</Tab>
      </div>

      <div className={styles.ingredients}>
        <IngredientGroup type='Булки' data={buns} onIngredientClick={handleIngredientClick}/>
        <IngredientGroup type='Соусы' data={sauces} onIngredientClick={handleIngredientClick}/>
        <IngredientGroup type='Начинки' data={mains} onIngredientClick={handleIngredientClick}/>
      </div>

      {detailedIngredient &&
        <Modal title='Детали ингредиента' onClose={() => setDetailedIngredient(undefined)}>
          <IngredientDetails ingredient={detailedIngredient}/>
        </Modal>}

    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(INGREDIENT_OBJECT)).isRequired
}; 