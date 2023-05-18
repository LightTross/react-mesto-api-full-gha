import { BASE_URL } from './utils';
//export const BASE_URL  = 'http://localhost:27017'; //'https://api.talalayeva.mesto.nomoredomains.monster';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const checkResponse = (res) => {
  console.log(res)
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};


export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    //credentials: 'include',
    headers,
    body: JSON.stringify({email, password}),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    //credentials: 'include',
    headers,
    body: JSON.stringify({email, password})
  }).then((res) => checkResponse(res));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then((res) => checkResponse(res));
};