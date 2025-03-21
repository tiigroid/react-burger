import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/burger-ingredients';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientGroup from '../ingredient-group/ingredient-group';

export default function BurgerIngredients() {

  const scrollContainerRef = useRef(null);

  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState('Булки');
  
  const { data, loadingData, loadingError } = useSelector((state) => state.burgerIngredients);

  const buns = data.filter(item => item.type == 'bun');
  const sauces = data.filter(item => item.type == 'sauce');
  const mains = data.filter(item => item.type == 'main');

  useEffect(() => {
    if (data.length == 0) dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef?.current;

    function handleScroll() {
      const sections = ['Булки', 'Соусы', 'Начинки'].map(tab => document.getElementById(tab));
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const closestSection = sections.reduce((closest, section) => {
        const distance = Math.abs(section.getBoundingClientRect().top - containerTop);
        return distance < Math.abs(closest.getBoundingClientRect().top - containerTop) ? section : closest;
      });
      setCurrentTab(closestSection?.id);
    }
    
    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => scrollContainer?.removeEventListener('scroll', handleScroll)
   }, [scrollContainerRef.current]);

  function handleTabClick(tab) {
    document.getElementById(tab)?.scrollIntoView();
    setCurrentTab(tab);
  }

  return (
    <section className={styles.container}>

      {loadingData ?
      <div className='text text_type_main-default text_color_inactive mt-10'>Везем ингредиенты...</div> :
    
      loadingError ?
      <div className='text text_type_main-default text_color_inactive mt-10'>Проблема с поставками, попробуйте обновить страницу</div> :
    
      <>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        
        <div className={styles.tabs}>
          <Tab value='Булки' active={currentTab === 'Булки'} onClick={handleTabClick}>Булки</Tab>
          <Tab value='Соусы' active={currentTab === 'Соусы'} onClick={handleTabClick}>Соусы</Tab>
          <Tab value='Начинки' active={currentTab === 'Начинки'} onClick={handleTabClick}>Начинки</Tab>
        </div>

        <div className={styles.ingredients} ref={scrollContainerRef}>
          <IngredientGroup type='Булки' data={buns}/>
          <IngredientGroup type='Соусы' data={sauces}/>
          <IngredientGroup type='Начинки' data={mains}/>
        </div>

      </>}
    </section>
  )
}