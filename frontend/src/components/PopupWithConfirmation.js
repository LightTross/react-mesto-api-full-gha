import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithConfirmation({isOpen, onClose, onCardDelete, card, onLoading}) {
  const handleCardDelete = (e) => {
    e.preventDefault();
    
    onCardDelete(card);
    };

    return (
      <PopupWithForm 
        title='Вы уверены?' 
        name='delete-item' 
        buttonText={onLoading ? 'Удаление...' : 'Да'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCardDelete}
        isValid={true}
      />
    )
}

export default PopupWithConfirmation;