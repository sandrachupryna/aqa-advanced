import { Book } from './Book.js';

export class EBook extends Book {
  static formatTypes = new Set(['PDF', 'EPUB', 'FB2', 'MOBI', 'AZW']);

  constructor(title, author, year, fileFormat) {
    super(title, author, year);
    this._fileFormat = this.#validateFileFormat(fileFormat);
  }

  printInfo() {
    console.log(
      `Книга "${this._title}", автор ${this._author}, рік видавництва ${this._year}. Електронний формат: ${this._fileFormat}.`
    );
  }

  get fileFormat() {
    return this._fileFormat;
  }

  set fileFormat(newFormat) {
    this._fileFormat = this.#validateFileFormat(newFormat);
  }

  #validateFileFormat(format) {
    if (!EBook.formatTypes.has(format)) {
      throw new Error(
        `Непідтримуваний формат файлу. Підтримувані формати: ${Array.from(EBook.formatTypes).join(', ')}`
      );
    }
    return format;
  }

  // поза завданням
  get availableFormats() {
    return Array.from(EBook.formatTypes).join(', ');
  }

  // поза завданням
  static addFormat(newFormat) {
    EBook.formatTypes.add(newFormat);
  }

  static convertToEBook(book, fileFormat) {
    if (!(book instanceof Book)) {
      throw new Error('Можна конвертувати лише книгу');
    }
    return new EBook(book.title, book.author, book.year, fileFormat);
  }
}
