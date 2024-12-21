import propTypes from 'prop-types';
import checkImage from '../../images/done.png';
import styles from './order-details.module.css';

export default function OrderDetails({ number }) {
  return (
    <div className={styles.container}>
      <p className='text text_type_digits-large mb-8'>{number}</p>
      <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
      <img src={checkImage} alt='check symbol' className='mb-15'/>
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  number: propTypes.string.isRequired
}
