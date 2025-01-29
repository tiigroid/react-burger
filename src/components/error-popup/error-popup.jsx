import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';

export default function ErrorPopup({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className='text text_type_main-default mt-4 mb-20 ml-20 mr-20'>Что-то пошло не так,<br></br>попробуйте еще раз</div>
      <Button size='medium' htmlType='button' onClick={onClose}>{'Okay :('}</Button>
    </Modal>
  )
}

ErrorPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
}