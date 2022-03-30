// Собраны элементы для инициализации карточек «из коробки»
const initialCards = [
    {
      name: 'Учебная литература',
      link: 'https://jsemcestovatel.github.io/mesto/images/img01.jpg',
      alt: 'Иллюстрация'
    },
    {
      name: 'JavaScript',
      link: 'https://jsemcestovatel.github.io/mesto/images/img02.jpg',
      alt: 'Иллюстрация'
    },
    {
      name: 'Прототипы',
      link: 'https://jsemcestovatel.github.io/mesto/images/img03.jpg',
      alt: 'Иллюстрация'
    },
    {
      name: 'Coding',
      link: 'https://jsemcestovatel.github.io/mesto/images/img04.jpg',
      alt: 'Иллюстрация'
    },
    {
      name: 'Debugging',
      link: 'https://jsemcestovatel.github.io/mesto/images/img05.jpg',
      alt: 'Иллюстрация'
    },
    {
      name: 'Проекты',
      link: 'https://jsemcestovatel.github.io/mesto/images/img06.jpg',
      alt: 'Иллюстрация'
    }
  ];

  const newCard = [
    {
      name: 'Пример',
      link: 'https://images.unsplash.com/photo-1648623249808-4bbab7f5aac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      alt: 'Иллюстрация'
    },
  ]
  
  const inicial = () => drawElement(initialCards, elementsItems);