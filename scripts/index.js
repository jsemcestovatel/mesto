const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const popup = document.querySelector('.popup');
const popupName = popup.querySelector('.popup__input_type_name');
const popupDescription = popup.querySelector('.popup__input_type_description');
const closeButton = popup.querySelector('.popup__close-button');
const submitButton = popup.querySelector('.popup__container');

// новый код
const elementsItems = document.querySelector('.elements__items');
const elementTemplate = document.querySelector('#element-template');

// Создать разметку карточку и навесить события
function createElement(data) {
  const elementItem = elementTemplate.content.querySelector('.element').cloneNode(true);
  elementItem.querySelector('.element__photo').src = data.link;
  elementItem.querySelector('.element__photo').alt = data.alt;
  elementItem.querySelector('.element__name').textContent = data.name;
  elementItem.querySelector('.element__photo').addEventListener('click', openElement(elementItem));
  elementItem.querySelector('.element__like').addEventListener('click', likeElement);
  elementItem.querySelector('.element__delete').addEventListener('click', deleteElement(elementItem));  
  return elementItem;
}
// Открыть popup с фото
const openElement = (elementItem) => () => {
    console.log(elementItem.querySelector('.element__name').textContent)
};

// Реакция Нравится
const likeElement = (evt) => {
    evt.target.classList.toggle('element__like_active')
};

// Реакция Удалить
const deleteElement = (elementItem) => () => {
    elementItem.remove()
};
// то-же самое, воспроизвести вновь трудно
// function deleteElement(elementItem) {
//     return function () {
//         elementItem.remove()
//     }
// }
  
// Отрисовать карточку
function drawElement(data, where) {
  const elements = data.map((item) => createElement(item));
  where.prepend(...elements);
}

// Запуск Отрисовать карточки «из коробки»
inicial();

// drawElement(newCard, elementsItems);

// прежний код
editButton.addEventListener('click', editProfile);

// Открытие popup
function editProfile() {
  editButton.removeEventListener('click', editProfile);
  closeButton.addEventListener('click', closePopup);
  submitButton.addEventListener('submit', formSubmitHandler);
  document.addEventListener('keyup', onDocumentKeyUp);
  // Закрытие по затемнённой области
  // popup.addEventListener('click',closePopup)
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
  popupName.focus();
}

// Клавиша Esc для закрытия popup
function onDocumentKeyUp(event) {
  if (event.key === 'Escape') {
    closePopup();
  }
}

// Закрытие popup
function closePopup() {
  closeButton.removeEventListener('click', closePopup);
  submitButton.removeEventListener('submit', formSubmitHandler);
  document.removeEventListener('keyup', onDocumentKeyUp);
  editButton.addEventListener('click', editProfile);
  popup.classList.remove('popup_opened');
}

// Сохранение данных из popup
function formSubmitHandler(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup();
}
