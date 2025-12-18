export class Book {
  constructor(title, author, year) {
    this._title = this.#validatteTitle(title);
    this._author = this.#validateAuthor(author);
    this._year = this.#validateYear(year);
  }

  printInfo() {
    console.log(
      `Книга "${this._title}", автор ${this._author}, рік видавництва ${this._year}. Друкований формат.`
    );
  }

  get title() {
    return this._title;
  }

  get author() {
    return this._author;
  }

  get year() {
    return this._year;
  }

  set title(newTitle) {
    this._title = this.#validatteTitle(newTitle);
  }

  set author(newAuthor) {
    this._author = this.#validateAuthor(newAuthor);
  }

  set year(newYear) {
    this._year = this.#validateYear(newYear);
  }

  #validatteTitle(title) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Назва книги повинна бути непорожнім рядком');
    }
    return title;
  }

  #validateAuthor(author) {
    if (!author || typeof author !== 'string' || author.trim() === '') {
      throw new Error("Ім'я автора повинно бути непорожнім рядком");
    }
    return author;
  }

  #validateYear(year) {
    const currentYear = new Date().getFullYear();
    if (typeof year !== 'number' || year < 0 || year > currentYear) {
      throw new Error(
        `Рік видавництва повинен бути числом від 0 до ${currentYear}`
      );
    }
    return year;
  }

  static getOldestBook(books) {
    if (!Array.isArray(books) || books.length === 0) {
      throw new Error('Потрібен непорожній масив книг');
    }
    let oldestBook = books[0];
    for (const book of books) {
      if (!(book instanceof Book)) {
        throw new Error('Всі елементи масиву повинні бути книгами');
      }
      if (book.year < oldestBook.year) {
        oldestBook = book;
      }
    }
    return oldestBook;
  }
}
