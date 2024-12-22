import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './ingredient-group.module.css';
import { INGREDIENT_OBJECT } from '../../utils/types';

export default function IngredientGroup({ type, data, onIngredientClick }) {
  return (
    <div id={type}>
      <h2 className='text text_type_main-medium pt-10'>{type}</h2>
      <ul className={`${styles.ingredients} pt-6 pr-4 pb-6 pl-4`}>
        {data.map(({ _id, image, name, price }) => (
          <li key={_id} className={styles.card} onClick={() => onIngredientClick(_id)}>
            {/*<Counter/>*/}
            <img className={styles.image} src={image}/>
            <div className={styles.price}>
              <p className='text text_type_digits-default pr-2'>{price}</p>
              <CurrencyIcon/>
            </div>
            <p className={`${styles.name} text text_type_main-default`}>{name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

IngredientGroup.propTypes = {
  type: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape(INGREDIENT_OBJECT)).isRequired,
  onIngredientClick: PropTypes.func,
}; 