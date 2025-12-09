/**
 * ПРОТОТИПНЕ НАСЛІДУВАННЯ В АВТОМАТИЗАЦІЇ ТЕСТУВАННЯ
 * 
 * Розуміння прототипів важливе для автоматизації тестування, оскільки:
 * - Багато бібліотек використовують прототипи
 * - Дозволяє розширювати функціональність існуючих класів
 * - Допомагає створювати гнучкі тестові фреймворки
 */

// ============================================
// ПРИКЛАД 1: Розширення базового класу через прототипи
// ============================================

/**
 * Базовий клас для Page Object
 */
function BasePage(driver) {
    this.driver = driver;
    this.baseUrl = "https://example.com";
}

BasePage.prototype.open = function(path) {
    const url = `${this.baseUrl}${path}`;
    console.log(`Відкриття: ${url}`);
    return this;
};

BasePage.prototype.findElement = function(selector) {
    console.log(`Пошук елемента: ${selector}`);
    return { selector, found: true };
};

/**
 * Розширення через прототипне наслідування
 */
function LoginPage(driver) {
    BasePage.call(this, driver);
    this.selectors = {
        username: "#username",
        password: "#password",
        loginButton: "#login-button"
    };
}

// Наслідування
LoginPage.prototype = Object.create(BasePage.prototype);
LoginPage.prototype.constructor = LoginPage;

// Додавання методів
LoginPage.prototype.enterUsername = function(username) {
    this.findElement(this.selectors.username);
    console.log(`Введення імені користувача: ${username}`);
    return this;
};

LoginPage.prototype.enterPassword = function(password) {
    this.findElement(this.selectors.password);
    console.log(`Введення пароля`);
    return this;
};

LoginPage.prototype.clickLogin = function() {
    this.findElement(this.selectors.loginButton);
    console.log("Натискання кнопки логіну");
    return this;
};

LoginPage.prototype.login = function(username, password) {
    return this.enterUsername(username)
                .enterPassword(password)
                .clickLogin();
};

// Використання
const loginPage = new LoginPage({});
loginPage.open("/login")
         .login("user", "pass");

// ============================================
// ПРИКЛАД 2: Міксини через прототипи
// ============================================

/**
 * Міксин для логування
 */
const LoggingMixin = {
    log(message) {
        console.log(`[${new Date().toISOString()}] ${message}`);
    },
    
    logError(error) {
        console.error(`[ERROR] ${error.message}`);
    }
};

/**
 * Міксин для очікування
 */
const WaitingMixin = {
    async waitForElement(selector, timeout = 5000) {
        this.log(`Очікування елемента: ${selector}`);
        // Симуляція очікування
        await new Promise(resolve => setTimeout(resolve, 100));
        return this.findElement(selector);
    },
    
    async waitForPageLoad() {
        this.log("Очікування завантаження сторінки");
        await new Promise(resolve => setTimeout(resolve, 200));
    }
};

/**
 * Клас з міксинами
 */
function TestPage(driver) {
    BasePage.call(this, driver);
}

TestPage.prototype = Object.create(BasePage.prototype);
TestPage.prototype.constructor = TestPage;

// Додавання міксинів
Object.assign(TestPage.prototype, LoggingMixin, WaitingMixin);

const testPage = new TestPage({});
testPage.open("/test")
         .log("Тест запущено")
         .waitForPageLoad()
         .waitForElement("#test-element");

// ============================================
// ПРИКЛАД 3: Динамічне розширення прототипів
// ============================================

/**
 * Базовий клас для тестових утиліт
 */
function TestUtils() {
    this.results = [];
}

TestUtils.prototype.addResult = function(test, passed) {
    this.results.push({ test, passed, timestamp: new Date() });
};

TestUtils.prototype.getResults = function() {
    return this.results;
};

