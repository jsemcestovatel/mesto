import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(settings, popupElement) {
    super(popupElement);
    this._popupShowElementImage = this._popup.querySelector(
      settings.popupShowElementImage
    );
    this._popupShowElementTitle = this._popup.querySelector(
      settings.popupShowElementTitle
    );
  }

  open(elementData) {
    this._popupShowElementImage.src = elementData.link;
    this._popupShowElementImage.alt = elementData.alt;
    this._popupShowElementTitle.textContent = elementData.name;
    super.open();
  }
}
