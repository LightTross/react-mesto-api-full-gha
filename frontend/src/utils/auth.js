class Auth {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(res => this._checkResponse(res));
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}),
    }).then(res => this._checkResponse(res));
  };

  authorize = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    }).then(res => this._checkResponse(res));
  };
};

const auth = new Auth({
  baseUrl: 'https://api.talalayeva.mesto.nomoredomains.monster',
});

export default auth;