// Динамічне додавання методів до прототипу
TestUtils.prototype.generateReport = function() {
    const total = this.results.length;
    const passed = this.results.filter(r => r.passed).length;
    const failed = total - passed;
    
    return {
        total,
        passed,
        failed,
        successRate: ((passed / total) * 100).toFixed(2) + '%'
    };
};

// Додавання методу після створення класу
TestUtils.prototype.clearResults = function() {
    this.results = [];
};

const utils = new TestUtils();
utils.addResult("Тест 1", true);
utils.addResult("Тест 2", false);
utils.addResult("Тест 3", true);

console.log(utils.generateReport());
// { total: 3, passed: 2, failed: 1, successRate: '66.67%' }

// ============================================
// ПРИКЛАД 4: Прототипи для створення тестових даних
// ============================================

/**
 * Базовий клас для генерації тестових даних
 */
function DataGenerator() {
    this.usedValues = new Set();
}

DataGenerator.prototype.generateEmail = function(prefix = "user") {
    let email;
    do {
        const random = Math.random().toString(36).substring(2, 8);
        email = `${prefix}_${random}@test.com`;
    } while (this.usedValues.has(email));
    
    this.usedValues.add(email);
    return email;
};

DataGenerator.prototype.generateUsername = function(prefix = "user") {
    let username;
    do {
        const random = Math.random().toString(36).substring(2, 8);
        username = `${prefix}_${random}`;
    } while (this.usedValues.has(username));
    
    this.usedValues.add(username);
    return username;
};

/**
 * Розширення для конкретних типів даних
 */
function UserDataGenerator() {
    DataGenerator.call(this);
}

UserDataGenerator.prototype = Object.create(DataGenerator.prototype);
UserDataGenerator.prototype.constructor = UserDataGenerator;

UserDataGenerator.prototype.generateUser = function() {
    return {
        username: this.generateUsername(),
        email: this.generateEmail(),
        password: "TestPassword123!"
    };
};

const userGen = new UserDataGenerator();
const user1 = userGen.generateUser();
const user2 = userGen.generateUser();

console.log(user1);
console.log(user2);

// ============================================
// ПРИКЛАД 5: Прототипи для обробки помилок
// ============================================

/**
 * Базовий клас для помилок тестування
 */
function TestError(message, testName) {
    this.message = message;
    this.testName = testName;
    this.timestamp = new Date();
}

TestError.prototype.toString = function() {
    return `[${this.timestamp.toISOString()}] ${this.testName}: ${this.message}`;
};

TestError.prototype.log = function() {
    console.error(this.toString());
};

/**
 * Спеціалізовані типи помилок
 */
function AssertionError(message, testName, expected, actual) {
    TestError.call(this, message, testName);
    this.expected = expected;
    this.actual = actual;
}

AssertionError.prototype = Object.create(TestError.prototype);
AssertionError.prototype.constructor = AssertionError;

AssertionError.prototype.toString = function() {
    return `${TestError.prototype.toString.call(this)}\n` +
           `  Очікувалось: ${this.expected}\n` +
           `  Отримано: ${this.actual}`;
};

function TimeoutError(message, testName, timeout) {
    TestError.call(this, message, testName);
    this.timeout = timeout;
}

TimeoutError.prototype = Object.create(TestError.prototype);
TimeoutError.prototype.constructor = TimeoutError;

// Використання
const assertionError = new AssertionError(
    "Значення не співпадають",
    "testLogin",
    "success",
    "error"
);

const timeoutError = new TimeoutError(
    "Тест перевищив час очікування",
    "testApiCall",
    5000
);

assertionError.log();
timeoutError.log();

// ============================================
// КЛЮЧОВІ МОМЕНТИ:
// ============================================
// 1. Прототипи дозволяють розширювати існуючі класи
// 2. Міксини можна додавати через Object.assign()
// 3. Динамічне додавання методів до прототипу дає гнучкість
// 4. Прототипне наслідування корисне для створення ієрархій класів
// 5. Розуміння прототипів допомагає працювати з бібліотеками
// 6. Прототипи дозволяють створювати гнучкі тестові фреймворки

