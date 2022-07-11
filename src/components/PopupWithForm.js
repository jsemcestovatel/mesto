import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitForm }, settings, popupElement) {
    super(popupElement);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(settings.formSelector);
    this._inputList = this._form.querySelectorAll(settings.inputSelector);
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
