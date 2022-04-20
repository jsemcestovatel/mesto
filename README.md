# Курс Яндекс.Практикум – Проектная работа №4-5-6

## Описание проекта, функциональность, используемые технологии

* Адаптивная вёрстка для брейкпоитов max 1280px, 920px 620px, min 320px
* Файловая Nest-структура
* Функционал страницы:
1) Возможность редактирования данных профиля
2) Добавление карточек и удаление карточек из потока
3) Проставления like
4) Открытия popup-окна с увеличенным изображением карточки
5) Валидация и подсветка полей на обязательные значения
* Функции:
1) Запуск отрисовки первоначальных карточек, находится в отдельном файле elements.js
```js
  initial();
```
2) Отрисовка карточки(карточек), где:
data - массив из объектов name, link, alt;
where - в какой элемент страницы методом prepend будет добавлена новая карточка(и)
```js
  drawElement(data, where);
```
* Определены свойства для переменных цвета
```css
  --color-white: #fff;
  --color-black: #000;
  --color-grey: #545454;
  --color-grey70: #545454b3;
```
* Микс-классы
Добавление анимации и hover для элементов:
```css
  .link-opacity
```

## GitHub Pages
* https://jsemcestovatel.github.io/mesto/index.html