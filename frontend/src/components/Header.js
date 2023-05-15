import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import logoHeader from '../images/header_logo.svg';
import menuButton from '../images/menu-button.svg';
import menuCloseButton from '../images/menu-close.svg';

function Header({email, onSignOut, menuOpened, onMenuClick}) {
  return (   
    <header className='header'>
      <div className={`header__nav-mobile ${menuOpened ? 'header__nav-mobile_opened' : ''}`}>
        {email && <p className='header__email'>{email}</p>}
        <Routes>
          <Route
            path='/sign-up'
            element={
              <Link className='header__link' onClick={onMenuClick} to='/sign-in'>
                Войти
              </Link>
            }
          />
          <Route
            path='/sign-in'
            element={
              <Link className='header__link' onClick={onMenuClick} to='/sign-up'>
                Регистрация
              </Link>
            }
          />
          <Route
            path='/'
            element={
              <Link className='header__link header__link_exit' onClick={() => {onSignOut(); onMenuClick();}} to='/sign-in'>
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
      <div className='header__container'>
        <img
          className='header__logo'
          src={logoHeader}
          alt='Место'
        />
        <button 
          className='header__button'
          onClick={onMenuClick}
        >{menuOpened ? <img src={menuCloseButton} alt='Открыть меню' /> : <img src={menuButton} alt='Закрыть меню' />}</button>
        <div className='header__nav'>
          { email && <p className='header__email'>{email}</p> }
          <Routes>
            <Route
              path='/sign-up'
              element={
                <Link className='header__link' to='/sign-in'>
                  Войти
                </Link>
              }
            />
            <Route
              path='/sign-in'
              element={
                <Link className='header__link' to='/sign-up'>
                  Регистрация
                </Link>
              }
            />
            <Route
              path='/'
              element={
                <Link className='header__link header__link_exit' onClick={onSignOut} to='/sign-in'>
                  Выйти
                </Link>
              }
            />
          </Routes>
        </div>
      </div>
    </header>
  );
}

export default Header;