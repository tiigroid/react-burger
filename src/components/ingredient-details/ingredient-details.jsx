import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';
import { INGREDIENT_OBJECT } from '../../utils/types';

export default function IngredientDetails({ ingredient }) {
  return (
    <>
      <img src={ingredient.image_large} alt={ingredient.name} className={styles.image}/>
      <h1 className='text text_type_main-medium mt-4'>{ingredient.name}</h1>
      <div className={styles.details}>
        <div className={styles.card}>
          <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
        </div>
        <div className={styles.card}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
        </div>
        <div className={styles.card}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
        </div>
        <div className={styles.card}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
        </div>
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(INGREDIENT_OBJECT).isRequired
};