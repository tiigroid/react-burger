import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './inner-ingredient.module.css';
import { useDrag } from 'react-dnd';

export default function InnerIngredient({ index, uniqueID, hoveredElement, data, onDelete }) {

  const { name, price, image, _id } = data;

  const [, dragRef] = useDrag({
    type: 'inner',
    item: {uniqueID, itemID: _id, index}
  });

  return (
    <li className={`${styles.innerIngredient} ${index === hoveredElement && styles.hovered}`} ref={dragRef}>
      <DragIcon extraClass={styles.dragIcon}/>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={onDelete}/>
    </li>
  )
}

InnerIngredient.propTypes = {
  index: PropTypes.number.isRequired,
  uniqueID: PropTypes.string.isRequired,
  hoveredElement: PropTypes.any,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};