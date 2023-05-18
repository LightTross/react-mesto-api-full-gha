import { BASE_URL } from './utils';
//import { BASE_URL } from './auth';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //получаем ответ на запрос
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //загрузка информации о пользователе с сервера
  getUserInfo(/*jwt*/) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
      /*headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }*/
    })
      .then(res => this._checkResponse(res));
  }

  //загрузка элементов с сервера
  getInitialItems(/*jwt*/) {
    return fetch(`${this._baseUrl}/cards`, {
      /*headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }*/
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  //редактирование профиля
  editProfile(data/*, jwt*/) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      /*headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },*/
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
      .then(res => this._checkResponse(res));
  }

  //добавление нового элемента
  addNewItem(data/*, jwt*/) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      /*headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },*/
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._checkResponse(res));
  }

  //удаление элемента
  deleteCard(itemId/*, jwt*/) {
    return fetch(`${this._baseUrl}/cards/${itemId}`, {
      method: 'DELETE',
      /*headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },*/
      headers: this._headers,
    })
      .then(res => this._checkResponse(res));
  }

  //постановка и снятие лайка
  changeLikeCardStatus(itemId, isLiked/*, jwt*/) {
    return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      /*headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },*/
      headers: this._headers,
    })
      .then(res => this._checkResponse(res));
  }

  //обновление аватара пользователя
  updateAvatar(user/*, jwt*/) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      /*headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },*/
      headers: this._headers,
      body: JSON.stringify({
        avatar: user.avatar
      })
    })
      .then(res => this._checkResponse(res));
  }
}

//параметры для запроса к серверу
const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  },
});

export default api;