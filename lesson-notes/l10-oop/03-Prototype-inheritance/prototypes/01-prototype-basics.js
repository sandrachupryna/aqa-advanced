/**
 * ПРОТОТИПНА МОДЕЛЬ JAVASCRIPT
 * 
 * JavaScript використовує прототипну модель наслідування, а не класичну класову модель.
 * Кожен об'єкт має посилання на інший об'єкт, який називається прототипом.
 * 
 * Ключові концепції:
 * - prototype - властивість функції-конструктора
 * - __proto__ - посилання на прототип об'єкта (застаріле, але все ще використовується)
 * - Object.getPrototypeOf() - метод для отримання прототипу
 * - Прототипний ланцюжок - механізм пошуку властивостей
 */

// ============================================
// ПРИКЛАД 1: Базове розуміння прототипів
// ============================================

// Функція-конструктор (старий спосіб до ES6)
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Додавання методу до прототипу
Person.prototype.greet = function() {
    return `Привіт! Мене звати ${this.name}, мені ${this.age} років`;
};

// Додавання методу для отримання інформації
Person.prototype.getInfo = function() {
    return `${this.name}, ${this.age} років`;
};

// Створення об'єктів через конструктор
const person1 = new Person("Олена", 25);
const person2 = new Person("Іван", 30);

console.log(person1.greet());  // Привіт! Мене звати Олена, мені 25 років
console.log(person2.greet());  // Привіт! Мене звати Іван, мені 30 років

// Перевірка прототипу
console.log(person1.__proto__ === Person.prototype);  // true
console.log(Object.getPrototypeOf(person1) === Person.prototype);  // true

// Всі об'єкти мають спільний прототип
console.log(person1.greet === person2.greet);  // true (одна і та ж функція)

// ============================================
// ПРИКЛАД 2: Прототипний ланцюжок
// ============================================

function Animal(name) {
    this.name = name;
}

// Метод в прототипі Animal
Animal.prototype.makeSound = function() {
    return `${this.name} видає звук`;
};

// Метод в прототипі Animal
Animal.prototype.move = function() {
    return `${this.name} рухається`;
};

function Dog(name, breed) {
    // Виклик конструктора батьківського класу
    Animal.call(this, name);
    this.breed = breed;
}

// Наслідування прототипу
// Створюємо новий об'єкт з прототипом Animal.prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Додавання методу до прототипу Dog
Dog.prototype.makeSound = function() {
    return `${this.name} гавкає: Гав-гав!`;
};

// Додавання нового методу
Dog.prototype.fetch = function() {
    return `${this.name} приносить м'яч`;
};

const dog = new Dog("Рекс", "Лабрадор");

// Пошук властивостей через прототипний ланцюжок:
// 1. dog.name - знайдено в самому об'єкті
// 2. dog.breed - знайдено в самому об'єкті
// 3. dog.makeSound() - знайдено в Dog.prototype (перевизначений)
// 4. dog.move() - знайдено в Animal.prototype (через ланцюжок)
// 5. dog.fetch() - знайдено в Dog.prototype

console.log(dog.name);         // Рекс (з об'єкта)
console.log(dog.breed);        // Лабрадор (з об'єкта)
console.log(dog.makeSound());  // Рекс гавкає: Гав-гав! (з Dog.prototype)
console.log(dog.move());        // Рекс рухається (з Animal.prototype через ланцюжок)
console.log(dog.fetch());       // Рекс приносить м'яч (з Dog.prototype)

// Перевірка прототипного ланцюжка
console.log(dog.__proto__ === Dog.prototype);              // true
console.log(dog.__proto__.__proto__ === Animal.prototype); // true
console.log(dog.__proto__.__proto__.__proto__ === Object.prototype); // true

// ============================================
// ПРИКЛАД 3: Object.create() для створення об'єктів
// ============================================

// Базовий об'єкт (прототип)
const animalPrototype = {
    makeSound() {
        return `${this.name} видає звук`;
    },
    move() {
        return `${this.name} рухається`;
    }
};

// Створення об'єкта з прототипом
const cat = Object.create(animalPrototype);
cat.name = "Мурка";
cat.species = "Кіт";

console.log(cat.makeSound());  // Мурка видає звук
console.log(cat.move());       // Мурка рухається

