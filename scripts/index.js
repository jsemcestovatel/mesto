let profile = document.querySelector('.profile')
let editButton = profile.querySelector('.profile__edit-button');
let nameProfile = profile.querySelector('.profile__name');
let descriptionProfile = profile.querySelector('.profile__description');

let popup = document.querySelector('.popup')
let namePopup = popup.querySelector('.popup__input_type_name');
let descriptionPopup = popup.querySelector('.popup__input_type_description');
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
    namePopup.value = nameProfile.innerText;
    descriptionPopup.value = descriptionProfile.innerText;
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
    editButton.addEventListener('click', editProfile);
    popup.classList.remove('popup_opened');
}

// Сохранение данных из popup
function formSubmitHandler(evt) {
    // Эта строчка отменяет стандартную отправку формы.
    evt.preventDefault();
    nameProfile.innerText = namePopup.value;
    descriptionProfile.innerText = descriptionPopup.value;
    closePopup();
}