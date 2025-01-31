import { sendNewPassword } from '../services/reset-password';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import '../index.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ResetPassword() {

  const location = useLocation();
  const navigate = useNavigate();

  const { passwordResetSuccess } = useSelector((state) => state.password);

  useEffect(() => {
    if (location.state?.from !== 'forgot') {
      navigate(-1, { replace: true });
    }
  }, [location, navigate]);
  
  if (passwordResetSuccess) return (
    <Navigate to='/login' replace />
  )

  return (
    <div className='service-page-container'>
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      <Form inputs={['password', 'token']} placeholders={['Введите новый пароль', 'Введите код из письма']} onSubmit={sendNewPassword} button={'Сохранить'}/>
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