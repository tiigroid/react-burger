import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

interface IModalElementProps {
  title?: string;
  children: ReactNode;
  onClose: () => void
}

export default function Modal({ title, children, onClose }: IModalElementProps) {

  useEffect(() => {

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const modalRoot = document.getElementById('modals');

  return (
    modalRoot &&
      createPortal(
        <ModalOverlay onOverlayClick={onClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.heading}>
              <h2 className='text text_type_main-large'>{title}</h2>
              <div className={styles.close}><CloseIcon type='primary' onClick={onClose}/></div>
            </div>
            {children}
          </div>
        </ModalOverlay>
        ,
        modalRoot
    )
  )
}