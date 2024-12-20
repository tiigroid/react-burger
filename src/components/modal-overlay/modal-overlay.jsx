import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

export default function ModalOverlay({ children, onOverlayClick }) {
  return (
    <div className={styles.overlay} onClick={onOverlayClick}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
}