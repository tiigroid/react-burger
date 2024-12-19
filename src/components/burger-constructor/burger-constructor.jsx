import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { data } from '../../utils/data';

export default function BurgerConstructor() {

  const bun = data.filter(item => item.type === 'bun').sort(() => Math.random() - 0.5)[0];
  const inside = data.filter(item => item.type != 'bun').sort(() => Math.random() - 0.5).slice(0, 15);
  const total = 2 * bun.price + inside.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.container}>

      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image} />

      <div className={styles.innerIngredientsGroup}>
        {inside.map(({ _id, name, price, image }) => (
          <div key={_id} className={styles.innerIngredient}>
            <DragIcon extraClass={styles.dragIcon}/>
            <ConstructorElement
            text={name}
            price={price}
            thumbnail={image} />
          </div>
        ))}
      </div>

      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image} />

      <div className={styles.total}>
        <div className={styles.price}>
          <p className='text text_type_digits-medium'>{total}</p>
          <CurrencyIcon/>
        </div>
        <Button>Оформить заказ</Button>
      </div>

    </div>
  )
}