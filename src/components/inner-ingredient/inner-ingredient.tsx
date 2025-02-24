import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './inner-ingredient.module.css';
import { useDrag } from 'react-dnd';
import { IIngredientData } from '../../utils/types';

interface IInnerIngredientElementProps {
  index: number;
  uniqueID: string;
  hoveredElement: number | undefined;
  data: IIngredientData;
  onDelete: () => void;
}

export default function InnerIngredient({ index, uniqueID, hoveredElement, data, onDelete }: IInnerIngredientElementProps) {

  const { name, price, image, _id } = data;

  const [, dragRef] = useDrag({
    type: 'inner',
    item: {uniqueID, itemID: _id, index}
  });

  return (
    <li className={`${styles.innerIngredient} ${index === hoveredElement && styles.hovered}`} ref={dragRef}>
      <DragIcon type='primary'/>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={onDelete}/>
    </li>
  )
}