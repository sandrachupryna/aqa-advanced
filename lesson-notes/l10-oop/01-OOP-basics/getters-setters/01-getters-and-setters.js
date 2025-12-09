/**
 * ГЕТТЕРИ ТА СЕТТЕРИ В JAVASCRIPT
 * 
 * Геттери (getters) та сеттери (setters) - це спеціальні методи, які дозволяють
 * контролювати доступ до властивостей об'єкта.
 * 
 * Геттер (get) - викликається при читанні властивості
 * Сеттер (set) - викликається при записі значення в властивість
 * 
 * Переваги:
 * - Валідація даних при встановленні значень
 * - Обчислення значень на льоту
 * - Інкапсуляція внутрішньої реалізації
 */

// ============================================
// ПРИКЛАД 1: Базові геттери та сеттери
// ============================================

class Temperature {
    constructor(celsius) {
        // Приватна властивість для зберігання температури в Цельсіях
        this._celsius = celsius;
    }

    // Геттер для отримання температури в Цельсіях
    get celsius() {
        return this._celsius;
    }

    // Сеттер для встановлення температури в Цельсіях з валідацією
    set celsius(value) {
        // Валідація: температура не може бути нижче абсолютного нуля
        if (value < -273.15) {
            console.log("Помилка: Температура не може бути нижче абсолютного нуля (-273.15°C)");
            return;
        }
        this._celsius = value;
    }

    // Геттер для отримання температури в Фаренгейтах (обчислюється на льоту)
    get fahrenheit() {
        return (this._celsius * 9/5) + 32;
    }

    // Сеттер для встановлення температури в Фаренгейтах
    set fahrenheit(value) {
        // Конвертуємо Фаренгейти в Цельсії
        this.celsius = (value - 32) * 5/9;
    }

    // Геттер для отримання температури в Кельвінах
    get kelvin() {
        return this._celsius + 273.15;
    }

    // Сеттер для встановлення температури в Кельвінах
    set kelvin(value) {
        if (value < 0) {
            console.log("Помилка: Температура в Кельвінах не може бути від'ємною");
            return;
        }
        this.celsius = value - 273.15;
    }
}

// Використання геттерів та сеттерів
const temp = new Temperature(25);

// Використання геттерів (виглядає як звичайна властивість)
console.log(temp.celsius);      // 25
console.log(temp.fahrenheit);   // 77 (обчислюється автоматично)
console.log(temp.kelvin);       // 298.15 (обчислюється автоматично)

// Використання сеттерів (виглядає як звичайне присвоєння)
temp.celsius = 30;
console.log(temp.celsius);      // 30
console.log(temp.fahrenheit);   // 86 (автоматично перераховано)

temp.fahrenheit = 100;
console.log(temp.celsius);      // 37.777... (автоматично конвертовано)
console.log(temp.fahrenheit);   // 100

// Валідація через сеттер
temp.celsius = -300;            // Помилка: Температура не може бути нижче абсолютного нуля
console.log(temp.celsius);      // 37.777... (значення не змінилося)

// ============================================
// ПРИКЛАД 2: Геттер для обчислення значень
// ============================================

class Circle {
    constructor(radius) {
        // Зберігаємо тільки радіус
        this._radius = radius;
    }

    // Геттер для радіуса
    get radius() {
        return this._radius;
    }

    // Сеттер для радіуса з валідацією
    set radius(value) {
        if (value <= 0) {
            console.log("Помилка: Радіус має бути більше 0");
            return;
        }
        this._radius = value;
    }

    // Геттер для діаметра (обчислюється на льоту)
    get diameter() {
        return this._radius * 2;
    }

    // Сеттер для діаметра
    set diameter(value) {
        if (value <= 0) {
            console.log("Помилка: Діаметр має бути більше 0");
            return;
        }
        this._radius = value / 2;
    }

    // Геттер для площі (обчислюється на льоту)
    get area() {
        return Math.PI * this._radius ** 2;
    }

    // Геттер для периметра (обчислюється на льоту)
    get perimeter() {
        return 2 * Math.PI * this._radius;
    }
}

const circle = new Circle(5);

console.log(circle.radius);     // 5
console.log(circle.diameter);   // 10 (обчислюється)
console.log(circle.area);       // 78.5398... (обчислюється)
console.log(circle.perimeter);  // 31.4159... (обчислюється)

// Зміна діаметра автоматично змінює радіус
circle.diameter = 20;
console.log(circle.radius);     // 10 (автоматично оновлено)
console.log(circle.area);       // 314.159... (автоматично перераховано)

// ============================================
// ПРИКЛАД 3: Геттери та сеттери для валідації
// ============================================

class User {
    constructor(name, email, age) {
        this._name = name;
        this._email = email;
        this._age = age;
    }

    // Геттер та сеттер для імені
    get name() {
        return this._name;
    }

    set name(value) {
        if (!value || typeof value !== 'string' || value.trim().length === 0) {
            console.log("Помилка: Ім'я має бути непустим рядком");
            return;
        }
        this._name = value.trim();
    }

    // Геттер та сеттер для email з валідацією
    get email() {
        return this._email;
    }

    set email(value) {
        // Проста валідація email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            console.log("Помилка: Невірний формат email");
            return;
        }
        this._email = value;
    }

    // Геттер та сеттер для віку з валідацією
    get age() {
        return this._age;
    }

    set age(value) {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < 0 || numValue > 150) {
            console.log("Помилка: Вік має бути числом від 0 до 150");
            return;
        }
        this._age = Math.floor(numValue);
    }

    // Геттер для інформації про користувача
    get info() {
        return `${this._name} (${this._email}), ${this._age} років`;
    }
}

