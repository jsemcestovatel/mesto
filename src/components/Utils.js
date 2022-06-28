// Собраны элементы для инициализации карточек «из коробки»
export const initialCards = [
  {
    name: "Учебная литература",
    link: "https://jsemcestovatel.github.io/mesto/images/img01.jpg",
    alt: "Иллюстрация Учебная литература",
  },
  {
    name: "JavaScript",
    link: "https://jsemcestovatel.github.io/mesto/images/img02.jpg",
    alt: "Иллюстрация JavaScript",
  },
  {
    name: "Прототипы",
    link: "https://jsemcestovatel.github.io/mesto/images/img03.jpg",
    alt: "Иллюстрация Прототипы",
  },
  {
    name: "Coding",
    link: "https://jsemcestovatel.github.io/mesto/images/img04.jpg",
    alt: "Иллюстрация Coding",
  },
  {
    name: "Debugging",
    link: "https://jsemcestovatel.github.io/mesto/images/img05.jpg",
    alt: "Иллюстрация Debugging",
  },
  {
    name: "Проекты",
    link: "https://jsemcestovatel.github.io/mesto/images/img06.jpg",
    alt: "Иллюстрация Проекты",
  },
];

// константы селекторов и классов в popup-окнах
export const settings = {
  templateSelector: "#element-template",
  cardSelector: ".element",
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  errorClass: "popup__error_visible",
  cardContainerSelector: ".elements__items",
  popupShowElementImage: ".popup__image",
  popupShowElementTitle: ".popup__image-title",
};

// переменные каждого popup окна
export const popupEditProfile = document.querySelector(
  ".popup_type_editprofile"
);
export const popupAddElement = document.querySelector(".popup_type_addelement");
export const popupShowElement = document.querySelector(
  ".popup_type_showelement"
);

// поля input в модальных окнах
export const popupProfileName = popupEditProfile.querySelector(
  ".popup__input_type_name"
);
export const popupProfileDescription = popupEditProfile.querySelector(
  ".popup__input_type_description"
);
export const popupImageName = popupAddElement.querySelector(
  ".popup__input_type_imagename"
);
export const popupImageLink = popupAddElement.querySelector(
  ".popup__input_type_imagelink"
);

// элементы из секции profile
const profile = document.querySelector(".profile");
export const profileName = profile.querySelector(".profile__name");
export const profileDescription = profile.querySelector(
  ".profile__description"
);
export const buttonEditProfile = profile.querySelector(".profile__edit-button");
export const buttonAddElement = profile.querySelector(".profile__add-button");

// формы модальных окон
export const formEditProfile = document.forms.popupEditProfile;
export const formAddElement = document.forms.popupAddElement;
