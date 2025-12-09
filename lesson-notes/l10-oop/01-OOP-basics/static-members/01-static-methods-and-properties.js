/**
 * СТАТИЧНІ МЕТОДИ ТА ВЛАСТИВОСТІ В JAVASCRIPT
 * 
 * Статичні члени класу належать самому класу, а не його екземплярам.
 * Вони викликаються через ім'я класу, а не через об'єкт.
 * 
 * Використання:
 * - Утилітарні функції, пов'язані з класом
 * - Константи класу
 * - Методи, які не потребують доступу до даних екземпляра
 * - Фабричні методи для створення об'єктів
 */

// ============================================
// ПРИКЛАД 1: Статичні методи
// ============================================

class MathHelper {
    // Статичний метод для обчислення квадрата числа
    static square(number) {
        return number * number;
    }

    // Статичний метод для обчислення куба числа
    static cube(number) {
        return number * number * number;
    }

    // Статичний метод для обчислення факторіалу
    static factorial(n) {
        if (n < 0) {
            throw new Error("Факторіал визначений тільки для невід'ємних чисел");
        }
        if (n === 0 || n === 1) {
            return 1;
        }
        return n * MathHelper.factorial(n - 1);
    }

    // Статичний метод для обчислення середнього значення масиву
    static average(numbers) {
        if (numbers.length === 0) {
            return 0;
        }
        const sum = numbers.reduce((total, num) => total + num, 0);
        return sum / numbers.length;
    }
}

// Виклик статичних методів через клас (не через екземпляр)
console.log(MathHelper.square(5));        // 25
console.log(MathHelper.cube(3));          // 27
console.log(MathHelper.factorial(5));     // 120
console.log(MathHelper.average([1, 2, 3, 4, 5]));  // 3

// Статичні методи недоступні через екземпляр
// const helper = new MathHelper();
// helper.square(5);  // TypeError: helper.square is not a function

// ============================================
// ПРИКЛАД 2: Статичні властивості
// ============================================

class Configuration {
    // Статична властивість - константа класу
    static defaultLanguage = "uk";
    static defaultTheme = "light";
    static maxRetries = 3;
    
    // Статична властивість для підрахунку створених екземплярів
    static instanceCount = 0;

    constructor(language = Configuration.defaultLanguage, theme = Configuration.defaultTheme) {
        this.language = language;
        this.theme = theme;
        
        // Збільшуємо лічильник при створенні екземпляра
        Configuration.instanceCount++;
    }

    // Метод для отримання статичної властивості
    getDefaultLanguage() {
        return Configuration.defaultLanguage;
    }

    // Статичний метод для отримання кількості створених екземплярів
    static getInstanceCount() {
        return Configuration.instanceCount;
    }

    // Статичний метод для скидання лічильника
    static resetInstanceCount() {
        Configuration.instanceCount = 0;
    }
}

// Доступ до статичних властивостей через клас
console.log(Configuration.defaultLanguage);  // uk
console.log(Configuration.defaultTheme);     // light
console.log(Configuration.maxRetries);      // 3

// Створення екземплярів
const config1 = new Configuration();
const config2 = new Configuration("en", "dark");
const config3 = new Configuration();

console.log(Configuration.getInstanceCount());  // 3

// Зміна статичної властивості впливає на всі екземпляри
Configuration.defaultLanguage = "en";
console.log(config1.getDefaultLanguage());  // en (змінилося)

// ============================================
// ПРИКЛАД 3: Статичні методи як фабрики об'єктів
// ============================================

class User {
    constructor(name, email, role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }

    // Статичний метод для створення адміністратора
    static createAdmin(name, email) {
        return new User(name, email, "admin");
    }

    // Статичний метод для створення звичайного користувача
    static createUser(name, email) {
        return new User(name, email, "user");
    }

    // Статичний метод для створення користувача з об'єкта
    static fromObject(obj) {
        return new User(obj.name, obj.email, obj.role || "user");
    }

    // Статичний метод для валідації email
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getInfo() {
        return `${this.name} (${this.email}) - ${this.role}`;
    }
}

// Використання статичних фабричних методів
const admin = User.createAdmin("Адмін", "admin@example.com");
const user = User.createUser("Користувач", "user@example.com");
const userFromObj = User.fromObject({
    name: "Тест",
    email: "test@example.com",
    role: "moderator"
});

console.log(admin.getInfo());      // Адмін (admin@example.com) - admin
console.log(user.getInfo());       // Користувач (user@example.com) - user
console.log(userFromObj.getInfo()); // Тест (test@example.com) - moderator

// Використання статичного методу валідації
console.log(User.isValidEmail("test@example.com"));  // true
console.log(User.isValidEmail("invalid-email"));     // false

// ============================================
// ПРИКЛАД 4: Статичні методи для утиліт
// ============================================

class Logger {
    // Статична властивість для рівня логування
    static logLevel = "INFO";
    
    // Статичні константи для рівнів логування
    static LOG_LEVELS = {
        DEBUG: "DEBUG",
        INFO: "INFO",
        WARN: "WARN",
        ERROR: "ERROR"
    };

    // Статичний метод для встановлення рівня логування
    static setLogLevel(level) {
        if (Object.values(Logger.LOG_LEVELS).includes(level)) {
            Logger.logLevel = level;
        } else {
            console.warn(`Невідомий рівень логування: ${level}`);
        }
    }

