// переменные каждого popup окна
const allPopups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_editprofile');
const popupAddElement = document.querySelector('.popup_type_addelement');
const popupShowElement = document.querySelector('.popup_type_showelement');

// формы модальных окон
const submitProfileForm = popupEditProfile.querySelector('.popup__form');
const submitAddForm = popupAddElement.querySelector('.popup__form');

// поля input в модальных окнах
const popupProfileName = popupEditProfile.querySelector('.popup__input_type_name');
const popupProfileDescription = popupEditProfile.querySelector('.popup__input_type_description');
const popupImageName = popupAddElement.querySelector('.popup__input_type_imagename');
const popupImageLink = popupAddElement.querySelector('.popup__input_type_imagelink');

// элементы из секции profile
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

// элементы из окна popupShowElement
const elementImage = popupShowElement.querySelector('.popup__image');
const elementTitle = popupShowElement.querySelector('.popup__image-title');

// tamplate-конструкция карточки
const elementsItems = document.querySelector('.elements__items');
const elementTemplate = document.querySelector('#element-template');

// константа-объект ввода данных из окна popupAddElement
const newElement = [{}];

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

// Установка всем модальным окнам к элементу "крестик" функции закрытия окна
allPopups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
       if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)();
        }
    })
})

// Открыть любой popup
const openPopup = (popup) => () => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}

// Закрыть любой popup
const closePopup = (popup) => () => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp);
}

// Закрыть любой popup по клавише Esc
function onDocumentKeyUp(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup)();
  }
}

// Реакция Открыть
const openElement = (elementItem) => () => {
  elementImage.src = elementItem.querySelector('.element__photo').src;
  elementImage.alt = 'Иллюстрация ' + elementItem.querySelector('.element__name').textContent;
  elementTitle.textContent = elementItem.querySelector('.element__name').textContent;
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
function editProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
  popupProfileName.focus();
  openPopup(popupEditProfile)();
}

// Добавить элемент карточки
function addElement() {
  submitAddForm.reset();
  popupImageName.focus();
  openPopup(popupAddElement)();
}

// Сохранение данных из popup add element
function handleAddFormSubmit(evt) {
    evt.preventDefault();
    newElement[0].name = popupImageName.value;
    newElement[0].link = popupImageLink.value;
    newElement[0].alt = 'Иллюстрация ' + popupImageName.value;
    drawElement(newElement, elementsItems);
    closePopup(popupAddElement)();
}

// Сохранение данных из popup profile
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  closePopup(popupEditProfile)();
}

// Запуск Отрисовать карточки «из коробки»
initial();

editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addElement);

submitProfileForm.addEventListener('submit', handleProfileFormSubmit);
submitAddForm.addEventListener('submit', handleAddFormSubmit);
