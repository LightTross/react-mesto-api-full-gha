import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_image ${card.link ? 'popup_opened' : ''}`}>
      <div className='popup__container popup__container_image'>
        <button
          type='button'
          aria-label='Закрыть'
          className='popup__button-close'
          onClick = {onClose}
        />
        <figure className='figure'>
          <img 
            className='figure__image'
            src = {card.link}  
            alt = {card.name}
          />
          <figcaption className='figure__title'>{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;