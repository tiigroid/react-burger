import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';

interface IErrorPopupElementProps {
  onClose: () => void;
}

export default function ErrorPopup({ onClose }: IErrorPopupElementProps) {
  return (
    <Modal onClose={onClose}>
      <div className='text text_type_main-default mt-4 mb-20 ml-20 mr-20'>Что-то пошло не так,<br></br>попробуйте еще раз</div>
      <Button size='medium' htmlType='button' onClick={onClose}>{'Okay :('}</Button>
    </Modal>
  )
}