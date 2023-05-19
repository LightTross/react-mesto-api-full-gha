const baseUrl  = 'https://api.talalayeva.mesto.nomoredomains.monster';

 //получаем ответ на запрос
  export const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

//загрузка информации о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
    .then((res) => checkResponse(res));
}

//загрузка элементов с сервера
export const getInitialItems = () => {
  return fetch(`${baseUrl}/cards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
  .then((res) => checkResponse(res));
}

//редактирование профиля
export const editProfile = (data) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    }),
  })
    .then((res) => checkResponse(res));
}

//добавление нового элемента
export const addNewItem = (data) => {
    return fetch(`${baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => checkResponse(res));
  }

  //удаление элемента
  export const deleteCard = (itemId/*, jwt*/) => {
    return fetch(`${baseUrl}/cards/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((res) => checkResponse(res));
  }

  //постановка и снятие лайка
  export const changeLikeCardStatus = (itemId, isLiked) => {
    return fetch(`${baseUrl}/cards/${itemId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((res) => checkResponse(res));
  }

//обновление аватара пользователя
export const updateAvatar = (user) => {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      avatar: user.avatar
    })
  })
    .then((res) => checkResponse(res));
}