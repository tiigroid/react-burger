import { useSelector  } from 'react-redux';
import styles from './ingredient-details.module.css';

export default function IngredientDetails() {

  const { detailedIngredient } = useSelector((state) => state.ingredientDetails);

  return (
    <>
      <img src={detailedIngredient.image_large} alt={detailedIngredient.name} className={styles.image}/>
      <h1 className='text text_type_main-medium mt-4'>{detailedIngredient.name}</h1>
      <div className={styles.details}>
        <div className={styles.card}>
          <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>{detailedIngredient.calories}</p>
        </div>
        <div className={styles.card}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{detailedIngredient.proteins}</p>
        </div>
        <div className={styles.card}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{detailedIngredient.fat}</p>
        </div>
        <div className={styles.card}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{detailedIngredient.carbohydrates}</p>
        </div>
      </div>
    </>
  )
}