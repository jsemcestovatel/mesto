import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(settings, popupElement) {
    super(popupElement);
    this._popupShowElement = this._popup;
    this._popupShowElementImage = this._popupShowElement.querySelector(
      settings.popupShowElementImage
    );
    this._popupShowElementTitle = this._popupShowElement.querySelector(
      settings.popupShowElementTitle
    );
  }

  open(elementData) {
    this._popupShowElementImage.src = elementData.link;;
    this._popupShowElementImage.alt = elementData.alt;
    this._popupShowElementTitle.textContent = elementData.name;
    super.open();
  }
}
