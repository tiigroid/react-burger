import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CheckMarkIcon, CloseIcon, EditIcon, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchUserData, patchUserData, logout } from '../services/auth';
import styles from './profile.module.css';

export default function Profile() {

  const dispatch = useDispatch();

  const { name, email } = useSelector((state) => state.auth.userData);

  const [editing, setEditing] = useState([]);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (!name || !email) {
      dispatch(fetchUserData());
    } else {
      setUserData({ name, email, password: '********' })
    }
  }, [name, email, dispatch]);

  function handleEditing(input) {
    if (editing.includes(input)) {
      setEditing(editing.filter(item => item != input));
    } else {
      setEditing([...editing, input]);
      if (input == 'password') setUserData({ ...userData, password: '' });
    }
  }

  function handleClosing(input) {
    handleEditing(input);
    if (input == 'name') setUserData({ ...userData, name });
    if (input == 'email') setUserData({ ...userData, email });
    if (input == 'password') setUserData({ ...userData, password: '********' });
  }

  function checkDisabled(value) {
    return editing.includes(value) ? false : true;
  }

  function handleUpdate() {
    dispatch(patchUserData({ ...userData, password: userData.password == '********' ? null : userData.password }));
    setEditing([]);
  }

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className={styles.container}>
      <div>
        <nav className={styles.nav}>
          <NavLink to='/profile'>{({isActive}) => (<div className={'text text_type_main-medium mt-4 mb-4 ' + (isActive ? '' : 'text_color_inactive')}>Профиль</div>)}</NavLink>
          <NavLink to='/profile/orders'>{({isActive}) => (<div className={'text text_type_main-medium mt-4 mb-4 ' + (isActive ? '' : 'text_color_inactive')}>История заказов</div>)}</NavLink>
          <div onClick={handleLogout} className={'text text_type_main-medium mt-4 mb-4 text_color_inactive ' + styles.logout}>Выход</div>
        </nav>
        <div className='text text_type_main-default text_color_inactive mt-20'>В этом разделе вы можете изменить свои персональные данные</div>
      </div>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <Input value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} placeholder='Имя' disabled={checkDisabled('name')}/>
          <div className={styles.icon}>
            {!editing.includes('name') 
            ? <div onClick={() => handleEditing('name')}><EditIcon/></div>
            : 
            <>
              <div onClick={handleUpdate}><CheckMarkIcon/></div>
              <div className='ml-1' onClick={() => handleClosing('name')}><CloseIcon/></div>
            </>}
          </div>
        </div>
        <div className={styles.input}>
          <Input value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} placeholder='Логин' disabled={checkDisabled('email')}/>
          <div className={styles.icon}>
            {!editing.includes('email')
            ? <div onClick={() => handleEditing('email')}><EditIcon/></div>
            : 
            <>
              <div onClick={handleUpdate}><CheckMarkIcon/></div>
              <div className='ml-1' onClick={() => handleClosing('email')}><CloseIcon/></div>
            </>}
          </div>
        </div>
        <div className={styles.input}>
          <Input
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            type={!editing.includes('password') ? 'password' : 'text'}
            placeholder='Пароль'
            disabled={checkDisabled('password')}/>
          <div className={styles.icon}>
            {!editing.includes('password') 
            ? <div onClick={() => handleEditing('password')}><EditIcon/></div>
            : 
            <>
              <div onClick={handleUpdate}><CheckMarkIcon/></div>
              <div className='ml-1' onClick={() => handleClosing('password')}><CloseIcon/></div>
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}