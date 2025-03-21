import { useSelector  } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Modal from '../modal/modal';
import styles from './ingredient-details.module.css';

export default function IngredientDetails() {

  const navigate = useNavigate();
  const location = useLocation();

  const modalMode = new URLSearchParams(location.search).get('modal') === 'true';

  const { id } = useParams();

  const { data } = useSelector((state) => state.burgerIngredients);

  const detailedIngredient = data?.find(({_id}) => _id == id);

  const Details = () => (
    <div className={styles.container}>
      <img src={detailedIngredient?.image_large} alt={detailedIngredient?.name} className={styles.image}/>
      <h1 className='text text_type_main-medium mt-4'>{detailedIngredient?.name}</h1>
      <div className={styles.details}>
        <div className={styles.card}>
          <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>{detailedIngredient?.calories}</p>
        </div>
        <div className={styles.card}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{detailedIngredient?.proteins}</p>
        </div>
        <div className={styles.card}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{detailedIngredient?.fat}</p>
        </div>
        <div className={styles.card}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{detailedIngredient?.carbohydrates}</p>
        </div>
      </div>
    </div>
  )

  return (
    modalMode
      ?
      <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
        <Details/>
      </Modal>
      :
      <div className={styles.full}>
        <Details/>
      </div>
  )
}