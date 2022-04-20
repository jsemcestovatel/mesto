// Валидация всех форм и работа с кнопкой подтверждения

// константы селекторов и классов в popup-окнах
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  errorClass: 'popup__error_visible',
};

// валидация полей в формах
const enableValidation = ( {formSelector, ...rest} ) => {
  // получить массив из всех форм
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {evt.preventDefault();});
    setEventListeners(formElement, rest);
  });
};

// установка слушителей элементам в форме
const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest}) => {
  // получить массив из всех полей input
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // получить кнопку submit
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // первоначальная установка кнопки в disabled-состояние
  toggleButtonState(inputList, buttonElement, rest);
  // проход по каждому полю input для установки слушателя и проверки значения поля и блокировка/разблокировка кнопки submit
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

// проверка полей на валидность
const checkInputValidity = (formElement, inputElement, { inputErrorClass, errorClass, ...rest } ) => {
  if (inputElement.checkValidity()) {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  }
};

// скрыть описание ошибки
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// показать описание ошибки
const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

// установка состояния кнопки submit
const toggleButtonState = (inputList, buttonElement, rest) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, rest);
  } else {
    enableButton(buttonElement, rest);
  }
};

// поиск ошибки в полях методом some
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.checkValidity();
  });
};

// выключить кнопку
const disableButton = (buttonElement, { inactiveButtonClass }) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

// включить кнопку
const enableButton = (buttonElement, { inactiveButtonClass }) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled',true);
}

// сбросить ошибки и стили полей формы
const resetErrors = (formElement, { inputSelector, inputErrorClass, errorClass}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  });  
};

// Запуск. Инициализация валидации
enableValidation(settings);
