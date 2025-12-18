// Імплементуйте клас TicketManager, який управляє бронюванням квитків на події.
// Конструктор класу приймає кількість квитків які доступні спочатку і зберігає значення у приватну властивість #ticketsNumber.
// Реалізуйте метод isTicketsAvailable який приймає кількість квитків як параметр.
// Цей метод повинен повертати Promise. Якщо кількість квитків в наявності більше або дорівнює кількості що запитується -
// метод має повертати зарезолвений проміс зі заченням true. Інакше метод має повертати зарезолвений проміс зі заченням false.

class TicketManager {
  #ticketsNumber;

  constructor(ticketsNumber) {
    this.#ticketsNumber = ticketsNumber;
  }

  isTicketsAvailable(ticketsNumber) {
    return new Promise((resolve) => {
      if (this.#ticketsNumber >= ticketsNumber) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
}
// Демонстрація
const ticketManager = new TicketManager(100);

ticketManager
  .isTicketsAvailable(50)
  .then((result) => console.log(`Are 50 tickets available? ${result}`)) // true
  .catch((error) => console.error('Error:', error));

ticketManager
  .isTicketsAvailable(150)
  .then((result) => console.log(`Are 150 tickets available? ${result}`)) // false
  .catch((error) => console.error('Error:', error));
