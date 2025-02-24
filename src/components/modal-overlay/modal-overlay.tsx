import { ReactNode } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayElementProps {
  children: ReactNode;
  onOverlayClick: () => void
}

export default function ModalOverlay({ children, onOverlayClick }: IModalOverlayElementProps) {
  return (
    <div className={styles.overlay} onClick={onOverlayClick}>
      {children}
    </div>
  )
}