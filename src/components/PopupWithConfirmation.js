import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }

  setSubmit(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {this._handleSubmit()});
    // this._submitButton.addEventListener("click", () => console.log('Click'));
  }
}
