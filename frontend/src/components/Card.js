import {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDeleteClick}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`elements__like ${isLiked && 'elements__like_active'}`);
 
  const handleClick = () => {
    onCardClick(card);
  };

  const handleDeleteClick = () => {
    onCardDeleteClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  return (
    <li key={card._id} className='elements__item'>
      <img className='elements__image' 
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className='elements__card-container'>
        <h2 className='elements__title'>{card.name}</h2>
        <div className='elements__like-container'>
          <button
            type='button'
            aria-label='Поставить лайк'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className='elements__like-counter'>{card.likes.length}</span>
        </div>
      </div>
      {isOwn && <button 
          type='button'
          className={'elements__button-remove'}
          onClick={handleDeleteClick} />}
    </li>
  );
}

export default Card;