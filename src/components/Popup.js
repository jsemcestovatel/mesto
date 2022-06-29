export default class Popup {
  constructor(popupElement) {
    this._popup = popupElement;
    this._escClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._escClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._escClose);
  }

  // Закрыть модальное окно по клавише Esc
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  // Закрыть модальное окно по крестику или по внешней области
  _handleClosePopup = (evt) => {
    const target = evt.target.classList;
    if (target.contains("popup") || target.contains("popup__close-button")) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", this._handleClosePopup);
  }
}
