import useFormAndValidation from '../hooks/useFormAndValidation';

const Login = ({onLogin, onSubmitClick}) => {
  const {values, handleChange, errors, isValid} = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values);
  };

  return (
    <div className='auth'>
      <h2 className='auth__title'>Вход</h2>
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
        >Войти</button>
      </form>
    </div>
  );
};

export default Login;