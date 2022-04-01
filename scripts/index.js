// переменные каждого popup окна
const popupEditProfile = document.querySelector('.popup_type_editprofile');
const popupAddElement = document.querySelector('.popup_type_addelement');
const popupShowElement = document.querySelector('.popup_type_showelement');

// поля input в окнах
const popupProfileName = popupEditProfile.querySelector('.popup__input_type_name');
const popupProfileDescription = popupEditProfile.querySelector('.popup__input_type_description');
const popupImageName = popupAddElement.querySelector('.popup__input_type_imagename');
const popupImageLink = popupAddElement.querySelector('.popup__input_type_imagelink');

// элементы из блока profile
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

// tamplate-конструкция карточки
const elementsItems = document.querySelector('.elements__items');
const elementTemplate = document.querySelector('#element-template');

// Создать разметку карточку и навесить события
function createElement(data) {
  const elementItem = elementTemplate.content
    .querySelector('.element')
    .cloneNode(true);
  elementItem.querySelector('.element__photo').src = data.link;
  elementItem.querySelector('.element__photo').alt = data.alt;
  elementItem.querySelector('.element__name').textContent = data.name;
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
}

// Отрисовать карточку, data = array из объектов
function drawElement(data, where) {
  const elements = data.map((item) => createElement(item));
  where.prepend(...elements);
}

// Открыть любой popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.querySelector('.popup__close-button').addEventListener('click', closePopup(popup));
  document.addEventListener('keyup', onDocumentKeyUp);
  editButton.removeEventListener('click', editProfile);
  addButton.removeEventListener('click', addElement);
}

// Закрыть любой popup
const closePopup = (popup) => () => {
    popup.classList.remove('popup_opened');
    popup.querySelector('.popup__close-button').removeEventListener('click', closePopup(popup));
    document.removeEventListener('keyup', onDocumentKeyUp);
    editButton.addEventListener('click', editProfile);
    addButton.addEventListener('click', addElement);
}

// Клавиша Esc для закрытия popup
function onDocumentKeyUp(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup)();
  }
}

// Реакция Фото
const openElement = (elementItem) => () => {
  popupShowElement.querySelector('.popup__image-title').textContent = elementItem.querySelector('.element__name').textContent;
  popupShowElement.querySelector('.popup__image').src = elementItem.querySelector('.element__photo').src;
  openPopup(popupShowElement);
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
function editProfile() {
  const submitForm = popupEditProfile.querySelector('.popup__form');
  submitForm.addEventListener('submit', formSubmitProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
  popupProfileName.focus();
  openPopup(popupEditProfile);
}

// Добавить элемент карточки
function addElement() {
  const submitForm = popupAddElement.querySelector('.popup__form');
  submitForm.addEventListener('submit', formSubmitAdd);
  popupImageName.value = '';
  popupImageLink.value = '';
  popupImageName.focus();
  openPopup(popupAddElement);
}

// Сохранение данных из popup add element
function formSubmitAdd(evt) {
    evt.preventDefault();
    const newElement = [
        {
          name: '',
          link: '',
          alt: 'Иллюстрация'
        },
      ];
    newElement[0].name = popupImageName.value;
    newElement[0].link = popupImageLink.value;
    drawElement(newElement, elementsItems);
    closePopup(popupAddElement)();
}

// Сохранение данных из popup profile
function formSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  closePopup(popupEditProfile)();
}

// Запуск Отрисовать карточки «из коробки»
inicial();

editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addElement);