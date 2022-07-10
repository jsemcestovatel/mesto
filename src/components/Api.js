export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfoApi() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if (!res.ok) {return Promise.reject(`Ошибка при получении данных пользователя ${res.status} ${res.statusText}`)}
      return res.json();
    })
  }

  setUserInfoApi(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data["name"],
        about: data["about"]
      })
    })
    .then((res) => {
      if (!res.ok) {return Promise.reject(`Ошибка при сохранении данных пользователя ${res.status} ${res.statusText}`)}
      return res.json();
    })
  }

  updateAvatarApi(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data["avatar-link"]
      })
    })
    .then((res) => {
      if (!res.ok) {return Promise.reject(`Ошибка при обновлении аватар пользователя ${res.status} ${res.statusText}`)}
      return res.json();
    })
  }

  getCardsApi() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if (!res.ok) {return Promise.reject(`Ошибка при получении карточек всех пользователей ${res.status} ${res.statusText}`)}
      return res.json();
    })
  }

  addNewCardApi(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data["name"],
        link: data["link"]
      })
    })
    .then((res) => {
      if (!res.ok) {return Promise.reject(`Ошибка при получении карточек всех пользователей ${res.status} ${res.statusText}`)}
      return res.json();
    })
  }

  deleteCardApi(data) {
    return fetch(`${this._baseUrl}/cards/${data._cardID}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      if (!res.ok) {return Promise.reject(`Ошибка при удалении карточки ${res.status} ${res.statusText}`)}
      return res.json();
    })
  }

  likeCardApi(data) {
    return fetch(`${this._baseUrl}/cards/${data._cardID}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      if (!res.ok) {return Promise.reject(`Ошибка постановки like ${res.status} ${res.statusText}`)}
      return res.json();
    })
  }

  dislikeCardApi(data) {
    return fetch(`${this._baseUrl}/cards/${data._cardID}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      if (!res.ok) {return Promise.reject(`Ошибка снятия like ${res.status} ${res.statusText}`)}
      return res.json();
    })
  }
}
