import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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

// константы селекторов и классов в popup-окнах
const settings = {
  templateSelector: "#element-template",
  cardSelector: ".element",
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  errorClass: "popup__error_visible",
};

///////////////////// PopUp
// Открыть любой popup
const openPopup = (popup) => () => {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", onDocumentClickUp);
  document.addEventListener("keyup", onDocumentKeyUp);
};

// Закрыть любой popup
const closePopup = (popup) => () => {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", onDocumentClickUp);
  document.removeEventListener("keyup", onDocumentKeyUp);
};

// Закрыть любой popup по клавише Esc
const onDocumentKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup)();
  }
};

// Срабатываение закрытия модального окна по крестику или по внешней области
const onDocumentClickUp = (evt) => {
  const target = evt.target.classList;
  if (target.contains("popup") || target.contains("popup__close-button")) {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup)();
  }
};

// Редактировать профиль
const editProfile = () => {
  const buttonElement = popupEditProfile.querySelector(
    settings.submitButtonSelector
  );
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
  popupProfileName.focus();
  formEditProfileValidator.resetErrors();
  formEditProfileValidator.disableButton(buttonElement);
  openPopup(popupEditProfile)();
};

// Добавить элемент карточки
const addElement = () => {
  const buttonElement = popupAddElement.querySelector(
    settings.submitButtonSelector
  );
  formAddElement.reset();
  popupImageName.focus();
  formAddElementValidator.resetErrors();
  formAddElementValidator.disableButton(buttonElement);
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
  newCard.createCard();
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
    newCard.createCard();
  });
};
// Запуск. Отрисовать карточки «из коробки»
initial();

///////////////////// Validator
// Установка валидатора для каждой из форм
const formEditProfileValidator = new FormValidator(formEditProfile, settings);
formEditProfileValidator.enableValidation();
const formAddElementValidator = new FormValidator(formAddElement, settings);
formAddElementValidator.enableValidation();

// Установка click кнопкам
buttonEditProfile.addEventListener("click", editProfile);
buttonAddElement.addEventListener("click", addElement);

// Установка submit формам
formEditProfile.addEventListener("submit", handleEditProfileForm);
formAddElement.addEventListener("submit", handleAddElementForm);

export { openPopup };