// Перевірка прототипу
console.log(Object.getPrototypeOf(cat) === animalPrototype);  // true

// Створення об'єкта з додатковими властивостями
const dog2 = Object.create(animalPrototype, {
    name: { value: "Барсік", writable: true },
    species: { value: "Собака", writable: true },
    bark: {
        value: function() {
            return `${this.name} гавкає`;
        }
    }
});

console.log(dog2.makeSound());  // Барсік видає звук (з прототипу)
console.log(dog2.bark());       // Барсік гавкає (власний метод)

// ============================================
// ПРИКЛАД 4: Наслідування через прототипи
// ============================================

// Базовий конструктор
function Vehicle(brand, model) {
    this.brand = brand;
    this.model = model;
    this.speed = 0;
}

Vehicle.prototype.start = function() {
    return `${this.brand} ${this.model} заведено`;
};

Vehicle.prototype.accelerate = function(increase) {
    this.speed += increase;
    return `Швидкість: ${this.speed} км/год`;
};

// Похідний конструктор
function Car(brand, model, doors) {
    // Виклик батьківського конструктора
    Vehicle.call(this, brand, model);
    this.doors = doors;
}

// Наслідування прототипу
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

// Перевизначення методу
Car.prototype.accelerate = function(increase) {
    this.speed += increase;
    return `Автомобіль ${this.brand} ${this.model} прискорюється до ${this.speed} км/год`;
};

// Додавання нового методу
Car.prototype.openTrunk = function() {
    return `Багажник ${this.brand} ${this.model} відкрито`;
};

const car = new Car("Toyota", "Camry", 4);

console.log(car.start());      // Toyota Camry заведено (з Vehicle.prototype)
console.log(car.accelerate(50)); // Автомобіль Toyota Camry прискорюється до 50 км/год (перевизначений)
console.log(car.openTrunk());   // Багажник Toyota Camry відкрито (власний метод)

// ============================================
// ПРИКЛАД 5: Порівняння класів ES6 та прототипів
// ============================================

// Спосіб 1: Функція-конструктор (старий спосіб)
function OldStylePerson(name) {
    this.name = name;
}
OldStylePerson.prototype.greet = function() {
    return `Привіт, я ${this.name}`;
};

// Спосіб 2: Клас ES6 (новий спосіб, але під капотом те саме)
class NewStylePerson {
    constructor(name) {
        this.name = name;
    }
    greet() {
        return `Привіт, я ${this.name}`;
    }
}

const oldPerson = new OldStylePerson("Старий");
const newPerson = new NewStylePerson("Новий");

console.log(oldPerson.greet());  // Привіт, я Старий
console.log(newPerson.greet());  // Привіт, я Новий

// Обидва способи створюють об'єкти з прототипами
console.log(oldPerson.__proto__ === OldStylePerson.prototype);  // true
console.log(newPerson.__proto__ === NewStylePerson.prototype);    // true

// Класи ES6 - це синтаксичний цукор над прототипами
// Під капотом класи працюють так само, як функції-конструктори

// ============================================
// ПРИКЛАД 6: Модифікація прототипів
// ============================================

// Додавання методу до вбудованого прототипу (не рекомендується, але можливо)
String.prototype.reverse = function() {
    return this.split('').reverse().join('');
};

const text = "Привіт";
console.log(text.reverse());  // тівірп

// Додавання методу до прототипу масиву
Array.prototype.last = function() {
    return this[this.length - 1];
};

const arr = [1, 2, 3, 4, 5];
console.log(arr.last());  // 5

// УВАГА: Модифікація вбудованих прототипів не рекомендується,
// оскільки може призвести до конфліктів з іншими бібліотеками

// ============================================
// КЛЮЧОВІ МОМЕНТИ:
// ============================================
// 1. JavaScript використовує прототипну модель наслідування
// 2. Кожен об'єкт має посилання на прототип через __proto__
// 3. Прототипний ланцюжок дозволяє шукати властивості в батьківських прототипах
// 4. Object.create() створює об'єкт з вказаним прототипом
// 5. Класи ES6 - це синтаксичний цукор над прототипами
// 6. Методи додаються до prototype, а не до кожного об'єкта окремо
// 7. Наслідування через прототипи: Child.prototype = Object.create(Parent.prototype)
