import {useState, useEffect} from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import * as auth from '../utils/auth';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoTooltipOpen,  setIsInfoTooltipOpen] = useState(false);
  const [isSuccessfully, setIsSuccessfully] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authorizationEmail, setAuthorizationEmail] = useState('');
  const [cardToDelete, setCardToDelete] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [menuOpened, setMenuOpened] = useState(false);
  
  const navigate = useNavigate();

  //проверям токен и авторизовываем пользователя
  useEffect(() => {
    /*const jwt = localStorage.getItem('jwt');

    if(jwt) {
      auth.checkToken(jwt).then((data) => {
        console.log(data);
        if(data) {
          setLoggedIn(true);
          navigate('/');
          setAuthorizationEmail(data.email);
        }
      })
      .catch(error => console.log(`Ошибка: ${error}`));
    }*/

    auth.checkToken()
      .then(data => {
        if (data) {
          setLoggedIn(true);
          navigate('/', {replace: true});
          setAuthorizationEmail(data.email);

          /*Promise.all([api.getInitialItems(), api.getUserInfo()])
            .then(([initialItems, userData]) => {
              setCurrentUser(userData);
              setCards(initialItems);
            })
            .catch(error => console.log(`Ошибка: ${error}`))*/
          }
        }
      )
      .catch(error => console.log(`Необходима авторизация. ${error}`))
    /*
    api.getUserInfo()
      .then(data => {
        if (data) {
          setLoggedIn(true);
          navigate('/', {replace: true});
          setAuthorizationEmail(data.email);

          console.log('after: ' + loggedIn)

          Promise.all([api.getInitialItems(), api.getUserInfo()])
            .then(([initialItems, userData]) => {
              setCurrentUser(userData);
              setCards(initialItems);
            })
            .catch(error => console.log(`Ошибка: ${error}`))
        }
      })
      .catch(() => { return false });*/
  }, [navigate]);

  //получаем данные пользователя и карточки с сервера
  
  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getInitialItems(), api.getUserInfo()])
        .then(([initialItems, userData]) => {
          setCurrentUser(userData);
          setCards(initialItems);
        })
        .catch(error => console.log(`Ошибка: ${error}`))
    }
  }, [loggedIn]);
  
  //удаляем токен
  /*
  const handleSignOut = () => {
    setAuthorizationEmail('');
    //localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-up');
  };
  */

  const handleSignOut = () => {
    auth.signout()
      .then(() => {
        setAuthorizationEmail('');
        setLoggedIn(false);
      })
      .catch(error => {
        handleInfoTooltip();
        setIsSuccessfully(false);
        console.log(`Ошибка: ${error}`)
      })
  } 

  //обработка регистрации пользователя
  const handleUserRegistration = (values) => {
    if(!values.email || !values.password) {
      return;
    }

    auth.register(values.email, values.password)
      .then(res => {
        if (res) {
          setIsSuccessfully(true);
          navigate('/sign-in', { replace: true });
        }
        
        if (menuOpened) {
          handleMenuClick();
        }
      })
      .catch(error => {
        setIsSuccessfully(false);
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        handleInfoTooltip();
      });
  }

  //обработка авторизации пользователя
  const handleUserAuthorization = (values) => {
    if(!values.email || !values.password) {
      return;
    }
    auth.authorize(values.email, values.password)
      .then(res => {

        //localStorage.setItem('jwt', res.jwt);
        if (res) {
          setLoggedIn(true);
          setAuthorizationEmail(values.email);
          navigate('/', {replace: true});
        }
        
        if (menuOpened) {
          handleMenuClick();
        }
      })
      .catch(error => {
        setIsSuccessfully(false);
        handleInfoTooltip();
        console.log(`Ошибка: ${error}`)
      });
  }

  //открываем меню в мобильной версии
  const handleMenuClick = () => {
    setMenuOpened(!menuOpened);
  };

  //открываем попап обновления аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  //открываем попап редактирования профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  //открываем попап добавления карточки
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  //открываем попап статуса
  const handleInfoTooltip = () => {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  };

  //закрываем все попапы
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  //закрываем форму по клавише Escape
  const handleEscClose = event => {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  };
  
  //закрываем форму по нажатию клавиши мыши
  const handleCloseByClick = event => {
    if (event.target === event.currentTarget || event.target.classList.contains('popup_opened')) {
      closeAllPopups();
    };
  };

  //открываем картинку выбранной карточки 
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  //проставляем лайк
  const handleCardLike = (card) => {

    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards(state => state?.map(c => c._id === card._id ? newCard : c)) 
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  };

  //удаляем карточку
  const handleCardDelete = (card)  => {
    setIsLoading(true);

    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id != card._id));
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => {setIsLoading(false)});
  };

  //обработчик кнопки удаления карточки
  const handleCardDeleteClick = (card) => {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
    setCardToDelete(card);
  }

  //редактируем данные пользователя
  const handleUpdateUser = (user) => {

    setIsLoading(true);

    api.editProfile(user)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => {setIsLoading(false)});
  };

  //редактируем аватар
  const handleUpdateAvatar = (user) => {
    setIsLoading(true);
    
    api.updateAvatar(user)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => {setIsLoading(false)});
  };

  //добавляем новую карточку
  const handleAddPlaceSubmit = (newCard) => {

    setIsLoading(true);
    
    api.addNewItem(newCard)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => {setIsLoading(false)});
  }

  //навешиваем / убираем обработчики закрытия
  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isConfirmationPopupOpen || selectedCard) {
      document.addEventListener('keydown', handleEscClose);
      document.addEventListener('mousedown', handleCloseByClick);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleCloseByClick);
    };
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isConfirmationPopupOpen, selectedCard]);
      
  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className='page'>
        <Header 
          email={authorizationEmail}
          onSignOut={handleSignOut}
          menuOpened={menuOpened}
          onMenuClick={handleMenuClick}
        />
        <Routes>
          <Route
            path='/'
            element = {
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick} 
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete ={handleCardDelete}
                onCardDeleteClick={handleCardDeleteClick}
                cards = {cards}
              />
            }
          />
          <Route path='/sign-up' element={<Register onRegister={handleUserRegistration} />}/>
          <Route path='/sign-in' element={<Login onLogin={handleUserAuthorization} />}/>
          <Route path="*" element={ loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" /> }/>
        </Routes>
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />
        <PopupWithConfirmation
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={cardToDelete}
          onLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccessfully={isSuccessfully}
        />
      </div>
    </CurrentUserContext.Provider> 
  );
}

export default App;