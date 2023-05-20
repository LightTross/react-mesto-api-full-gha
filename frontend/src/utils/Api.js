export default class Api {
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
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }

  //загрузка элементов с сервера
  getInitialItems() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }

  //редактирование профиля
  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }

  //добавление нового элемента
  addNewItem(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }

  //удаление элемента
  deleteCard(itemId) {
    return fetch(`${this._baseUrl}/cards/${itemId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }

  //постановка и снятие лайка
  changeLikeCardStatus(itemId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }

  //обновление аватара пользователя
  updateAvatar(user) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: user.avatar
      }),
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }
}