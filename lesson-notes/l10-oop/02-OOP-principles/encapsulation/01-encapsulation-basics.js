/**
 * ІНКАПСУЛЯЦІЯ В JAVASCRIPT
 * 
 * Інкапсуляція - це механізм об'єднання даних та методів, які з ними працюють,
 * в одній структурі (класі) та обмеження доступу до внутрішніх деталей реалізації.
 * 
 * Переваги інкапсуляції:
 * - Захист даних від некоректного використання
 * - Приховування деталей реалізації
 * - Спрощення використання класу
 * - Легше підтримувати та змінювати код
 */

// ============================================
// ПРИКЛАД 1: Базова інкапсуляція
// ============================================

class BankAccount {
    constructor(owner, initialBalance = 0) {
        // Публічна властивість
        this.owner = owner;
        
        // Приватна властивість - баланс не можна змінювати напряму
        this.#balance = initialBalance;
        
        // Приватна властивість для історії транзакцій
        this.#transactionHistory = [];
    }

    // Приватні поля
    #balance = 0;
    #transactionHistory = [];

    // Публічний метод для отримання балансу
    // Користувач не може напряму змінити баланс
    getBalance() {
        return this.#balance;
    }

    // Публічний метод для поповнення з валідацією
    deposit(amount) {
        if (amount <= 0) {
            console.log("Сума має бути більше 0");
            return false;
        }
        
        this.#balance += amount;
        this.#addTransaction('deposit', amount);
        console.log(`Поповнено на ${amount} грн. Баланс: ${this.#balance} грн`);
        return true;
    }

    // Публічний метод для зняття з валідацією
    withdraw(amount) {
        if (amount <= 0) {
            console.log("Сума має бути більше 0");
            return false;
        }
        
        if (amount > this.#balance) {
            console.log("Недостатньо коштів на рахунку");
            return false;
        }
        
        this.#balance -= amount;
        this.#addTransaction('withdraw', amount);
        console.log(`Знято ${amount} грн. Залишок: ${this.#balance} грн`);
        return true;
    }

    // Приватний метод - деталі реалізації приховані
    #addTransaction(type, amount) {
        this.#transactionHistory.push({
            type: type,
            amount: amount,
            date: new Date(),
            balance: this.#balance
        });
    }

    // Публічний метод для отримання історії (повертає копію)
    getTransactionHistory() {
        // Повертаємо копію, щоб не можна було змінити оригінал
        return this.#transactionHistory.map(t => ({ ...t }));
    }
}

// Використання класу
const account = new BankAccount("Іван", 1000);

// Можна отримати баланс через публічний метод
console.log(account.getBalance());  // 1000

// Не можна напряму змінити баланс
// account.#balance = 10000;  // SyntaxError: Private field '#balance' must be declared in an enclosing class

// Всі операції проходять через публічні методи з валідацією
account.deposit(500);   // Поповнено на 500 грн. Баланс: 1500 грн
account.withdraw(200);  // Знято 200 грн. Залишок: 1300 грн
account.withdraw(2000); // Недостатньо коштів на рахунку

console.log(account.getBalance());  // 1300

// ============================================
// ПРИКЛАД 2: Інкапсуляція з геттерами та сеттерами
// ============================================

class Temperature {
    // Приватна властивість
    #celsius = 0;

    constructor(celsius) {
        this.celsius = celsius;  // Використовуємо сеттер для валідації
    }

    // Геттер для отримання температури в Цельсіях
    get celsius() {
        return this.#celsius;
    }

    // Сеттер для встановлення температури з валідацією
    set celsius(value) {
        if (value < -273.15) {
            throw new Error("Температура не може бути нижче абсолютного нуля");
        }
        this.#celsius = value;
    }

    // Геттер для температури в Фаренгейтах (обчислюється)
    get fahrenheit() {
        return (this.#celsius * 9/5) + 32;
    }

    // Сеттер для температури в Фаренгейтах
    set fahrenheit(value) {
        this.celsius = (value - 32) * 5/9;
    }
}

const temp = new Temperature(25);
console.log(temp.celsius);      // 25
console.log(temp.fahrenheit);   // 77

// Валідація через сеттер
try {
    temp.celsius = -300;  // Викличе помилку
} catch (error) {
    console.log(error.message);  // Температура не може бути нижче абсолютного нуля
}

// ============================================
// ПРИКЛАД 3: Інкапсуляція складних обчислень
// ============================================

class ShoppingCart {
    constructor() {
        // Приватні властивості
        this.#items = [];
        this.#discount = 0;
    }

    #items = [];
    #discount = 0;

    // Публічний метод для додавання товару
    addItem(name, price, quantity = 1) {
        if (!name || price <= 0 || quantity <= 0) {
            console.log("Невірні дані товару");
            return false;
        }

        const item = {
            name: name,
            price: price,
            quantity: quantity
        };

        this.#items.push(item);
        return true;
    }

    // Публічний метод для застосування знижки
    applyDiscount(percent) {
        if (percent < 0 || percent > 100) {
            console.log("Знижка має бути від 0 до 100%");
            return false;
        }
        this.#discount = percent;
        return true;
    }

    // Приватний метод для обчислення суми без знижки
    #calculateSubtotal() {
        return this.#items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    // Приватний метод для обчислення суми знижки
    #calculateDiscountAmount() {
        const subtotal = this.#calculateSubtotal();
        return subtotal * (this.#discount / 100);
    }

    // Публічний метод для отримання загальної суми
    getTotal() {
        const subtotal = this.#calculateSubtotal();
        const discountAmount = this.#calculateDiscountAmount();
        return subtotal - discountAmount;
    }

    // Публічний метод для отримання детальної інформації
    getSummary() {
        const subtotal = this.#calculateSubtotal();
        const discountAmount = this.#calculateDiscountAmount();
        const total = subtotal - discountAmount;

        return {
            itemsCount: this.#items.length,
            subtotal: subtotal,
            discount: this.#discount,
            discountAmount: discountAmount,
            total: total
        };
    }

    // Публічний метод для отримання списку товарів (копія)
    getItems() {
        return this.#items.map(item => ({ ...item }));
    }
}

const cart = new ShoppingCart();
cart.addItem("Ноутбук", 25000, 1);
cart.addItem("Миша", 500, 2);
cart.applyDiscount(10);

const summary = cart.getSummary();
console.log(summary);
// {
//   itemsCount: 2,
//   subtotal: 26000,
//   discount: 10,
//   discountAmount: 2600,
//   total: 23400
// }

// Деталі обчислень приховані - користувач отримує тільки результат
console.log(cart.getTotal());  // 23400

class Secret {
    // Приватне поле
    #secretCode = "app-lesson-meeting div.lesson-meeting__actions>a";

    // Публічний метод для перевірки коду
    isCodeValid(code) {
        return code === this.#secretCode;
    }
}

const secrets = new Secret();
console.log(secrets.isCodeValid("app-lesson-meeting div.lesson-meeting__actions>a")); // true
// console.log(secrets.#secretCode); // SyntaxError: Private field