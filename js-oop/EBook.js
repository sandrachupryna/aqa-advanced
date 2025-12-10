import { Book } from './Book.js';

export class EBook extends Book {
    static formatTypes = new Set(['PDF', 'EPUB', 'FB2', 'MOBI', 'AZW']);

    constructor(title, author, year, fileFormat) {
        super(title, author, year);
        this._fileFormat = fileFormat;
    }

    printInfo() {
        console.log(`Книга "${this._title}", автор ${this._author}, рік видавництва ${this._year}. Електронний формат: ${this._fileFormat}.`);
    }

    get fileFormat() {
        return this._fileFormat;
    }

    set fileFormat(newFormat) {
        if (!EBook.formatTypes.has(newFormat)) {
            throw new Error(`Непідтримуваний формат файлу. Підтримувані формати: ${Array.from(EBook.formatTypes).join(', ')}`);
        } else {
            this._fileFormat = newFormat;
        }
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
            throw new Error("Можна конвертувати лише книгу");
        }
        // return new EBook(book.title, book.author, book.year, fileFormat); // - можна було б написати так, але fileFormat не буде валідуватись
        // як краще зробити: створити тимчасовий об'єкт і потім задати формат через сетер (як у коді нижче)
        // чи дублювати код для валідації тут або в самому конструкторі?
        const ebook = new EBook(book._title, book._author, book._year, "temp");
        ebook.fileFormat = fileFormat; // тут вже буде валідація з сеттера
        return ebook;
    }
}
