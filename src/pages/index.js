import "../pages/index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  settings,
  profileName,
  profileDescription,
  buttonEditProfile,
  buttonAddElement,
  popupEditProfile,
  popupProfileName,
  popupProfileDescription,
  popupImageName,
  popupAddElement,
  popupShowElement,
  formEditProfile,
  formAddElement,
} from "../components/Utils.js";

//////////////////// Card
// Отрисовать карточки «из коробки»
const defaultCards = new Section(
  {
    items: initialCards,
    renderer: (elementData) => {
      const newCard = new Card(
        {
          elementData,
          handleCardClick: () => {
            const openPopupImage = new PopupWithImage(
              elementData,
              settings,
              popupShowElement
            );
            openPopupImage.open();
            openPopupImage.setEventListeners();
          },
        },
        settings
      );
      const cardElement = newCard.createCard();
      defaultCards.addItem(cardElement);
    },
  },
  settings
);
defaultCards.renderItems();

///////////////////// Profile
// Инстанс класса работы с данными пользователя
const userInfo = new UserInfo({
  name: profileName,
  description: profileDescription,
});

// Редактировать профиль
const openPopupEditProfile = () => {
  const userAllInfo = userInfo.getUserInfo();
  popupProfileName.value = userAllInfo.name;
  popupProfileDescription.value = userAllInfo.description;
  popupProfileName.focus();
  formPopupEditProfile.open();
  formPopupEditProfile.setEventListeners();
  formEditProfileValidator.resetErrors();
  formEditProfileValidator.disableButton();
};

// Инстанс Попап Редактировать профиль
const formPopupEditProfile = new PopupWithForm(
  {
    submitForm: (inputValues) => {
      userInfo.setUserInfo(inputValues);
      formPopupEditProfile.close();
    },
  },
  settings,
  popupEditProfile
);

// Добавить элемент карточки
const openPopupAddElement = () => {
  formAddElement.reset();
  popupImageName.focus();
  formPopupAddElement.open();
  formPopupAddElement.setEventListeners();
  formAddElementValidator.resetErrors();
  formAddElementValidator.disableButton();
};

// Инстанс Попап Добавить элемент карточки
const formPopupAddElement = new PopupWithForm(
  {
    submitForm: (inputValues) => {
      // константа-объект ввода данных из окна popupAddElement
      const newElement = [{}];
      newElement[0].name = inputValues["image-name"];
      newElement[0].link = inputValues["image-link"];
      newElement[0].alt = "Иллюстрация " + inputValues["image-name"];
      formPopupAddElement.close();
      const addCard = new Section(
        {
          items: newElement,
          renderer: (elementData) => {
            const addNewCard = new Card(
              {
                elementData,
                handleCardClick: () => {
                  const openPopupImage = new PopupWithImage(
                    elementData,
                    settings,
                    popupShowElement
                  );
                  openPopupImage.open();
                  openPopupImage.setEventListeners();
                },
              },
              settings
            );
            const newCardElement = addNewCard.createCard();
            addCard.addItem(newCardElement);
          },
        },
        settings
      );
      addCard.renderItems();
    },
  },
  settings,
  popupAddElement
);

// Установка click кнопкам
buttonEditProfile.addEventListener("click", openPopupEditProfile);
buttonAddElement.addEventListener("click", openPopupAddElement);

///////////////////// Validator
// Установка валидатора для каждой из форм
const formEditProfileValidator = new FormValidator(formEditProfile, settings);
formEditProfileValidator.enableValidation();
const formAddElementValidator = new FormValidator(formAddElement, settings);
formAddElementValidator.enableValidation();
