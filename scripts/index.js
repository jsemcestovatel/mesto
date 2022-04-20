// переменные каждого popup окна
const allPopups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_editprofile');
const popupAddElement = document.querySelector('.popup_type_addelement');
const popupShowElement = document.querySelector('.popup_type_showelement');

// формы модальных окон
const formEditProfile = document.forms.popupEditProfile;
const formAddElement = document.forms.popupAddElement;

// поля input в модальных окнах
const popupProfileName = popupEditProfile.querySelector(
  '.popup__input_type_name'
);
const popupProfileDescription = popupEditProfile.querySelector(
  '.popup__input_type_description'
);
const popupImageName = popupAddElement.querySelector(
  '.popup__input_type_imagename'
);
const popupImageLink = popupAddElement.querySelector(
  '.popup__input_type_imagelink'
);

// элементы из секции profile
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const buttonEditProfile = profile.querySelector('.profile__edit-button');
const buttonAddElement = profile.querySelector('.profile__add-button');

// элементы из окна popupShowElement
const elementImage = popupShowElement.querySelector('.popup__image');
const elementTitle = popupShowElement.querySelector('.popup__image-title');

// tamplate-конструкция карточки
const elementsItems = document.querySelector('.elements__items');
const elementTemplate = document.querySelector('#element-template');

// Создать разметку карточку и навесить события
const createElement = (elementCard) => {
  const elementItem = elementTemplate.content
    .querySelector('.element')
    .cloneNode(true);
  elementItem.querySelector('.element__photo').src = elementCard.link;
  elementItem.querySelector('.element__photo').alt = elementCard.alt;
  elementItem.querySelector('.element__name').textContent = elementCard.name;
  elementItem
    .querySelector('.element__photo')
    .addEventListener('click', openElement(elementItem));
  elementItem
    .querySelector('.element__like')
    .addEventListener('click', likeElement);
  elementItem
    .querySelector('.element__delete')
    .addEventListener('click', deleteElement(elementItem));
  return elementItem;
};

// Отрисовать карточку, data = array из объектов
const createCard = (elementCard) => {
  const newElement = createElement(elementCard);
  elementsItems.prepend(newElement);

};

// Открыть любой popup
const openPopup = (popup) => () => {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', onDocumentClickUp);
  document.addEventListener('keyup', onDocumentKeyUp);
};

// Закрыть любой popup
const closePopup = (popup) => () => {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', onDocumentClickUp);
  document.removeEventListener('keyup', onDocumentKeyUp);
};

// Закрыть любой popup по клавише Esc
const onDocumentKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup)();
  }
};

// Срабатываение закрытия модального окна по крестику или по внешней области
const onDocumentClickUp = (evt) => {
  const target = evt.target.classList;
  if (target.contains('popup') || target.contains('popup__close-button')) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup)();
  }
};

// Реакция Открыть
const openElement = (elementItem) => () => {
  elementImage.src = elementItem.querySelector('.element__photo').src;
  elementImage.alt =
    'Иллюстрация ' + elementItem.querySelector('.element__name').textContent;
  elementTitle.textContent =
    elementItem.querySelector('.element__name').textContent;
  openPopup(popupShowElement)();
};

// Реакция Нравится
const likeElement = (evt) => {
  evt.target.classList.toggle('element__like_active');
};

// Реакция Удалить
const deleteElement = (elementItem) => () => {
  elementItem.remove();
};

// Редактировать профиль
const editProfile = () => {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
  popupProfileName.focus();
  resetErrors(formEditProfile, settings);
  openPopup(popupEditProfile)();
};

// Добавить элемент карточки
const addElement = () => {
  formAddElement.reset();
  popupImageName.focus();
  resetErrors(formAddElement, settings);
  openPopup(popupAddElement)();
};

// Сохранение данных из popup add element
const handleAddElementForm = () => {
  // константа-объект ввода данных из окна popupAddElement
  const newElement = {};
  const buttonElement = popupAddElement.querySelector(
    settings.submitButtonSelector
  );
  newElement.name = popupImageName.value;
  newElement.link = popupImageLink.value;
  newElement.alt = 'Иллюстрация ' + popupImageName.value;
  createCard(newElement);
  closePopup(popupAddElement)();
  disableButton(buttonElement, settings);
};

// Сохранение данных из popup profile
const handleEditProfileForm = () => {
  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  closePopup(popupEditProfile)();
};

// Запуск. Отрисовать карточки «из коробки»
initial();

// Установка click кнопкам
buttonEditProfile.addEventListener('click', editProfile);
buttonAddElement.addEventListener('click', addElement);

// Установка submit формам
formEditProfile.addEventListener('submit', handleEditProfileForm);
formAddElement.addEventListener('submit', handleAddElementForm);
