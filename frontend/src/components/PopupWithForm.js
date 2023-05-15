import React from 'react';

function PopupWithForm(
  props
) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          aria-label='Закрыть'
          className='popup__button-close'
          onClick={props.onClose}
        />
        <h2 className='popup__title'>{props.title}</h2>
        <form 
          className='form' 
          name={`${props.name}`}
          onSubmit={props.onSubmit} 
          noValidate>
          {props.children}
          <button type='submit' className='form__button-submit'>
              {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;