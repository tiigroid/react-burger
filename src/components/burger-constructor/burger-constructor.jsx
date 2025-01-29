import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector  } from 'react-redux';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import InnerIngredient from '../inner-ingredient/inner-ingredient';
import ErrorPopup from '../error-popup/error-popup';
import { setBun, addInside, moveInside, deleteInside, clearConstructor } from '../../services/burger-constructor';
import { getOrderData, clearOrderData, clearOrderError, setOrderDetailsOpen } from '../../services/order-details';

export default function BurgerConstructor() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hoveredElement, setHoveredElement] = useState(false);

  const [, dropTargetConstructor] = useDrop({
    accept: 'ingredient',
    drop({_id}) {
      handleAdd(_id);
    },
  });

  const [, dropTargetInner] = useDrop({
    accept: 'inner',
    hover({index}, monitor) {
      const offset = monitor.getClientOffset();
      const targetIndex = getTargetIndex(offset);
      if (monitor.isOver({ shallow: true })) {
        if (targetIndex !== index) {
          setHoveredElement(targetIndex);
        } else {
          setHoveredElement(index);
        }
      } else {
        setHoveredElement(null);
      }
    },
    drop({uniqueID, itemID, index}, monitor) {
      const offset = monitor.getClientOffset();
      const targetIndex = getTargetIndex(offset);
      handleMove(uniqueID, itemID, index, targetIndex);
      setHoveredElement(null);
    },
  });

  const { accessToken } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.burgerIngredients);
  const { bun, inside } = useSelector((state) => state.burgerConstructor);
  const { loadingData, loadingError } = useSelector((state) => state.burgerIngredients);
  const { loadingOrder, orderError, orderDetailsOpen } = useSelector((state) => state.orderDetails);

  const selectedBun = data.find(({_id}) => _id == bun);

  const ingredientData = useCallback((itemID) => data.find(({_id}) => _id == itemID), [data]);

  const totalPrice = useMemo(() => {
    return 2 * selectedBun?.price + inside?.reduce((sum, {itemID}) => sum + ingredientData(itemID).price, 0);
  }, [inside, selectedBun, ingredientData]);

  function handleAdd(itemID) {
    if (data.find(({_id}) => _id == itemID).type == 'bun') {
      dispatch(setBun(itemID));
    } else {
      selectedBun && dispatch(addInside(itemID));
    }
  }

  function handleMove(uniqueID, itemID, itemIndex, targetIndex) {
    dispatch(moveInside({uniqueID, itemID, itemIndex, targetIndex}));
  }

  function handleDelete(itemIndex) {
    dispatch(deleteInside(itemIndex));
  }

  function placeOrder() {
    if (accessToken) {
      dispatch(getOrderData());
    } else {
      navigate('/login', { state: { from: 'order' } });
    }
  }

  function resetOrderError() {
    dispatch(clearOrderError());
  }

  function finalizeOrder() {
    dispatch(clearOrderData());
    dispatch(clearConstructor());
    dispatch(setOrderDetailsOpen());
  }

  function getTargetIndex(offset) {
    const containerTop = document.getElementById('inner-ingredients').getBoundingClientRect().top;
    const elementHeight = 80;
    const relativeOffset = offset.y - containerTop;
    const index = Math.floor(relativeOffset / elementHeight);
    return Math.min(index, inside.length - 1);
  }

  return (
    <section className={styles.container} ref={dropTargetConstructor}>

      {!selectedBun ?
        <div className='text text_type_main-default mt-3 mr-1'>{!loadingData && !loadingError && 'Для начала перетащите сюда выбранную булку'}</div> :
        <>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${selectedBun.name} (верх)`}
          price={selectedBun.price}
          thumbnail={selectedBun.image} />

        {inside.length > 0 
          ?
          <ul id='inner-ingredients' className={styles.innerIngredientsGroup} ref={dropTargetInner}>
            {inside.map(({itemID, uniqueID}, i) => <InnerIngredient key={uniqueID} uniqueID={uniqueID} index={i} hoveredElement={hoveredElement} data={ingredientData(itemID)} onDelete={() => handleDelete(i)}/>)}
          </ul>
          :
            <ConstructorElement
              isLocked={true}
              text={<div className='text text_type_main-default text_color_inactive'>Выберите первый ингредиент</div>}
              price={null}
              thumbnail={data.filter(item => item.type != 'bun')[Math.floor(Math.random() * 13)].image} />}

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${selectedBun.name} (низ)`}
          price={selectedBun.price}
          thumbnail={selectedBun.image} />

        <div className={styles.total}>
          <div className={styles.price}>
            <p className='text text_type_digits-medium'>{totalPrice}</p>
            <CurrencyIcon/>
          </div>
          <Button size='large' htmlType='button' onClick={placeOrder}>{!loadingOrder ? 'Оформить заказ' : 'Уже оформляем!'}</Button>
        </div>
      </>}
      
      {orderDetailsOpen &&
        <Modal onClose={finalizeOrder}>
          <OrderDetails/>
        </Modal>}

      {orderError && <ErrorPopup onClose={resetOrderError}/>}
      
    </section>
  )
}