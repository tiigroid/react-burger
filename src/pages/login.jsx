import { login } from '../services/auth';
import { useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import '../index.css';

export default function Login() {

  const location = useLocation();

  const { accessToken } = useSelector((state) => state.auth);

  if (accessToken) return (
    <Navigate to={location.state?.from || '/'} replace />
  )

  return (
    <div className='service-page-container'>
      <h1 className='text text_type_main-medium mb-6'>Вход</h1>
      <Form inputs={['email', 'password']} placeholders={['E-mail', 'Пароль']} onSubmit={login} button={'Войти'}/>
      <div className='text text_type_main-default text_color_inactive'>
        Вы - новый пользователь?
        <Link to='/register'>
          <Button htmlType='button' type='secondary' size='small' extraClass='text text_type_main-default ml-2 mb-4'>
            Зарегистрироваться
          </Button>
        </Link>
      </div>
      <div className='text text_type_main-default text_color_inactive'>
        Забыли пароль?
        <Link to='/forgot-password'>
          <Button htmlType='button' type='secondary' size='small' extraClass='text text_type_main-default ml-2'>
          Восстановить пароль
          </Button>
        </Link>
      </div>
    </div>
  )
}