import PropTypes from 'prop-types';
import styles from './ingredient-group.module.css';
import Ingredient from '../ingredient/ingredient';
import { INGREDIENT_OBJECT } from '../../utils/types';

export default function IngredientGroup({ type, data }) {

  return (
    <div id={type}>
      <h2 className='text text_type_main-medium pt-10'>{type}</h2>
      <ul className={`${styles.ingredients} pt-6 pr-4 pb-6 pl-4`}>
        {data.map(({ _id, image, name, price }) => (
          <Ingredient key={_id} {...{ _id, image, name, price }}/>
        ))}
      </ul>
    </div>
  )
}

IngredientGroup.propTypes = {
  type: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape(INGREDIENT_OBJECT)).isRequired,
}; 