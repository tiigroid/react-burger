import { register } from '../services/auth';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import '../index.css';
import { useSelector } from 'react-redux';

export default function Register() {

  const { accessToken } = useSelector((state) => state.auth);

  if (accessToken) return (
    <Navigate to='/' replace />
  )

  return (
    <div className='service-page-container'>
      <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
      <Form inputs={['name', 'email', 'password']} placeholders={['Имя', 'E-mail', 'Пароль']} onSubmit={register} button={'Зарегистрироваться'}/>
      <div className='text text_type_main-default text_color_inactive'>
        Уже зарегистрированы?
        <Link to='/login'>
          <Button htmlType='button' type='secondary' size='small' extraClass='text text_type_main-default ml-2 mb-4'>
            Войти
          </Button>
        </Link>
      </div>
    </div>
  )
}