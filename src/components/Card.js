export default class Card {
  constructor({ elementData, handleCardClick }, settings) {
    this._link = elementData.link;
    this._alt = elementData.alt;
    this._name = elementData.name;
    this._template = settings.templateSelector;
    this._cardSelector = settings.cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // Создать разметку карточку и навесить события
  _getTemplate() {
    return document
      .querySelector(this._template)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);
  }

  // Реакция Открыть
  _handleCardClick() {
    this._handleCardClick();
  }

  // Реакция Нравится
  _handleLikeCard() {
    this._like.classList.toggle("element__like_active");
  }

  // Реакция Удалить
  _handleDeliteCard() {
    this._element.remove();
    this._element = null;
  }

  // Слушатели событий
  _setEventListeners() {
    this._image.addEventListener("click", () => this._handleCardClick());
    this._like.addEventListener("click", () => this._handleLikeCard());
    this._delete.addEventListener("click", () => this._handleDeliteCard());
  }

  // Отрисовать карточку
  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__name").textContent = this._name;
    this._image = this._element.querySelector(".element__photo");
    this._image.src = this._link;
    this._image.alt = this._alt;
    this._like = this._element.querySelector(".element__like");
    this._delete = this._element.querySelector(".element__delete");
    this._setEventListeners();
    return this._element;
  }
}
