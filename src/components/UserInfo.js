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
  setUserInfo(inputValues) {
    //console.log(inputValues);
    this._name.textContent = inputValues["name"];
    this._about.textContent = inputValues["about"];
    this._avatar.src = inputValues["avatar"];
  }
}
