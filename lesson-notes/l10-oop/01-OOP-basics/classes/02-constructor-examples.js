/**
 * КОНСТРУКТОРИ В JAVASCRIPT
 * 
 * Конструктор - це спеціальний метод класу, який:
 * - Викликається автоматично при створенні нового об'єкта (new)
 * - Використовується для ініціалізації властивостей об'єкта
 * - Може приймати параметри для налаштування об'єкта
 */

// ============================================
// ПРИКЛАД 1: Конструктор з параметрами
// ============================================

class Book {
    // Конструктор приймає параметри для ініціалізації
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.isRead = false;  // Властивість зі значенням за замовчуванням
    }

    // Метод для позначення книги як прочитаної
    markAsRead() {
        this.isRead = true;
    }

    // Метод для отримання інформації про книгу
    getInfo() {
        const status = this.isRead ? "прочитана" : "не прочитана";
        return `${this.title} (${this.author}, ${this.year}) - ${status}`;
    }
}

// Створення об'єктів з різними параметрами
const book1 = new Book("JavaScript: The Good Parts", "Douglas Crockford", 2008);
const book2 = new Book("Clean Code", "Robert C. Martin", 2008);

console.log(book1.getInfo());  // JavaScript: The Good Parts (Douglas Crockford, 2008) - не прочитана
book1.markAsRead();
console.log(book1.getInfo());  // JavaScript: The Good Parts (Douglas Crockford, 2008) - прочитана

// ============================================
// ПРИКЛАД 2: Конструктор з параметрами за замовчуванням
// ============================================

class Product {
    constructor(name, price = 0, category = "uncategorized") {
        this.name = name;
        this.price = price;
        this.category = category;
        this.createdAt = new Date();  // Автоматично встановлює поточну дату
    }

    // Метод для зміни ціни
    setPrice(newPrice) {
        if (newPrice >= 0) {
            this.price = newPrice;
        } else {
            console.log("Ціна не може бути від'ємною");
        }
    }

    // Метод для отримання інформації
    getInfo() {
        return `${this.name} - ${this.price} грн (${this.category})`;
    }
}

// Створення продуктів з різною кількістю параметрів
const product1 = new Product("Ноутбук", 25000, "Електроніка");
const product2 = new Product("Стіл");  // Використовує значення за замовчуванням
const product3 = new Product("Крісло", 5000);  // Частково використовує значення за замовчуванням

console.log(product1.getInfo());  // Ноутбук - 25000 грн (Електроніка)
console.log(product2.getInfo());  // Стіл - 0 грн (uncategorized)
console.log(product3.getInfo());  // Крісло - 5000 грн (uncategorized)

// ============================================
// ПРИКЛАД 3: Конструктор з валідацією
// ============================================

class Student {
    constructor(name, age, studentId) {
        // Валідація вхідних даних
        if (!name || typeof name !== 'string') {
            throw new Error("Ім'я має бути непустим рядком");
        }
        
        if (age < 0 || age > 150) {
            throw new Error("Вік має бути від 0 до 150");
        }
        
        if (!studentId || typeof studentId !== 'string') {
            throw new Error("ID студента має бути непустим рядком");
        }

        // Ініціалізація властивостей після валідації
        this.name = name;
        this.age = age;
        this.studentId = studentId;
        this.grades = [];  // Масив для зберігання оцінок
    }

    // Метод для додавання оцінки
    addGrade(grade) {
        if (grade >= 0 && grade <= 100) {
            this.grades.push(grade);
        } else {
            console.log("Оцінка має бути від 0 до 100");
        }
    }

    // Метод для обчислення середнього балу
    getAverageGrade() {
        if (this.grades.length === 0) {
            return 0;
        }
        const sum = this.grades.reduce((total, grade) => total + grade, 0);
        return sum / this.grades.length;
    }

    // Метод для отримання інформації
    getInfo() {
        const average = this.getAverageGrade();
        return `${this.name} (ID: ${this.studentId}) - Середній бал: ${average.toFixed(2)}`;
    }
}

// Створення студентів
const student1 = new Student("Марія", 20, "ST001");
student1.addGrade(85);
student1.addGrade(90);
student1.addGrade(78);
console.log(student1.getInfo());  // Марія (ID: ST001) - Середній бал: 84.33

// Спроба створити невалідного студента (викличе помилку)
// const invalidStudent = new Student("", 20, "ST002");  // Error: Ім'я має бути непустим рядком

// ============================================
// ПРИКЛАД 4: Конструктор без параметрів
// ============================================

class Counter {
    // Конструктор без параметрів - ініціалізує значення за замовчуванням
    constructor() {
        this.count = 0;
    }

    // Метод для збільшення лічильника
    increment() {
        this.count++;
    }

    // Метод для зменшення лічильника
    decrement() {
        this.count--;
    }

    // Метод для скидання лічильника
    reset() {
        this.count = 0;
    }

    // Метод для отримання поточного значення
    getValue() {
        return this.count;
    }
}

const counter = new Counter();
counter.increment();
counter.increment();
counter.increment();
console.log(counter.getValue());  // 3
counter.decrement();
console.log(counter.getValue());  // 2
counter.reset();
console.log(counter.getValue());  // 0

// ============================================
// КЛЮЧОВІ МОМЕНТИ:
// ============================================
// 1. Конструктор завжди викликається при створенні об'єкта (new)
// 2. Конструктор може приймати параметри для ініціалізації
// 3. Можна використовувати значення за замовчуванням для параметрів
// 4. Конструктор може містити валідацію даних
// 5. Конструктор може ініціалізувати властивості зі значеннями за замовчуванням
// 6. this в конструкторі вказує на об'єкт, який створюється

