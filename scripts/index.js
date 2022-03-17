let profile = document.querySelector('.profile')
let editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');

let popup = document.querySelector('.popup')
let popupName = popup.querySelector('.popup__input_type_name');
let popupDescription = popup.querySelector('.popup__input_type_description');
let closeButton = popup.querySelector('.popup__close-button');
let submitButton = popup.querySelector('.popup__container');

editButton.addEventListener('click', editProfile);

// Открытие popup
function editProfile() {
    editButton.removeEventListener('click', editProfile);
    closeButton.addEventListener('click', closePopup);
    submitButton.addEventListener('submit', formSubmitHandler);
    document.addEventListener('keyup', onDocumentKeyUp);
    // Закрытие по затемнённой области
    // popup.addEventListener('click',closePopup);
    popupName.value = profileName.innerText;
    popupDescription.value = profileDescription.innerText;
    popup.classList.add('popup_opened');
}

// Клавиша Esc для закрытия popup
function onDocumentKeyUp(event) {
    if (event.key === 'Escape') {
        document.removeEventListener('keyup', onDocumentKeyUp);
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
    profileName.innerText = popupName.value;
    profileDescription.innerText = popupDescription.value;
    closePopup();
}
