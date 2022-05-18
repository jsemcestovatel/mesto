// Собраны элементы для инициализации карточек «из коробки»
export const initialCards = [
    {
      name: 'Учебная литература',
      link: 'https://jsemcestovatel.github.io/mesto/images/img01.jpg',
      alt: 'Иллюстрация Учебная литература'
    },
    {
      name: 'JavaScript',
      link: 'https://jsemcestovatel.github.io/mesto/images/img02.jpg',
      alt: 'Иллюстрация JavaScript'
    },
    {
      name: 'Прототипы',
      link: 'https://jsemcestovatel.github.io/mesto/images/img03.jpg',
      alt: 'Иллюстрация Прототипы'
    },
    {
      name: 'Coding',
      link: 'https://jsemcestovatel.github.io/mesto/images/img04.jpg',
      alt: 'Иллюстрация Coding'
    },
    {
      name: 'Debugging',
      link: 'https://jsemcestovatel.github.io/mesto/images/img05.jpg',
      alt: 'Иллюстрация Debugging'
    },
    {
      name: 'Проекты',
      link: 'https://jsemcestovatel.github.io/mesto/images/img06.jpg',
      alt: 'Иллюстрация Проекты'
    }
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
};

// элементы из окна popupShowElement
export const popupShowElement = document.querySelector(
  ".popup_type_showelement"
);
export const elementImage = popupShowElement.querySelector(".popup__image");
export const elementTitle = popupShowElement.querySelector(
  ".popup__image-title"
);

///////////////////// PopUp
// Открыть любой popup
export const openPopup = (popup) => () => {
    popup.classList.add("popup_opened");
    popup.addEventListener("click", onDocumentClickUp);
    document.addEventListener("keyup", onDocumentKeyUp);
  };
  
  // Закрыть любой popup
export const closePopup = (popup) => () => {
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