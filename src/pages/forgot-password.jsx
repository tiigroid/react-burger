import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { sendEmailForPassword } from '../services/reset-password';
import Form from '../components/form/form';
import '../index.css';

export default function ForgotPassword() {

  const { accessToken } = useSelector((state) => state.auth);
  const { resetEmailSent } = useSelector((state) => state.password);

  if (accessToken) return (
    <Navigate to='/' replace />
  )

  if (resetEmailSent) return (
    <Navigate to='/reset-password' replace state={{ from: 'forgot' }}/>
  )

  return (
    <div className='service-page-container'>
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      <Form inputs={['email']} placeholders={['Укажите e-mail']} onSubmit={sendEmailForPassword} button={'Восстановить'}/>
      <div className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль?
        <Link to='/login'>
          <Button htmlType='button' type='secondary' size='small' extraClass='text text_type_main-default ml-2 mb-4'>
            Войти
          </Button>
        </Link>
      </div>
    </div>
  )
}