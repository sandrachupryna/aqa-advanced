/**
 * НАСЛІДУВАННЯ В JAVASCRIPT
 * 
 * Наслідування - це механізм, який дозволяє класу успадковувати
 * властивості та методи іншого класу.
 * 
 * Базовий клас (батьківський, superclass) - клас, від якого наслідуються інші
 * Похідний клас (дочірній, subclass) - клас, який наслідує від базового
 * 
 * Ключове слово: extends - для наслідування
 * Ключове слово: super - для виклику методів батьківського класу
 */

// ============================================
// ПРИКЛАД 1: Базове наслідування
// ============================================

/**
 * Базовий клас - тварина
 */
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }

    // Метод, який буде успадкований
    makeSound() {
        return `${this.name} видає звук`;
    }

    // Метод для отримання інформації
    getInfo() {
        return `${this.name} - ${this.species}`;
    }

    // Метод, який може бути перевизначений
    move() {
        return `${this.name} рухається`;
    }
}

/**
 * Похідний клас - собака
 * Наслідується від Animal
 */
class Dog extends Animal {
    constructor(name, breed) {
        // Виклик конструктора батьківського класу
        super(name, "Собака");
        this.breed = breed;  // Додаткова властивість
    }

    // Перевизначення методу батьківського класу
    makeSound() {
        return `${this.name} гавкає: Гав-гав!`;
    }

    // Додатковий метод, якого немає в батьківському класі
    fetch() {
        return `${this.name} приносить м'яч`;
    }
}

/**
 * Похідний клас - кіт
 * Наслідується від Animal
 */
class Cat extends Animal {
    constructor(name, color) {
        super(name, "Кіт");
        this.color = color;
    }

    // Перевизначення методу
    makeSound() {
        return `${this.name} муркоче: Мяу-мяу!`;
    }

    // Перевизначення методу move
    move() {
        return `${this.name} тихо крадеться`;
    }

    // Додатковий метод
    climb() {
        return `${this.name} лазить по деревах`;
    }
}

// Використання класів
const dog = new Dog("Рекс", "Лабрадор");
const cat = new Cat("Мурка", "Рудий");

console.log(dog.getInfo());      // Рекс - Собака (успадкований метод)
console.log(dog.makeSound());    // Рекс гавкає: Гав-гав! (перевизначений метод)
console.log(dog.fetch());        // Рекс приносить м'яч (власний метод)

console.log(cat.getInfo());      // Мурка - Кіт
console.log(cat.makeSound());    // Мурка муркоче: Мяу-мяу!
console.log(cat.move());         // Мурка тихо крадеться (перевизначений метод)
console.log(cat.climb());        // Мурка лазить по деревах

// ============================================
// ПРИКЛАД 2: Наслідування з додатковими параметрами
// ============================================

class Vehicle {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.speed = 0;
        this.isRunning = false;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            console.log(`${this.brand} ${this.model} заведено`);
        }
    }

    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            this.speed = 0;
            console.log(`${this.brand} ${this.model} зупинено`);
        }
    }

    accelerate(speed) {
        if (this.isRunning) {
            this.speed += speed;
            console.log(`Швидкість: ${this.speed} км/год`);
        }
    }

    getInfo() {
        return `${this.brand} ${this.model} (${this.year})`;
    }
}

class Car extends Vehicle {
    constructor(brand, model, year, doors) {
        super(brand, model, year);
        this.doors = doors;  // Додаткова властивість
    }

    // Додатковий метод
    openTrunk() {
        console.log(`Багажник ${this.brand} ${this.model} відкрито`);
    }

    // Перевизначення методу з додатковою логікою
    getInfo() {
        return `${super.getInfo()} - ${this.doors} дверей`;
    }
}

class Motorcycle extends Vehicle {
    constructor(brand, model, year, engineSize) {
        super(brand, model, year);
        this.engineSize = engineSize;
    }

    // Перевизначення методу accelerate для мотоцикла
    accelerate(speed) {
        if (this.isRunning) {
            this.speed += speed * 1.5;  // Мотоцикл прискорюється швидше
            console.log(`Швидкість: ${this.speed} км/год`);
        }
    }

    // Додатковий метод
    wheelie() {
        if (this.isRunning && this.speed > 30) {
            console.log(`${this.brand} ${this.model} робить вілі!`);
        } else {
            console.log("Швидкість занадто низька для вілі");
        }
    }
}

const car = new Car("Toyota", "Camry", 2020, 4);
const motorcycle = new Motorcycle("Yamaha", "R1", 2021, 1000);

car.start();           // Toyota Camry заведено
car.accelerate(50);    // Швидкість: 50 км/год
car.openTrunk();       // Багажник Toyota Camry відкрито
console.log(car.getInfo());  // Toyota Camry (2020) - 4 дверей

motorcycle.start();    // Yamaha R1 заведено
motorcycle.accelerate(30);  // Швидкість: 45 км/год (1.5x)
motorcycle.wheelie();  // Швидкість занадто низька для вілі
motorcycle.accelerate(20);  // Швидкість: 75 км/год
motorcycle.wheelie();  // Yamaha R1 робить вілі!

// ============================================
// ПРИКЛАД 3: Багаторівневе наслідування
// ============================================

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        return `Привіт, мене звати ${this.name}, мені ${this.age} років`;
    }

    work() {
        return `${this.name} працює`;
    }
}

class Employee extends Person {
    constructor(name, age, position, salary) {
        super(name, age);
        this.position = position;
        this.salary = salary;
    }

    work() {
        return `${this.name} працює на посаді ${this.position}`;
    }

    getSalary() {
        return this.salary;
    }
}

class Manager extends Employee {
    constructor(name, age, position, salary, teamSize) {
        super(name, age, position, salary);
        this.teamSize = teamSize;
    }

    // Перевизначення методу work
    work() {
        return `${this.name} керує командою з ${this.teamSize} людей`;
    }

    // Додатковий метод
    conductMeeting() {
        return `${this.name} проводить зустріч з командою`;
    }
}

const person = new Person("Іван", 25);
const employee = new Employee("Марія", 30, "Розробник", 50000);
const manager = new Manager("Петро", 35, "Менеджер проекту", 80000, 5);

console.log(person.introduce());    // Привіт, мене звати Іван, мені 25 років
console.log(person.work());         // Іван працює

console.log(employee.introduce());   // Привіт, мене звати Марія, мені 30 років (успадковано)
console.log(employee.work());        // Марія працює на посаді Розробник
console.log(employee.getSalary());   // 50000

console.log(manager.introduce());    // Привіт, мене звати Петро, мені 35 років (успадковано)
console.log(manager.work());         // Петро керує командою з 5 людей
console.log(manager.getSalary());    // 80000 (успадковано)
console.log(manager.conductMeeting()); // Петро проводить зустріч з командою

