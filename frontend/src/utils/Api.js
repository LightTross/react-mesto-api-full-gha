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
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  //загрузка элементов с сервера
  getInitialItems() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
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
      })
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
      })
    })
      .then(res => this._checkResponse(res));
  }

  //удаление элемента
  deleteCard(itemId) {
    return fetch(`${this._baseUrl}/cards/${itemId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  //постановка и снятие лайка
  changeLikeCardStatus(itemId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
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
      })
    })
      .then(res => this._checkResponse(res));
  }
}

//параметры для запроса к серверу
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '35d66a15-d267-44df-89c1-13d257cc7168',
    'Content-Type': 'application/json'
  }
});

export default api;