const user = new User("Іван", "ivan@example.com", 25);
console.log(user.info);  // Іван (ivan@example.com), 25 років

// Валідація через сеттери
user.name = "  Петро  ";  // Автоматично обрізає пробіли
console.log(user.name);   // Петро

user.email = "invalid-email";  // Помилка: Невірний формат email
console.log(user.email);      // ivan@example.com (не змінилося)

user.age = 30.7;  // Автоматично округлює до 30
console.log(user.age);  // 30

user.age = -5;    // Помилка: Вік має бути числом від 0 до 150
console.log(user.age);  // 30 (не змінилося)

// ============================================
// ПРИКЛАД 4: Геттери для обчислення складних значень
// ============================================

class ShoppingCart {
    constructor() {
        this._items = [];
    }

    // Геттер для отримання списку товарів
    get items() {
        return [...this._items];  // Повертаємо копію для захисту
    }

    // Метод для додавання товару
    addItem(name, price, quantity = 1) {
        this._items.push({ name, price, quantity });
    }

    // Геттер для загальної кількості товарів
    get totalItems() {
        return this._items.reduce((total, item) => total + item.quantity, 0);
    }

    // Геттер для загальної суми
    get totalPrice() {
        return this._items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    // Геттер для середньої ціни товару
    get averagePrice() {
        if (this._items.length === 0) {
            return 0;
        }
        return this.totalPrice / this.totalItems;
    }

    // Геттер для інформації про кошик
    get summary() {
        return {
            itemsCount: this._items.length,
            totalItems: this.totalItems,
            totalPrice: this.totalPrice,
            averagePrice: this.averagePrice.toFixed(2)
        };
    }
}

const cart = new ShoppingCart();
cart.addItem("Ноутбук", 25000, 1);
cart.addItem("Миша", 500, 2);
cart.addItem("Клавіатура", 1500, 1);

console.log(cart.totalItems);    // 4 (1 + 2 + 1)
console.log(cart.totalPrice);    // 28000
console.log(cart.averagePrice);  // 7000
console.log(cart.summary);
// { itemsCount: 3, totalItems: 4, totalPrice: 28000, averagePrice: '7000.00' }

// ============================================
// ПРИКЛАД 5: Практичне застосування для автоматизації тестування
// ============================================

/**
 * Клас для роботи з конфігурацією тестів
 * Демонструє використання геттерів та сеттерів для валідації та обчислення
 */
class TestConfig {
    constructor() {
        this._baseUrl = "";
        this._timeout = 5000;
        this._retries = 0;
        this._headless = false;
    }

    // Геттер та сеттер для базового URL
    get baseUrl() {
        return this._baseUrl;
    }

    set baseUrl(value) {
        if (!value || typeof value !== 'string') {
            throw new Error("baseUrl має бути непустим рядком");
        }
        // Перевірка формату URL
        try {
            new URL(value);
            this._baseUrl = value;
        } catch {
            throw new Error("Невірний формат URL");
        }
    }

    // Геттер та сеттер для таймауту
    get timeout() {
        return this._timeout;
    }

    set timeout(value) {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < 0) {
            throw new Error("timeout має бути додатнім числом");
        }
        this._timeout = numValue;
    }

    // Геттер та сеттер для кількості повторів
    get retries() {
        return this._retries;
    }

    set retries(value) {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < 0 || !Number.isInteger(numValue)) {
            throw new Error("retries має бути невід'ємним цілим числом");
        }
        this._retries = numValue;
    }

    // Геттер та сеттер для режиму headless
    get headless() {
        return this._headless;
    }

    set headless(value) {
        this._headless = Boolean(value);
    }

    // Геттер для повної конфігурації
    get config() {
        return {
            baseUrl: this._baseUrl,
            timeout: this._timeout,
            retries: this._retries,
            headless: this._headless
        };
    }

    // Геттер для валідації конфігурації
    get isValid() {
        return this._baseUrl !== "" && this._timeout > 0;
    }
}

const testConfig = new TestConfig();

// Встановлення значень через сеттери
testConfig.baseUrl = "https://example.com";
testConfig.timeout = 10000;
testConfig.retries = 3;
testConfig.headless = true;

console.log(testConfig.config);
// { baseUrl: 'https://example.com', timeout: 10000, retries: 3, headless: true }

console.log(testConfig.isValid);  // true

// Валідація через сеттери
try {
    testConfig.baseUrl = "invalid-url";  // Викличе помилку
} catch (error) {
    console.log(error.message);  // Невірний формат URL
}

try {
    testConfig.timeout = -1000;  // Викличе помилку
} catch (error) {
    console.log(error.message);  // timeout має бути додатнім числом
}

// ============================================
// КЛЮЧОВІ МОМЕНТИ:
// ============================================
// 1. Геттери викликаються при читанні властивості (obj.property)
// 2. Сеттери викликаються при записі значення (obj.property = value)
// 3. Геттери та сеттери виглядають як звичайні властивості, але є методами
// 4. Геттери можуть обчислювати значення на льоту
// 5. Сеттери дозволяють валідувати дані перед збереженням
// 6. Геттери та сеттери допомагають в інкапсуляції та контролі доступу
// 7. Використання геттерів та сеттерів робить код більш читабельним та безпечним

