import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavItem from '../nav-item/nav-item';
import styles from './app-header.module.css';

export default function AppHeader() {

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.navItemGroup}>
          <NavItem icon={<BurgerIcon />} text='Конструктор' isActive={true} />
          <NavItem icon={<ListIcon />} text='Лента заказов' />
        </div>
        <div className={styles.logo}><Logo/></div>
        <NavItem icon={<ProfileIcon />} text='Личный кабинет' />
      </nav>
    </header>
  )
}

