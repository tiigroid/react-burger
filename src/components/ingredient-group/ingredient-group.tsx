import styles from './ingredient-group.module.css';
import Ingredient from '../ingredient/ingredient';
import { IIngredientData } from '../../utils/types';

interface IIngredientGroupElementProps {
  type: string;
  data: IIngredientData[];
}

export default function IngredientGroup({ type, data }: IIngredientGroupElementProps) {
  return (
    <div id={type}>
      <h2 className='text text_type_main-medium pt-10'>{type}</h2>
      <ul className={`${styles.ingredients} pt-6 pr-4 pb-6 pl-4`}>
        {data.map(({ _id, image, name, price }) => (
          <Ingredient key={_id} {...{ _id, image, name, price }} />
        ))}
      </ul>
    </div>
  );
}