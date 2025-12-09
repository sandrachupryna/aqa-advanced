/**
 * ВЛАСТИВОСТІ ТА МЕТОДИ В JAVASCRIPT
 * 
 * Властивості (properties) - це дані, які зберігає об'єкт
 * Методи (methods) - це функції, які належать об'єкту та виконують дії
 */

// ============================================
// ПРИКЛАД 1: Властивості та методи
// ============================================

class Car {
    constructor(brand, model, year) {
        // Властивості - дані об'єкта
        this.brand = brand;      // Публічна властивість
        this.model = model;      // Публічна властивість
        this.year = year;        // Публічна властивість
        this.speed = 0;          // Публічна властивість з початковим значенням
        this.isRunning = false;  // Публічна властивість-прапорець
    }

    // Методи - функції, які виконують дії над об'єктом
    
    // Метод для запуску автомобіля
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            console.log(`${this.brand} ${this.model} заведено`);
        } else {
            console.log("Автомобіль вже працює");
        }
    }

    // Метод для зупинки автомобіля
    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            this.speed = 0;
            console.log(`${this.brand} ${this.model} зупинено`);
        } else {
            console.log("Автомобіль вже зупинено");
        }
    }

    // Метод для збільшення швидкості
    accelerate(increase) {
        if (this.isRunning) {
            this.speed += increase;
            console.log(`Швидкість: ${this.speed} км/год`);
        } else {
            console.log("Спочатку заведіть автомобіль");
        }
    }

    // Метод для зменшення швидкості
    brake(decrease) {
        if (this.speed > 0) {
            this.speed = Math.max(0, this.speed - decrease);
            console.log(`Швидкість: ${this.speed} км/год`);
        } else {
            console.log("Автомобіль вже стоїть");
        }
    }

    // Метод для отримання інформації про автомобіль
    getInfo() {
        const status = this.isRunning ? "працює" : "зупинено";
        return `${this.brand} ${this.model} (${this.year}) - ${status}, швидкість: ${this.speed} км/год`;
    }

    // Метод для отримання поточної швидкості
    getSpeed() {
        return this.speed;
    }
}

// Використання класу Car
const car1 = new Car("Toyota", "Camry", 2020);
console.log(car1.getInfo());  // Toyota Camry (2020) - зупинено, швидкість: 0 км/год

car1.start();                  // Toyota Camry заведено
car1.accelerate(50);           // Швидкість: 50 км/год
car1.accelerate(30);           // Швидкість: 80 км/год
car1.brake(20);                // Швидкість: 60 км/год
console.log(car1.getSpeed());  // 60
car1.stop();                    // Toyota Camry зупинено

// ============================================
// ПРИКЛАД 2: Різні типи властивостей
// ============================================

class BankAccount {
    constructor(owner, initialBalance = 0) {
        // Публічні властивості - доступні ззовні
        this.owner = owner;
        this.accountNumber = this.generateAccountNumber();
        
        // Захищена властивість (конвенція з підкресленням)
        // В JavaScript немає справжніх захищених властивостей,
        // але підкреслення вказує, що їх не слід використовувати напряму
        this._balance = initialBalance;
        
        // Властивість для зберігання історії транзакцій
        this.transactions = [];
    }

