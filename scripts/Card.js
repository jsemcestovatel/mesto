import {openPopup, popupShowElement, elementImage, elementTitle} from "./Utils.js"

export default class Card {
  constructor(elementData, settings) {
    this._link = elementData.link;
    this._alt = elementData.alt;
    this._name = elementData.name;
    this._template = settings.templateSelector;
    this._cardSelector = settings.cardSelector;
  }

  // Создать разметку карточку и навесить события
  _getTemplate() {
    return document
      .querySelector(this._template)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);
  }

  // Слушатели событий
  _setEventListeners() {
    this._image.addEventListener("click", () => this._openElement());
    this._like.addEventListener("click", () => this._likeElement());
    this._delete.addEventListener("click", () => this._deleteElement());
  }

  // Реакция Открыть
  _openElement() {
    elementImage.src = this._image.src;
    elementImage.alt = this._image.alt;
    elementTitle.textContent = this._name;
    openPopup(popupShowElement)();
  }

  // Реакция Нравится
  _likeElement() {
    this._like.classList.toggle("element__like_active");
  }

  // Реакция Удалить
  _deleteElement() {
    this._element.remove();
    this._element = null;
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
