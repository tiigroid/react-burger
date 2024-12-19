import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';

export default function App() {

  return (
    <div className={styles.app}>
      <AppHeader/>
      <div className={styles.container}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </div>
    </div>
  )
}
