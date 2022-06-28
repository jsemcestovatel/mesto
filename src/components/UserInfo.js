export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }

  // Получение данных от страницы профиля в popup profile
  getUserInfo() {
    this._profileValues = {};
    this._profileValues.name = this._name.textContent;
    this._profileValues.description = this._description.textContent;
    return this._profileValues;
  }

  // Сохранение данных из popup profile на страницу
  setUserInfo(inputValues) {
    this._name.textContent = inputValues["name"];
    this._description.textContent = inputValues["about"];
  }
}
