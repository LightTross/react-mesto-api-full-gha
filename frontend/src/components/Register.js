import {Link} from 'react-router-dom';
import useFormAndValidation from '../hooks/useFormAndValidation';

const Register = ({onRegister, onSubmitClick}) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <>
      <div className='auth'>
        <h2 className='auth__title'>Регистрация</h2>
        <form className='form' onSubmit={handleSubmit}>
          <input
            id='email'
            type='email'
            className='form__input auth__input'
            name='email'
            placeholder='Email'
            minLength={2}
            maxLength={40}
            required=''
            value={values.email || ''}
            onChange={handleChange}
          />
          <span className={`form__input-error ${isValid ? '' : 'form__input-error_active'}`}>{errors.email}</span>
          <input 
            id='password'
            type='password'
            className='form__input auth__input'
            name='password'
            placeholder='Пароль'
            minLength={8}
            maxLength={20}
            required=''
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className={`form__input-error ${isValid ? '' : 'form__input-error_active'}`}>{errors.password}</span>
          <button 
            type='submit'
            className='form__button-submit auth__button-submit'
            disabled={!isValid}
            onClick={onSubmitClick}
          >Зарегистрироваться</button>  
        </form>
      </div>
      <Link to='/sign-in' className='auth__link'>Уже зарегистрированы? Войти</Link>
    </> 
  );
};

export default Register;