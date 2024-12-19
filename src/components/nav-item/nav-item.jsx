import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import styles from './nav-item.module.css';

export default function NavItem({ icon, text, isActive }) {

  const IconWithType = cloneElement(icon, { type: isActive ? 'primary' : 'secondary' });

  return (
    <div className={`${styles.navItem} pl-5 pr-5 pb-4 pt-4 mr-2 text text_type_main-default ${isActive ? '' : 'text_color_inactive'}`}>
      {IconWithType}
      {text}
    </div>
  )
}

NavItem.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  isActive: PropTypes.bool
}; 