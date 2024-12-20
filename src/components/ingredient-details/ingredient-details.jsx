import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import styles from './ingredient-details.module.css';

export default function IngredientDetails({ ingredient, onClose }) {
  return (
    <Modal title='Детали ингредиента' onClose={onClose}>
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
    </Modal>
  )
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
    proteins: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};