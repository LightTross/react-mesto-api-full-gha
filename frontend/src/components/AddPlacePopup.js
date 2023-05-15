import {useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function AddPlacePopup({isOpen, onClose, onAddPlace, onLoading}) {
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    
    if (isValid) {
      onAddPlace({name: values.title, link: values.link});
    }
  };

  //сброс формы
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);


  return (
    <PopupWithForm 
      title='Новое место'
      name='item'
      buttonText={onLoading ? 'Создание...' : 'Создать'}
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}>
    <input
      id='title-input'
      type='text'
      className='form__input form__input_title'
      name='title'
      placeholder='Название'
      minLength={2}
      maxLength={30}
      required=''
      value={values.title || ''}
      onChange={handleChange}
    />
    <span className={`form__input-error title-input-error ${isValid ? '' : 'form__input-error_active'}`}>{errors.title}</span>
    <input
      id='link-input'
      type='url'
      className='form__input form__input_link'
      name='link'
      placeholder='Ссылка на картинку'
      required=''
      value={values.link || ''}
      onChange={handleChange}
    />
    <span className={`form__input-error link-input-error ${isValid ? '' : 'form__input-error_active'}`}>{errors.link}</span>
    </PopupWithForm>
  ) 
}

export default AddPlacePopup;