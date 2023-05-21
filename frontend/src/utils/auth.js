const baseUrl  = 'https://api.talalayeva.mesto.nomoredomains.monster';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const checkResponse = (res) => {
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

/*export const checkToken = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((res) => checkResponse(res))
};*/

export const checkToken = () => {
  return fetch(`${baseUrl}/check`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((res) => checkResponse(res))
};

export const signout = () => {
  return fetch(`${baseUrl}/signout`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((res) => checkResponse(res));
};