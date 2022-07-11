export default class Section {
  constructor(renderer, settings) {
    this._renderer = renderer; // renderer коллбэк функция из инстанса
    this._container = document.querySelector(settings.cardContainerSelector);
  }

  // метод отвечает за отрисовку всех элементов
  renderItems(data) {
    data.forEach((item) => {this._renderer(item)});
  };

  //  метод принимает DOM-элемент и добавляет его в контейнер.
  addItem(item) {
    this._container.prepend(item);
  };
}
