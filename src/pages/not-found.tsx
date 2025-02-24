import { Link } from 'react-router-dom';
import ufo from '../images/ufo.png';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <img src={ufo} alt='hovering ufo' className='mb-15'/>
      <div className={`text text_type_digits-medium ${styles.digits}`}>404</div>
      <Link to='/' className='text_type_main-default text_color_inactive mt-20'>Вернуться на главную</Link>
    </div>
  )
}