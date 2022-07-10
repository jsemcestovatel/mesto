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

// Функция и Инстанс класса секции изображений
function createSection(data) {
  const cardsList = new Section(
    {
      items: data,
      renderer: (elementData) => {
        cardsList.addItem(createNewCard(elementData).createCard());
      },
    },
    settings
  );
  return cardsList;
}

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
    createSection(cards).renderItems();
    renderLoading(false);
  })
  .catch((err) => {
    console.log(`Возникла ошибка ${err}`);
  })
  .finally(() => console.log("Конец операции. Загрузка начального состояния"));

// Инстанс класса попапа с картинкой PopupWithImage и установка слушателя
const popupImage = new PopupWithImage(settings, popupShowElement);
popupImage.setEventListeners();

// Инстанс Попап удалить карточку и установка слушателя
const formPopupConfirmation = new PopupWithConfirmation(popupConfirmation);
formPopupConfirmation.setEventListeners();

//////////////////// Card
// Отрисовать карточки «из коробки»
// Данная функция возвращает новую карточку
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
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              renderLoadingMessage(popupConfirmation, "Да");
              formPopupConfirmation.close();
            });
        });
      },
      handleLikeCard: (item) => {
        api
          .likeCardApi(item)
          .then((data) => {
            card.heartCard(true, data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      handleDislikeCard: (item) => {
        api
          .dislikeCardApi(item)
          .then((data) => {
            card.heartCard(false, data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    settings
  );
  return card;
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
  formUpdateAvatarValidator.resetErrors();
  formUpdateAvatarValidator.disableButton();
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
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoadingMessage(popupUpdateAvatar, "Сохранить");
          formPopupUpdateAvatar.close();
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
  formEditProfileValidator.resetErrors();
  formEditProfileValidator.disableButton();
};

// Инстанс Попап Редактировать профиль и установка слушателя
const formPopupEditProfile = new PopupWithForm(
  {
    submitForm: (inputValues) => {
      renderLoadingMessage(popupEditProfile, "Сохранение...");
      api
        .setUserInfoApi(inputValues)
        .then((data) => {
          data["avatar"] = userInfo.getUserInfo().avatar;
          userInfo.setUserInfo(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoadingMessage(popupEditProfile, "Сохранить");
          formPopupEditProfile.close();
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
      renderLoadingMessage(popupAddElement, "Сохранение...");
      api
        .addNewCardApi(newElement)
        .then((data) => {
          createSection(data).addItem(createNewCard(data).createCard());
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoadingMessage(popupAddElement, "Сохранить");
          formPopupAddElement.close();
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
// Установка валидатора для каждой из форм
const formUpdateAvatarValidator = new FormValidator(formUpdateAvatar, settings);
formUpdateAvatarValidator.enableValidation();
const formEditProfileValidator = new FormValidator(formEditProfile, settings);
formEditProfileValidator.enableValidation();
const formAddElementValidator = new FormValidator(formAddElement, settings);
formAddElementValidator.enableValidation();
