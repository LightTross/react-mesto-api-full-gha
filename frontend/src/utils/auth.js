const baseUrl  = 'https://api.talalayeva.mesto.nomoredomains.monster';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const checkResponse = (res) => {
  console.log('res');
  console.log(res);
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};


export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    //credentials: 'include',
    headers,
    body: JSON.stringify({email, password}),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    //credentials: 'include',
    headers,
    body: JSON.stringify({email, password})
  }).then((res) => checkResponse(res));
};

export const checkToken = (token) => {
  console.log('token');
  console.log(token);
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then((res) => checkResponse(res));
};