export default class FormValidator {
  constructor(formSelector, settings) {
    this._form = formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    // получить массив из всех полей input
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    // получить кнопку submit
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  ///
  // установка слушителей элементам в форме
  _setEventListeners() {
    // первоначальная установка кнопки в disabled-состояние
    this._toggleButtonState();
    // проход по каждому полю input для установки слушателя и проверки значения поля и блокировка/разблокировка кнопки submit
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // проверка полей на валидность
  _checkInputValidity(inputElement) {
    if (inputElement.checkValidity()) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  // скрыть описание ошибки
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  // показать описание ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  // установка состояния кнопки submit
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  // поиск ошибки в полях методом some
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.checkValidity();
    });
  }

  // выключить кнопку
  disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  // включить кнопку
  enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled", true);
  }

  // сбросить ошибки и стили полей формы
  resetErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
