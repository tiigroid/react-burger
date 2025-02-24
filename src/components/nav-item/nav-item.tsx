import { cloneElement, ReactElement } from 'react';
import styles from './nav-item.module.css';

interface INavItemElementProps {
  icon: ReactElement;
  text: string;
  isActive: boolean;
}

export default function NavItem({ icon, text, isActive }: INavItemElementProps) {

  const IconWithType = cloneElement(icon, { type: isActive ? 'primary' : 'secondary' });

  return (
    <div className={`${styles.navItem} pl-5 pr-5 pb-4 pt-4 text text_type_main-default ${isActive ? '' : 'text_color_inactive'}`}>
      {IconWithType}
      {text}
    </div>
  )
}