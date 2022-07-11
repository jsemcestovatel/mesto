import "../pages/index.css";

import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import FormValidator from "../components/FormValidator.js";
import {
  settings,
  spinner,
  profileName,
  profileDescription,
  profileAvatar,
  buttonUpdateAvatar,
  buttonEditProfile,
  buttonAddElement,
  popupUpdateAvatar,
  popupEditProfile,
  popupConfirmation,
  popupAddElement,
  popupShowElement,
  popupProfileName,
  popupProfileDescription,
  popupImageName,
  formEditProfile,
  formAddElement,
  formUpdateAvatar,
  renderLoadingMessage,
} from "../utils/utils.js";

const API_CONFIG = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-44",
  headers: {
    authorization: "6d5a0daf-b4f3-4dd4-ba2b-ffc867278374",
    "Content-Type": "application/json",
  },
};
// Идентификатор текущего пользователя
let myID = null;

// Инстанс класса api
const api = new Api(API_CONFIG);

// Инстанс класса секции изображений
const cardsList = new Section((cards) => {
  cardsList.addItem(createNewCard(cards));
}, settings);

// Вспомогательная функция показа и скрытия прелоадера
function renderLoading(isLoading) {
  if (isLoading) {
    spinner.classList.add("spinner_visible");
  } else {
    spinner.classList.remove("spinner_visible");
  }
}

console.log("Начало операции. Загрузка начального состояния");
renderLoading(true);

// Инициализация первоначального состояния данных пользователя и загрузка карточек
Promise.all([api.getUserInfoApi(), api.getCardsApi()])
  .then(([data, cards]) => {
    myID = data._id;
    userInfo.setUserInfo(data);
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Возникла ошибка. ${err}`);
  })
  .finally(() => {
    renderLoading(false);
    console.log("Конец операции. Загрузка начального состояния");
  });

// Инстанс Попап с картинкой и установка слушателя
const popupImage = new PopupWithImage(settings, popupShowElement);
popupImage.setEventListeners();

// Инстанс Попап удалить карточку и установка слушателя
const formPopupConfirmation = new PopupWithConfirmation(popupConfirmation);
formPopupConfirmation.setEventListeners();

//////////////////// Card
// Отрисовать первоначальные карточки
function createNewCard(elementData) {
  const card = new Card(
    {
      elementData,
      myID,
      handleOpenCard: () => {
        popupImage.open(elementData);
      },
      handleDeleteCard: (item) => {
        formPopupConfirmation.open();
        formPopupConfirmation.setSubmit(() => {
          renderLoadingMessage(popupConfirmation, "Удаление...");
          api
            .deleteCardApi(item)
            .then((data) => {
              card.deleteCard();
              formPopupConfirmation.close();
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              renderLoadingMessage(popupConfirmation, "Да");
            });
        });
      },
      handleLikeCard: (item) => {
        api
          .likeCardApi(item)
          .then((data) => {
            card.updateLikes(true, data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      handleDislikeCard: (item) => {
        api
          .dislikeCardApi(item)
          .then((data) => {
            card.updateLikes(false, data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    settings
  );
  return card.createCard();
}

///////////////////// Profile
// Инстанс класса работы с данными пользователя
const userInfo = new UserInfo({
  name: profileName,
  description: profileDescription,
  avatar: profileAvatar,
});

// Обновить аватар пользователя
const openPopupUpdateAvatar = () => {
  formPopupUpdateAvatar.open();
  formValidators["popupUpdateAvatar"].resetErrors();
  formValidators["popupUpdateAvatar"].disableButton();
};

// Инстанс Попап Обновить аватар пользователя и установка слушателя
const formPopupUpdateAvatar = new PopupWithForm(
  {
    submitForm: (inputValues) => {
      renderLoadingMessage(popupUpdateAvatar, "Сохранение...");
      api
        .updateAvatarApi(inputValues)
        .then((data) => {
          userInfo.setUserInfo(data);
          formPopupUpdateAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoadingMessage(popupUpdateAvatar, "Сохранить");
        });
    },
  },
  settings,
  popupUpdateAvatar
);
formPopupUpdateAvatar.setEventListeners();

// Редактировать профиль
const openPopupEditProfile = () => {
  const userAllInfo = userInfo.getUserInfo();
  popupProfileName.value = userAllInfo.name;
  popupProfileDescription.value = userAllInfo.description;
  popupProfileName.focus();
  formPopupEditProfile.open();
  formValidators["popupEditProfile"].resetErrors();
  formValidators["popupEditProfile"].disableButton();
};

// Инстанс Попап Редактировать профиль и установка слушателя
const formPopupEditProfile = new PopupWithForm(
  {
    submitForm: (inputValues) => {
      renderLoadingMessage(popupEditProfile, "Сохранение...");
      api
        .setUserInfoApi(inputValues)
        .then((data) => {
          userInfo.setUserInfo(data);
          formPopupEditProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoadingMessage(popupEditProfile, "Сохранить");
        });
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
  formValidators["popupAddElement"].resetErrors();
  formValidators["popupAddElement"].disableButton();
};

// Инстанс Попап Добавить элемент карточки и установка слушателя
const formPopupAddElement = new PopupWithForm(
  {
    submitForm: (inputValues) => {
      // константа-объект ввода данных из окна popupAddElement
      const newElement = {};
      newElement.name = inputValues["image-name"];
      newElement.link = inputValues["image-link"];
      renderLoadingMessage(popupAddElement, "Сохранение...");
      api
        .addNewCardApi(newElement)
        .then((data) => {
          cardsList.addItem(createNewCard(data));
          formPopupAddElement.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoadingMessage(popupAddElement, "Сохранить");
        });
    },
  },
  settings,
  popupAddElement
);
formPopupAddElement.setEventListeners();

// Установка click кнопкам
buttonUpdateAvatar.addEventListener("click", openPopupUpdateAvatar);
buttonEditProfile.addEventListener("click", openPopupEditProfile);
buttonAddElement.addEventListener("click", openPopupAddElement);

///////////////////// Validator

const formValidators = {};

// Установка валидатора для каждой из форм
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, settings);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// Включение валидации
enableValidation(settings);
