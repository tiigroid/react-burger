import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { useEffect } from 'react';

export default function Modal({ title, children, onClose }) {

  useEffect(() => {

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    createPortal(
      <ModalOverlay onOverlayClick={onClose}>
        <div className={styles.modal}>
          <div className={styles.heading}>
            <h2 className='text text_type_main-large'>{title}</h2>
            <div className={styles.close}><CloseIcon onClick={onClose}/></div>
          </div>
          {children}
        </div>
      </ModalOverlay>
      ,
      document.getElementById('root')
    )
  )
}

Modal.propTypes = {
  title: propTypes.string,
  children: propTypes.node.isRequired,
  onClose: propTypes.func.isRequired,
}