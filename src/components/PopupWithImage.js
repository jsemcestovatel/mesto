import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(elementData, settings, popupSelector) {
    super(popupSelector);
    this._link = elementData.link;
    this._alt = elementData.alt;
    this._name = elementData.name;
    this._popupShowElement = popupSelector;
    this._popupShowElementImage = this._popupShowElement.querySelector(
      settings.popupShowElementImage
    );
    this._popupShowElementTitle = this._popupShowElement.querySelector(
      settings.popupShowElementTitle
    );
  }

  open() {
    this._popupShowElementImage.src = this._link;
    this._popupShowElementImage.alt = this._alt;
    this._popupShowElementTitle.textContent = this._name;
    super.open();
  }
}
