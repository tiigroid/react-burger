import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './ingredient-section.module.css';

export default function IngredientSection({ type, data }) {
  return (
    <div id={type}>
      <h2 className='text text_type_main-medium pt-10'>{type}</h2>
      <div className={`${styles.ingredientSection} pt-6 pr-4 pb-6 pl-4`}>
        {data.map(({ _id, image, name, price }) => (
          <div key={_id} className={styles.card}>
            <img className={styles.image} src={image}/>
            <div className={styles.price}>
              <p className='text text_type_digits-default pr-2'>{price}</p>
              <CurrencyIcon/>
            </div>
            <p className={`${styles.name} text text_type_main-default`}>{name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

IngredientSection.propTypes = {
  type: PropTypes.string,
  data: PropTypes.array
}; 