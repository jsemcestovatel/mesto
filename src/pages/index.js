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
} from "../utils/utils.js";


// Инстанс класса попапа с картинкой PopupWithImage и установка слушателя
const popupImage = new PopupWithImage(
  settings,
  popupShowElement
  );
popupImage.setEventListeners();
  
//////////////////// Card
// Отрисовать карточки «из коробки»
// Данная функция возвращает новую карточку
function createNewCard(elementData) {
  const newCard = new Card(
    {
      elementData,
      handleCardClick: () => {
        popupImage.open(elementData);
      },
    },
    settings
    );
    return newCard;
  };
  
// Инстанс класса секции изображений
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (elementData) => {
      cardsList.addItem(createNewCard(elementData).createCard());
    },
  },
  settings
);
cardsList.renderItems();

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
  formEditProfileValidator.resetErrors();
  formEditProfileValidator.disableButton();
};

// Инстанс Попап Редактировать профиль и установка слушателя
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
formPopupEditProfile.setEventListeners();

// Добавить элемент карточки
const openPopupAddElement = () => {
  formAddElement.reset();
  popupImageName.focus();
  formPopupAddElement.open();
  formAddElementValidator.resetErrors();
  formAddElementValidator.disableButton();
};

// Инстанс Попап Добавить элемент карточки и установка слушателя
const formPopupAddElement = new PopupWithForm(
  {
    submitForm: (inputValues) => {
      // константа-объект ввода данных из окна popupAddElement
      const newElement = {};
      newElement.name = inputValues["image-name"];
      newElement.link = inputValues["image-link"];
      newElement.alt = "Иллюстрация " + inputValues["image-name"];
      formPopupAddElement.close();
      cardsList.addItem(createNewCard(newElement).createCard());
    },
  },
  settings,
  popupAddElement
);
formPopupAddElement.setEventListeners();

// Установка click кнопкам
buttonEditProfile.addEventListener("click", openPopupEditProfile);
buttonAddElement.addEventListener("click", openPopupAddElement);

///////////////////// Validator
// Установка валидатора для каждой из форм
const formEditProfileValidator = new FormValidator(formEditProfile, settings);
formEditProfileValidator.enableValidation();
const formAddElementValidator = new FormValidator(formAddElement, settings);
formAddElementValidator.enableValidation();
