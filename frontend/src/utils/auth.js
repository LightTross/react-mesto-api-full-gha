import { baseUrl } from './api';

const headers = {
  'Content-Type': 'application/json',
};

const checkResponse = (res) => {
  console.log(res)
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};


export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({email, password}),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({email, password})
  }).then((res) => checkResponse(res));
};

export const checkToken = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${token}`
    },
  }).then((res) => checkResponse(res));
};