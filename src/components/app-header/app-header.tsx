import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import NavItem from '../nav-item/nav-item';
import styles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.navItemGroup}>
          <NavLink to='/'>
            {({ isActive }: { isActive: boolean }) => (
              <NavItem icon={<BurgerIcon type={isActive ? 'primary' : 'secondary'} />} text='Конструктор' isActive={isActive} />
            )}
          </NavLink>
          <NavLink to='/list'>
            {({ isActive }: { isActive: boolean }) => (
              <NavItem icon={<ListIcon type={isActive ? 'primary' : 'secondary'} />} text='Лента заказов' isActive={isActive} />
            )}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavLink to='/profile'>
          {({ isActive }: { isActive: boolean }) => (
            <NavItem icon={<ProfileIcon type={isActive ? 'primary' : 'secondary'} />} text='Личный кабинет' isActive={isActive} />
          )}
        </NavLink>
      </nav>
    </header>
  );
};