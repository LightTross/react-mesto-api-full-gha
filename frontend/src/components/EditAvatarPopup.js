import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, onLoading}) {
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
  
    if (isValid) {
      onUpdateAvatar({
        avatar: values.avatarLink
      });
    }  
  }

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <PopupWithForm 
      title='Обновить аватар'
      name='update-avatar'
      buttonText={onLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}>
    <input
      id='avatar-link-input'
      type='url'
      className='form__input form__input_avatar-link'
      name='avatarLink'
      placeholder='Ссылка на картинку'
      required=''
      value={values.avatarLink || ''}
      onChange={handleChange}
    />
    <span className={`form__input-error avatar-link-input-error ${isValid ? '' : 'form__input-error_active'}`}>{errors.avatarLink}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;