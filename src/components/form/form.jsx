import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError } from '../../services/auth';
import { clearResetError } from '../../services/reset-password';
import { Button, HideIcon, Input, ShowIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import '../../index.css';
import styles from './form.module.css';
import ErrorPopup from '../error-popup/error-popup';

export default function Form({ inputs, placeholders, button, onSubmit }) {

  const dispatch = useDispatch();

  const { authLoading, authError } = useSelector((state) => state.auth);
  const { resetLoading, resetError } = useSelector((state) => state.password);

  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let initialState = {};
    inputs.forEach(input => initialState[input] = '');
    setForm(initialState);
  }, []);

  function handleSubmit(e) {
    e?.preventDefault();
    dispatch(onSubmit(form));
  }

  function resetErrors() {
    dispatch(clearAuthError());
    dispatch(clearResetError());
  }

  function checkDisabled() {
    let disabled = false;
    for (let key in form) {
      if (!form[key]) (disabled = true);
    }
    return disabled;
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <form className='service-page-form' onSubmit={handleSubmit}>
        {inputs.map((input, i) => (
          <div key={i} className={styles.input}>
            <Input
              value={form[input] || ''}
              onChange={(e) => setForm({ ...form, [input]: e.target.value})}
              placeholder={placeholders[i]}
              type={
                input == 'password' ? !showPassword ? 'password' : 'text' :
                input == 'email' ? 'email' : 'text'}/>
            {input == 'password' &&
            <div className={styles.icon} onClick={toggleShowPassword}>
              {!showPassword
                ? <ShowIcon/>
                : <HideIcon/>}
            </div>}
          </div>
        ))}
        <Button htmlType='submit' disabled={checkDisabled()}>{(!authLoading && !resetLoading) ? button : 'В процессе...'}</Button>
      </form>

      {(authError || resetError) && <ErrorPopup onClose={resetErrors}/>}
    </>
  )
}

Form.propTypes = {
  inputs: PropTypes.array.isRequired,
  placeholders: PropTypes.array.isRequired,
  button: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}