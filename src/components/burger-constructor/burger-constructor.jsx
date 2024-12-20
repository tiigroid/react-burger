import PropTypes from 'prop-types';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { useMemo, useState } from 'react';
import OrderDetails from '../order-details/order-details';

export default function BurgerConstructor({ data }) {

  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const bun = useMemo(() => data.filter(item => item.type === 'bun').sort(() => Math.random() - 0.5)[0], [data]); // temp dev
  const inside = useMemo(() => data.filter(item => item.type != 'bun').sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 13)), [data]); // temp dev
  const total = 2 * bun.price + inside.reduce((sum, item) => sum + item.price, 0);

  const orderNumber = '034536'; // temp dev

  return (
    <>
      <section className={styles.container}>

        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image} />

        {inside.length > 0 
          ?
          <ul className={styles.innerIngredientsGroup}>
            {inside.map(({ _id, name, price, image }) => (
              <li key={_id} className={styles.innerIngredient}>
                <DragIcon extraClass={styles.dragIcon}/>
                <ConstructorElement
                text={name}
                price={price}
                thumbnail={image} />
              </li>
            ))}
          </ul>
        :
          <ConstructorElement
            isLocked={true}
            text={<div className='text text_type_main-default text_color_inactive'>Выберите первый ингредиент</div>}
            price={null}
            thumbnail={data.filter(item => item.type != 'bun')[Math.floor(Math.random() * 13)].image} />
        }

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
          <Button size='large' htmlType='button' onClick={setOrderModalOpen}>Оформить заказ</Button>
        </div>

      </section>

      {orderModalOpen &&
        <OrderDetails number={orderNumber} onClose={() => setOrderModalOpen(false)}/>}
    </>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
}; 