import { Book } from './Book.js';
import { EBook } from './EBook.js';

const book1 = new Book('1984', 'Джордж Орвелл', 1949);
const book2 = new Book('Тореодори з Васюківки', 'Всеволод Нестайко', 1972);
const book3 = new Book('Місто', 'Валерʼян Підмогильний', 1928);

const ebook1 = new EBook('Портрет Доріана Грея', 'Оскар Уайльд', 1890, 'PDF');
const ebook2 = new EBook(
  'Тореодори з Васюківки',
  'Всеволод Нестайко',
  1972,
  'EPUB'
);

/// Перевірка сеттерів з валідацією
book1.title = 'Nineteen Eighty-Four'; // успішно
// book1.title = ""; // помилка
// book1.title = "  "; // помилка
// book1.title = 1994; // помилка

book2.author = 'Vsevolod Nestayko'; // успішно
// book2.author = ""; // помилка
// book2.author = "   "; // помилка
// book2.author = null; // помилка

book3.year = 0; // успішно
book3.year = 1928; // успішно
// book3.year = -50; // помилка
// book3.year = 2026; // помилка
// book3.year = "Two Thousand"; // помилка

ebook1.fileFormat = 'MOBI'; // успішно
// ebook1.fileFormat = "DOCX"; // помилка

/// Перевірка геттерів
console.log(
  `Книга 1: ${book1.title}, Автор: ${book1.author}, Рік: ${book1.year}`
);
console.log(
  `Електронна книга 2: ${ebook2.title}, Автор: ${ebook2.author}, Рік: ${ebook2.year}, Формат: ${ebook2.fileFormat}`
);
// Виклик для статичної змінної та метода через клас
console.log(
  `Доступні формати електронних книг: ${Array.from(EBook.formatTypes).join(', ')}`
);
EBook.addFormat('DJVU'); // поза завданням
// Виклик для геттера екземпляра - статична змінна спільна для всіх екземплярів
console.log(`Доступні формати електронних книг: ${ebook1.availableFormats}`);
// Виклик методу printInfo для всіх книг
book1.printInfo();
book2.printInfo();
book3.printInfo();
ebook1.printInfo();
ebook2.printInfo();

const booksArray = [book1, book2, book3, ebook1, ebook2];
const oldestBook = Book.getOldestBook(booksArray);
console.log(
  `Найстаріша книга: "${oldestBook.title}", автор ${oldestBook.author}, рік видавництва ${oldestBook.year}.`
);
// Book.getOldestBook(345); // помилка
// Book.getOldestBook([]); // помилка
// Book.getOldestBook([book1, { title: "book", author: "author", year: 1900}, ebook2]); // помилка

const convertedEBook1 = EBook.convertToEBook(book3, 'FB2');
convertedEBook1.printInfo();
// EBook.convertToEBook({ title: "book", author: "author", year: 1900}, "PDF"); // помилка
// const convertedEBook2 = EBook.convertToEBook(book3, "TXT"); // помилка, оскільки у конструкторі EBook відбувається валідація формату файлу