    // Статичний метод для логування
    static log(message, level = Logger.LOG_LEVELS.INFO) {
        const levels = Object.values(Logger.LOG_LEVELS);
        const currentLevelIndex = levels.indexOf(Logger.logLevel);
        const messageLevelIndex = levels.indexOf(level);

        if (messageLevelIndex >= currentLevelIndex) {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] [${level}] ${message}`);
        }
    }

    // Статичні методи для різних рівнів логування
    static debug(message) {
        Logger.log(message, Logger.LOG_LEVELS.DEBUG);
    }

    static info(message) {
        Logger.log(message, Logger.LOG_LEVELS.INFO);
    }

    static warn(message) {
        Logger.log(message, Logger.LOG_LEVELS.WARN);
    }

    static error(message) {
        Logger.log(message, Logger.LOG_LEVELS.ERROR);
    }
}

// Використання статичних методів Logger
Logger.info("Запуск додатку");
Logger.debug("Детальна інформація");
Logger.warn("Попередження");
Logger.error("Помилка");

// Зміна рівня логування
Logger.setLogLevel(Logger.LOG_LEVELS.WARN);
Logger.debug("Це не буде виведено");  // Не виведеться, бо рівень DEBUG < WARN
Logger.warn("Це буде виведено");      // Виведеться

// ============================================
// ПРИКЛАД 5: Практичне застосування для автоматизації тестування
// ============================================

/**
 * Клас для роботи з тестовими даними
 * Демонструє використання статичних методів та властивостей
 */
class TestDataGenerator {
    // Статичні константи
    static DEFAULT_TIMEOUT = 5000;
    static DEFAULT_RETRIES = 3;
    
    // Статична властивість для зберігання унікальних значень
    static usedEmails = new Set();
    static usedUsernames = new Set();

    // Статичний метод для генерації випадкового email
    static generateEmail(prefix = "user") {
        let email;
        let counter = 0;
        
        do {
            const random = Math.random().toString(36).substring(2, 8);
            email = `${prefix}_${random}@test.com`;
            counter++;
            
            if (counter > 100) {
                throw new Error("Не вдалося згенерувати унікальний email");
            }
        } while (TestDataGenerator.usedEmails.has(email));
        
        TestDataGenerator.usedEmails.add(email);
        return email;
    }

    // Статичний метод для генерації випадкового імені користувача
    static generateUsername(prefix = "user") {
        let username;
        let counter = 0;
        
        do {
            const random = Math.random().toString(36).substring(2, 8);
            username = `${prefix}_${random}`;
            counter++;
            
            if (counter > 100) {
                throw new Error("Не вдалося згенерувати унікальне ім'я користувача");
            }
        } while (TestDataGenerator.usedUsernames.has(username));
        
        TestDataGenerator.usedUsernames.add(username);
        return username;
    }

    // Статичний метод для генерації тестового користувача
    static generateUser(overrides = {}) {
        return {
            username: overrides.username || TestDataGenerator.generateUsername(),
            email: overrides.email || TestDataGenerator.generateEmail(),
            password: overrides.password || "TestPassword123!",
            firstName: overrides.firstName || "Тест",
            lastName: overrides.lastName || "Користувач",
            ...overrides
        };
    }

    // Статичний метод для очищення використаних значень
    static reset() {
        TestDataGenerator.usedEmails.clear();
        TestDataGenerator.usedUsernames.clear();
    }

    // Статичний метод для генерації випадкового числа в діапазоні
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Статичний метод для генерації випадкового рядка
    static randomString(length = 10) {
        return Math.random().toString(36).substring(2, 2 + length);
    }
}

// Використання статичних методів для генерації тестових даних
const user1 = TestDataGenerator.generateUser();
const user2 = TestDataGenerator.generateUser({ firstName: "Іван" });
const user3 = TestDataGenerator.generateUser();

console.log(user1);
// { username: 'user_abc123', email: 'user_xyz789@test.com', ... }

console.log(user2);
// { username: 'user_def456', email: 'user_uvw012@test.com', firstName: 'Іван', ... }

// Генерація окремих значень
const email = TestDataGenerator.generateEmail("test");
const username = TestDataGenerator.generateUsername("admin");
const randomNum = TestDataGenerator.randomInt(1, 100);
const randomStr = TestDataGenerator.randomString(15);

console.log(email);      // test_abc123@test.com
console.log(username);   // admin_xyz789
console.log(randomNum);  // Випадкове число від 1 до 100
console.log(randomStr);  // Випадковий рядок довжиною 15

// Очищення використаних значень
TestDataGenerator.reset();

// ============================================
// КЛЮЧОВІ МОМЕНТИ:
// ============================================
// 1. Статичні методи та властивості належать класу, а не екземплярам
// 2. Статичні члени викликаються через ім'я класу (ClassName.method())
// 3. Статичні методи не мають доступу до this (не можуть використовувати властивості екземплярів)
// 4. Статичні властивості спільні для всіх екземплярів класу
// 5. Статичні методи корисні для утилітарних функцій та фабричних методів
// 6. Статичні константи зручні для зберігання значень, пов'язаних з класом
// 7. Статичні методи можуть викликати інші статичні методи через ім'я класу

