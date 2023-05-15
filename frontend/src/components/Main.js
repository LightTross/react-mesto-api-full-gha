import {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import addButtonImg from '../images/add-button.svg';
import profileUpdateAvatarButton from '../images/update-avatar-button.svg';
import Card from './Card';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  onCardDeleteClick,
  cards
}) {

  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar-container'>
          <img
            className='profile__avatar'
            src={currentUser.avatar}
            alt='Аватар'
          />
          <img
            onClick={onEditAvatar}
            className='profile__update-avatar-button'
            src={profileUpdateAvatarButton}
            alt='edit-profile'
          />
        </div>
        <div className='profile__info'>
          <h1 className='profile__name'>{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            type='button'
            aria-label='Редактировать профиль'
            className='profile__edit-button'
          />
          <p className='profile__about'>{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          type='button'
          aria-label='Добавить фотографии'
          className='profile__add-button'
        >
          <img
            src={addButtonImg}
            alt='Кнопка «добавить»'
            className='profile__add-button-img'
          />
        </button>
      </section>
      <section className='elements'>
        <ul className='elements__list'>
        {cards.map(card => {
          return (
            <Card
              key = {card._id}
              card = {card}
              onCardClick = {onCardClick}
              onCardLike = {onCardLike}
              onCardDeleteClick = {onCardDeleteClick}
            />
          );
        })}
        </ul>
      </section>
    </main>
  );
}

export default Main;