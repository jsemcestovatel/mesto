export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._name = name;
    this._about = description;
    this._avatar = avatar;
  }

  // Получение данных от страницы профиля в popup profile
  getUserInfo() {
    this._profileValues = {};
    this._profileValues.name = this._name.textContent;
    this._profileValues.description = this._about.textContent;
    this._profileValues.avatar = this._avatar.src;
    return this._profileValues;
  }

  // Сохранение данных из popup profile на страницу
  setUserInfo( { name, about, avatar, _id } ) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }

}
