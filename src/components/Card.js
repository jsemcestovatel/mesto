export default class Card {
  constructor({ elementData, myID, handleOpenCard, handleDeleteCard, handleLikeCard, handleDislikeCard}, settings) {
    this._data = elementData;
    this._link = elementData.link;
    this._alt = "Иллюстрация " + elementData.name;
    this._name = elementData.name;
    this._myID = myID;
    this._cardID = elementData._id;
    this._ownerID = elementData.owner._id;
    this._likes = elementData.likes;
    this._countlikes = elementData.likes.length;
    this._template = settings.templateSelector;
    this._cardSelector = settings.cardSelector;
    this._handleOpenCard = handleOpenCard;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleDislikeCard = handleDislikeCard;
  }

  // Создать разметку карточку в зависимости от владельца карточки
  _getTemplate() {
    const owner = this._ownerID === this._myID ? true : false;
    const template = document
      .querySelector(this._template)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);
    // проверка на owner, если нет то элемент корзины убрать
    if (!owner) {
      template.querySelector(".element__delete").remove();
    }
    return template;
  }

  _isLiked() {
    return this._likes.some((data) => {
      return data._id.includes(this._myID)
    });
  };

  _getLikeCard = () => {
    if (this._isLiked()) {
      this._handleDislikeCard(this);
    } else {
      this._handleLikeCard(this);
    }
  };

  // Поставить или убрать сердечко
  updateLikes(stat, data) {
    if (stat) {
      this._like.classList.add("element__like_active");
    } else {
      this._like.classList.remove("element__like_active");
    }
    // обновить количество лайков в карточке полученное от сервера значение
    this._likes = data.likes;
    this._number.textContent = data.likes.length;
  }

  // Удалить карточку из разметки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Слушатели событий
  _setEventListeners() {
    // Реакция Открыть
    this._image.addEventListener("click", () => this._handleOpenCard(this));
    // Реакция like и dislike
    this._like.addEventListener("click", () => this._getLikeCard(this));
    // проверка на наличие разметки, если нет корзины то нет слушателя
    if (this._delete) {this._delete.addEventListener("click", () => this._handleDeleteCard(this))};
  }

  // Отрисовать карточку
  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__name").textContent = this._name;
    this._image = this._element.querySelector(".element__photo");
    this._image.src = this._link;
    this._image.alt = this._alt;
    this._like = this._element.querySelector(".element__like");
    this._number = this._element.querySelector(".element__count");
    this._delete = this._element.querySelector(".element__delete");
    // Проставить сердечки если карточка была лайкнута тобой ранее
    if (this._isLiked()) {
      this.updateLikes(true,this._data);
    } else {
      this.updateLikes(false,this._data);
    }
    this._setEventListeners();
    return this._element;
  }
}
