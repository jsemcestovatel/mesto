import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitForm }, settings, popupSelector) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(settings.formSelector);
    this._inputSelector = settings.inputSelector;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.id] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  };
}