    // Приватний метод (конвенція) для генерації номера рахунку
    generateAccountNumber() {
        return 'ACC' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Публічний метод для отримання балансу
    getBalance() {
        return this._balance;
    }

    // Публічний метод для поповнення рахунку
    deposit(amount) {
        if (amount > 0) {
            this._balance += amount;
            this.transactions.push({
                type: 'deposit',
                amount: amount,
                date: new Date()
            });
            console.log(`Поповнено на ${amount} грн. Новий баланс: ${this._balance} грн`);
        } else {
            console.log("Сума має бути більше 0");
        }
    }

    // Публічний метод для зняття коштів
    withdraw(amount) {
        if (amount > 0 && amount <= this._balance) {
            this._balance -= amount;
            this.transactions.push({
                type: 'withdraw',
                amount: amount,
                date: new Date()
            });
            console.log(`Знято ${amount} грн. Залишок: ${this._balance} грн`);
        } else if (amount > this._balance) {
            console.log("Недостатньо коштів на рахунку");
        } else {
            console.log("Сума має бути більше 0");
        }
    }

    // Публічний метод для отримання історії транзакцій
    getTransactionHistory() {
        return this.transactions;
    }

    // Публічний метод для отримання інформації про рахунок
    getAccountInfo() {
        return {
            owner: this.owner,
            accountNumber: this.accountNumber,
            balance: this._balance,
            transactionsCount: this.transactions.length
        };
    }
}

// Використання класу BankAccount
const account = new BankAccount("Петро Іванов", 1000);
console.log(account.getAccountInfo());
// { owner: 'Петро Іванов', accountNumber: 'ACC...', balance: 1000, transactionsCount: 0 }

account.deposit(500);   // Поповнено на 500 грн. Новий баланс: 1500 грн
account.withdraw(200);  // Знято 200 грн. Залишок: 1300 грн
account.withdraw(2000); // Недостатньо коштів на рахунку

console.log(account.getBalance());  // 1300
console.log(account.getTransactionHistory().length);  // 2

// ============================================
// ПРИКЛАД 3: Методи, які повертають значення
// ============================================

class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    // Метод, який обчислює та повертає площу
    getArea() {
        return this.width * this.height;
    }

    // Метод, який обчислює та повертає периметр
    getPerimeter() {
        return 2 * (this.width + this.height);
    }

    // Метод, який перевіряє, чи є прямокутник квадратом
    isSquare() {
        return this.width === this.height;
    }

    // Метод, який повертає об'єкт з інформацією
    getInfo() {
        return {
            width: this.width,
            height: this.height,
            area: this.getArea(),
            perimeter: this.getPerimeter(),
            isSquare: this.isSquare()
        };
    }
}

const rect1 = new Rectangle(5, 10);
const rect2 = new Rectangle(7, 7);

console.log(rect1.getArea());      // 50
console.log(rect1.getPerimeter()); // 30
console.log(rect1.isSquare());     // false

console.log(rect2.getArea());      // 49
console.log(rect2.isSquare());     // true
console.log(rect2.getInfo());
// { width: 7, height: 7, area: 49, perimeter: 28, isSquare: true }

// ============================================
// ПРИКЛАД 4: Методи, які змінюють стан об'єкта
// ============================================

class ShoppingCart {
    constructor() {
        this.items = [];  // Масив товарів
        this.total = 0;   // Загальна сума
    }

    // Метод для додавання товару
    addItem(name, price, quantity = 1) {
        const item = {
            name: name,
            price: price,
            quantity: quantity
        };
        this.items.push(item);
        this.calculateTotal();  // Перерахунок загальної суми
        console.log(`Додано: ${name} x${quantity}`);
    }

    // Метод для видалення товару
    removeItem(name) {
        const index = this.items.findIndex(item => item.name === name);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.calculateTotal();  // Перерахунок загальної суми
            console.log(`Видалено: ${name}`);
        } else {
            console.log(`Товар "${name}" не знайдено`);
        }
    }

    // Приватний метод (конвенція) для перерахунку загальної суми
    calculateTotal() {
        this.total = this.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    }

    // Метод для отримання загальної суми
    getTotal() {
        return this.total;
    }

    // Метод для очищення кошика
    clear() {
        this.items = [];
        this.total = 0;
        console.log("Кошик очищено");
    }

    // Метод для отримання списку товарів
    getItems() {
        return this.items;
    }

    // Метод для отримання інформації про кошик
    getCartInfo() {
        return {
            itemsCount: this.items.length,
            total: this.total,
            items: this.items
        };
    }
}

const cart = new ShoppingCart();
cart.addItem("Ноутбук", 25000, 1);
cart.addItem("Миша", 500, 2);
cart.addItem("Клавіатура", 1500, 1);

console.log(cart.getTotal());  // 28000
console.log(cart.getCartInfo());
cart.removeItem("Миша");
console.log(cart.getTotal());  // 26500

// ============================================
// КЛЮЧОВІ МОМЕНТИ:
// ============================================
// 1. Властивості зберігають дані об'єкта
// 2. Методи виконують дії над об'єктом
// 3. Методи можуть змінювати властивості об'єкта
// 4. Методи можуть повертати значення
// 5. Методи можуть викликати інші методи
// 6. this в методах вказує на поточний об'єкт
// 7. Властивості та методи можуть бути публічними, захищеними (конвенція _) або приватними (конвенція)

