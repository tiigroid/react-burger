import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import NavItem from '../nav-item/nav-item';
import styles from './app-header.module.css';

export default function AppHeader() {

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.navItemGroup}>
          <NavLink to='/'>{({isActive}) => (<NavItem icon={<BurgerIcon />} text='Конструктор' isActive={isActive}/>)}</NavLink>
          <NavLink to='/list'>{({isActive}) => (<NavItem icon={<ListIcon />} text='Лента заказов' isActive={isActive}/>)}</NavLink>
        </div>
        <div className={styles.logo}><Logo/></div>
        <NavLink to='/profile'>{({isActive}) => (<NavItem icon={<ProfileIcon />} text='Личный кабинет' isActive={isActive}/>)}</NavLink>
      </nav>
    </header>
  )
}

