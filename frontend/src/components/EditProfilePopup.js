import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';


function EditProfilePopup({isOpen, onClose, onUpdateUser, onLoading}) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, resetForm, setValues, setIsValid} = useFormAndValidation();


  useEffect(() => {
    if (currentUser) {
      setValues({username: currentUser.name, about: currentUser.about});
      setIsValid(true);
    }

    if (!isOpen) {
      resetForm();
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({name: values.username, about: values.about});
  } 


  return (
    <PopupWithForm 
      title='Редактировать профиль'
      name='profile'
      buttonText={onLoading ? 'Сохранение...' : 'Сохранить'} 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      >
      <input
        id='username-input'
        type='text'
        className='form__input form__input_info_name'
        name='username'
        placeholder='Имя'
        minLength={2}
        maxLength={40}
        required=''
        value={values.username || ''}
        onChange={handleChange}
      />
      <span className={`form__input-error username-input-error ${isValid ? '' : 'form__input-error_active'}`}>{errors.username}</span>
      <input
        id='about-input'
        type='text'
        className='form__input form__input_info_about'
        name='about'
        placeholder='О себе'
        minLength={2}
        maxLength={200}
        required=''
        value={values.about || ''}
        onChange={handleChange}
      />
      <span className={`form__input-error about-input-error ${isValid ? '' : 'form__input-error_active'}`}>{errors.about}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;