import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {initialCards, settings, openPopup, closePopup} from "./Utils.js"

// переменные каждого popup окна
const popupEditProfile = document.querySelector(".popup_type_editprofile");
const popupAddElement = document.querySelector(".popup_type_addelement");

// формы модальных окон
const formEditProfile = document.forms.popupEditProfile;
const formAddElement = document.forms.popupAddElement;

// поля input в модальных окнах
const popupProfileName = popupEditProfile.querySelector(
  ".popup__input_type_name"
);
const popupProfileDescription = popupEditProfile.querySelector(
  ".popup__input_type_description"
);
const popupImageName = popupAddElement.querySelector(
  ".popup__input_type_imagename"
);
const popupImageLink = popupAddElement.querySelector(
  ".popup__input_type_imagelink"
);

// элементы из секции profile
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const buttonEditProfile = profile.querySelector(".profile__edit-button");
const buttonAddElement = profile.querySelector(".profile__add-button");

// Редактировать профиль
const openPopupEditProfile = () => {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
  popupProfileName.focus();
  formEditProfileValidator.resetErrors();
  formEditProfileValidator.disableButton();
  openPopup(popupEditProfile)();
};

// Добавить элемент карточки
const openPopupAddElement = () => {
  formAddElement.reset();
  popupImageName.focus();
  formAddElementValidator.resetErrors();
  formAddElementValidator.disableButton();
  openPopup(popupAddElement)();
};

// Сохранение данных из popup add element
const handleAddElementForm = (evt) => {
  // константа-объект ввода данных из окна popupAddElement
  const newElement = {};
  newElement.name = popupImageName.value;
  newElement.link = popupImageLink.value;
  newElement.alt = "Иллюстрация " + popupImageName.value;
  const newCard = new Card(newElement, settings);
  renderCard(newCard.createCard(), settings.cardContainerSelector);
  closePopup(popupAddElement)();
};

// Сохранение данных из popup profile
const handleEditProfileForm = (evt) => {
  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  closePopup(popupEditProfile)();
};

//////////////////// Card
const initial = () => {
  initialCards.forEach((elementData) => {
    const newCard = new Card(elementData, settings);
    renderCard(newCard.createCard(), settings.cardContainerSelector);
  });
};

// Отрисовка карточки
const renderCard = (cardElement, cardContainerSelector) => {
  document.querySelector(cardContainerSelector).prepend(cardElement);
}

// Запуск. Отрисовать карточки «из коробки»
initial();

///////////////////// Validator
// Установка валидатора для каждой из форм
const formEditProfileValidator = new FormValidator(formEditProfile, settings);
formEditProfileValidator.enableValidation();
const formAddElementValidator = new FormValidator(formAddElement, settings);
formAddElementValidator.enableValidation();

// Установка click кнопкам
buttonEditProfile.addEventListener("click", openPopupEditProfile);
buttonAddElement.addEventListener("click", openPopupAddElement);

// Установка submit формам
formEditProfile.addEventListener("submit", handleEditProfileForm);
formAddElement.addEventListener("submit", handleAddElementForm);