import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { IIngredientData } from '../../utils/types';

export default function Ingredient({ _id, image, name, price }: IIngredientData) {

  const navigate = useNavigate();

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {_id}
  });

  const { bun, inside } = useSelector((state: any) => state.burgerConstructor) as {
    bun: string;
    inside: { itemID: string; uniqueID: string }[]
  };
  
  function count() {
    if (_id == bun) {
      return 2;
    } else {
      const count = inside.filter(({itemID}) => itemID === _id).length;
      return count;
    }
  }

  function handleClick(itemID: string) {
    navigate(`/ingredients/${itemID}?modal=true`);
  }

  return (
    <li key={_id} className={styles.card}  onClick={() => handleClick(_id)} ref={dragRef}>
      {count() !== 0 &&
        <Counter count={count()}/>}
      <img className={styles.image} src={image} alt={name}/>
        <div className={styles.price}>
          <p className='text text_type_digits-default pr-2'>{price}</p>
          <CurrencyIcon type='primary'/>
        </div>
        <p className={`${styles.name} text text_type_main-default`}>{name}</p>
    </li>
  );
}