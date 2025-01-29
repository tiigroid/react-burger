import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home';
import Profile from '../../pages/profile';
import Register from '../../pages/register';
import Login from '../../pages/login';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import NotFound from '../../pages/not-found';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ProtectedRouteElement from '../protected-route-element';

export default function App() {

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path='/' element={<HomePage />} >
            <Route path='/ingredients/:id' element={<IngredientDetails />}/>
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/profile' element={<ProtectedRouteElement element={<Profile />}/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
