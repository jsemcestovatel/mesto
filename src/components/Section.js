export default class Section {
  constructor({ items, renderer }, settings) {
    this._renderedItems = items;
    this._renderer = renderer; // renderer коллбэк функция из инстанса
    this._container = document.querySelector(settings.cardContainerSelector);
  }

  // метод отвечает за отрисовку всех элементов
  renderItems() {
    this._renderedItems.forEach((elementData) => {
      this._renderer(elementData);
    });
  }

  //  метод принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }
}
