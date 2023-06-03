let products = [
  { id: 1, title: 'Bike', price: 1000, count: 4 },
  { id: 2, title: 'Boat', price: 1000000, count: 2 },
  { id: 3, title: 'Car', price: 25000, count: 10 },
  { id: 4, title: 'Boots', price: 150, count: 1 },
];

const addItemStorage = (array) => {
  localStorage.setItem('prod', JSON.stringify(array));
};

const readLocalStorage = () => {
  if (JSON.parse(localStorage.getItem('prod')) === null) {
    return [];
  } else {
    let result = JSON.parse(localStorage.getItem('prod'));
    return result;
  }
};

const newProd = readLocalStorage();

function removeProduct(productId) {
  const products1 = newProd.filter((p) => p.id !== productId);
  addItemStorage(products1);
}

// ELEM_BLOCK ========== FORM ========== //
const form = document.querySelector('.form');
// Счетчик id
let countID = products[products.length - 1].id;
// Собираем данные с input'a, формируем новый объект и добавляем в массив products
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const { element } = event.target;
  const newCard = {
    id: Date.now(),
    title: element.value,
    count: 1,
  };
  const arr = readLocalStorage();
  arr.push(newCard);
  addItemStorage(arr);

  renderCards(readLocalStorage());
  event.target.reset();
});
// ELEM_BLOCK ========== RENDER ========== //
const cardsContainer = document.querySelector('.cards_container');
const renderCards = (array = readLocalStorage()) => {
  cardsContainer.innerHTML = '';
  array
    .filter((el) => el.count > 0)
    .forEach((el) => {
      // Создаем карточку
      const cardElem = document.createElement('div');
      const titleElem = document.createElement('p');
      const cardCounterContainerElem = document.createElement('div');
      const btnCountMinusELem = document.createElement('button');
      const btnCountPlusElem = document.createElement('button');
      const cardCounterElem = document.createElement('p');
      // Добавляем классы элементам карточки
      cardElem.classList.add('card');
      titleElem.classList.add('card_title');
      cardCounterContainerElem.classList.add('card_container-counter');
      btnCountMinusELem.classList.add('card_btn-minus', 'card_btn');
      btnCountPlusElem.classList.add('card_btn-plus', 'card_btn');
      cardCounterElem.classList.add('card_counter');
      // Добавляем элементы на страницу
      cardsContainer.append(cardElem);
      cardElem.append(titleElem, cardCounterContainerElem);
      cardCounterContainerElem.append(
        btnCountMinusELem,
        cardCounterElem,
        btnCountPlusElem
      );
      // Добавляем контент в элементы
      titleElem.innerText = el.title;
      btnCountMinusELem.innerText = '-';
      btnCountPlusElem.innerText = '+';
      cardCounterElem.innerText = el.count;
      // Добавляем обработчик событий на кнопки счетчика
      btnCountMinusELem.addEventListener('click', () => {
        cardCounterElem.innerText = --el.count;
        const change = +cardCounterElem.innerText;
        const arr = readLocalStorage()
          .map((elem) => {
            if (elem.id === el.id) {
              elem.count = change;
              return elem;
            } else {
              return elem;
            }
          })
          .filter((elem) => elem.count > 0);

        addItemStorage(arr);
        el.count === 0 ? cardElem.remove() : '';
      });

      btnCountPlusElem.addEventListener('click', () => {
        cardCounterElem.innerText = ++el.count;
        const change = +cardCounterElem.innerText;
        const arr = readLocalStorage().map((elem) => {
          if (elem.id === el.id) {
            elem.count = change;
            return elem;
          } else {
            return elem;
          }
        });

        addItemStorage(arr);
      });
    });
};
readLocalStorage().length === 0
  ? renderCards(products)
  : renderCards(readLocalStorage());
