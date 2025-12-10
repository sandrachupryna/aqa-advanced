export class Book {
    constructor(title, author, year) {
        this._title = title;
        this._author = author;
        this._year = year;
    }

    printInfo() {
        console.log(`Книга "${this._title}", автор ${this._author}, рік видавництва ${this._year}. Друкований формат.`);
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
        if (!newTitle || typeof newTitle !== 'string' || newTitle.trim() === '') {
            throw new Error("Назва книги повинна бути непорожнім рядком");
        } else {
            this._title = newTitle;
        }
    }

    set author(newAuthor) {
        if (!newAuthor || typeof newAuthor !== 'string' || newAuthor.trim() === '') {
            throw new Error("Ім'я автора повинно бути непорожнім рядком");
        } else {
            this._author = newAuthor;
        }   
    }

    set year(newYear) {
        const currentYear = new Date().getFullYear();
        if (typeof newYear !== 'number' || newYear < 0 || newYear > currentYear) {
            throw new Error(`Рік видавництва повинен бути числом від 0 до ${currentYear}`);
        } else {
            this._year = newYear;
        }   
    }

    static getOldestBook(books) {
        if (!Array.isArray(books) || books.length === 0) {
            throw new Error("Потрібен непорожній масив книг");
        }
        let oldestBook = books[0];
        for (const book of books) {
            if (!(book instanceof Book)) {
                throw new Error("Всі елементи масиву повинні бути книгами");
            }
            if (book.year < oldestBook.year) {
                oldestBook = book;
            }
        }
        return oldestBook;
    }
}