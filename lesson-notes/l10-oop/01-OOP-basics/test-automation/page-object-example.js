/**
 * ПРИКЛАД PAGE OBJECT MODEL (POM) ДЛЯ АВТОМАТИЗАЦІЇ ТЕСТУВАННЯ
 * 
 * Page Object Model - це патерн проектування, який використовує класи
 * для інкапсуляції логіки роботи з веб-сторінками.
 * 
 * Переваги:
 * - Інкапсуляція селекторів та методів
 * - Повторне використання коду
 * - Легше підтримувати та оновлювати
 * - Чистіші тести
 */

// ============================================
// ПРИКЛАД 1: Базовий Page Object
// ============================================

/**
 * Базовий клас для всіх сторінок
 * Містить загальні методи та властивості
 */
class BasePage {
    constructor(driver) {
        // Захищена властивість для драйвера браузера
        this._driver = driver;
        
        // Захищена властивість для базового URL
        this._baseUrl = "https://example.com";
    }

    // Захищений метод для очікування елемента
    async _waitForElement(selector, timeout = 5000) {
        // Спрощена версія - в реальності використовуйте методи драйвера
        console.log(`Очікування елемента: ${selector}`); //app-lesson-meeting div.lesson-meeting__actions>a
        return true;
    }

    // Публічний метод для відкриття сторінки
    async open(path = "") {
        const url = `${this._baseUrl}${path}`;
        console.log(`Відкриття сторінки: ${url}`);
        // await this._driver.get(url);
        return this;
    }

    // Публічний метод для отримання заголовка сторінки
    async getTitle() {
        // return await this._driver.getTitle();
        return "Приклад сторінки";
    }

    // Публічний метод для пошуку елемента
    async findElement(selector) {
        await this._waitForElement(selector);
        console.log(`Пошук елемента: ${selector}`);
        // return await this._driver.findElement(By.css(selector));
        return { selector, found: true };
    }
}

/**
 * Клас для сторінки логіну
 * Наслідується від BasePage та додає специфічні методи
 */
class LoginPage extends BasePage {
    constructor(driver) {
        super(driver);
        
        // Селектори елементів сторінки (інкапсульовані)
        this.selectors = {
            usernameInput: "#username",
            passwordInput: "#password",
            loginButton: "#login-button",
            errorMessage: ".error-message"
        };
    }

    // Метод для введення імені користувача
    async enterUsername(username) {
        const element = await this.findElement(this.selectors.usernameInput);
        console.log(`Введення імені користувача: ${username}`);
        // await element.sendKeys(username);
        return this;
    }

    // Метод для введення пароля
    async enterPassword(password) {
        const element = await this.findElement(this.selectors.passwordInput);
        console.log(`Введення пароля: ${password.replace(/./g, '*')}`);
        // await element.sendKeys(password);
        return this;
    }

    // Метод для натискання кнопки логіну
    async clickLoginButton() {
        const element = await this.findElement(this.selectors.loginButton);
        console.log("Натискання кнопки логіну");
        // await element.click();
        return this;
    }

    // Метод для виконання повного логіну
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
        return this;
    }

    // Метод для отримання повідомлення про помилку
    async getErrorMessage() {
        const element = await this.findElement(this.selectors.errorMessage);
        // return await element.getText();
        return "Невірний логін або пароль";
    }

    // Метод для перевірки, чи відображається повідомлення про помилку
    async isErrorMessageDisplayed() {
        try {
            const error = await this.getErrorMessage();
            return error.length > 0;
        } catch {
            return false;
        }
    }
}

// ============================================
// ПРИКЛАД 2: Page Object для сторінки профілю
// ============================================

class ProfilePage extends BasePage {
    constructor(driver) {
        super(driver);
        
        this.selectors = {
            profileName: ".profile-name",
            profileEmail: ".profile-email",
            editButton: "#edit-profile-button",
            saveButton: "#save-button",
            nameInput: "#name-input",
            emailInput: "#email-input"
        };
    }

    // Метод для отримання імені профілю
    async getProfileName() {
        const element = await this.findElement(this.selectors.profileName);
        // return await element.getText();
        return "Іван Іванов";
    }

    // Метод для отримання email профілю
    async getProfileEmail() {
        const element = await this.findElement(this.selectors.profileEmail);
        // return await element.getText();
        return "ivan@example.com";
    }

    // Метод для редагування профілю
    async editProfile(name, email) {
        await this.findElement(this.selectors.editButton);
        console.log("Натискання кнопки редагування");
        // await element.click();
        
        await this.findElement(this.selectors.nameInput);
        console.log(`Введення імені: ${name}`);
        // await element.clear();
        // await element.sendKeys(name);
        
        await this.findElement(this.selectors.emailInput);
        console.log(`Введення email: ${email}`);
        // await element.clear();
        // await element.sendKeys(email);
        
        await this.findElement(this.selectors.saveButton);
        console.log("Збереження змін");
        // await element.click();
        
        return this;
    }

    // Метод для отримання повної інформації профілю
    async getProfileInfo() {
        return {
            name: await this.getProfileName(),
            email: await this.getProfileEmail()
        };
    }
}

// ============================================
// ПРИКЛАД 3: Використання Page Objects у тестах
// ============================================

// Симуляція драйвера (в реальності це буде WebDriver, Playwright тощо)
const mockDriver = {};

// Створення екземплярів сторінок
const loginPage = new LoginPage(mockDriver);
const profilePage = new ProfilePage(mockDriver);

// Приклад тесту логіну
async function testLogin() {
    console.log("\n=== Тест логіну ===");
    
    // Відкриття сторінки логіну
    await loginPage.open("/login");
    
    // Виконання логіну
    await loginPage.login("testuser", "password123");
    
    // Перевірка успішного логіну (в реальності перевіряємо URL або елементи)
    const title = await loginPage.getTitle();
    console.log(`Заголовок сторінки: ${title}`);
}

// Приклад тесту невалідного логіну
async function testInvalidLogin() {
    console.log("\n=== Тест невалідного логіну ===");
    
    await loginPage.open("/login");
    await loginPage.login("wronguser", "wrongpassword");
    
    // Перевірка повідомлення про помилку
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    console.log(`Повідомлення про помилку відображається: ${isErrorDisplayed}`);
    
    if (isErrorDisplayed) {
        const errorMessage = await loginPage.getErrorMessage();
        console.log(`Текст помилки: ${errorMessage}`);
    }
}

// Приклад тесту редагування профілю
async function testEditProfile() {
    console.log("\n=== Тест редагування профілю ===");
    
    await profilePage.open("/profile");
    
    // Отримання поточної інформації
    const currentInfo = await profilePage.getProfileInfo();
    console.log("Поточна інформація:", currentInfo);
    
    // Редагування профілю
    await profilePage.editProfile("Петро Петров", "petro@example.com");
    
    // Перевірка оновленої інформації
    const updatedInfo = await profilePage.getProfileInfo();
    console.log("Оновлена інформація:", updatedInfo);
}

// Запуск тестів (в реальності це буде тестовий фреймворк)
// testLogin();
// testInvalidLogin();
// testEditProfile();

// ============================================
// ПРИКЛАД 4: Компонентний Page Object
// ============================================

/**
 * Клас для компонента навігації
 * Може бути використаний на різних сторінках
 */
class NavigationComponent {
    constructor(driver) {
        this._driver = driver;
        this.selectors = {
            homeLink: "a[href='/']",
            aboutLink: "a[href='/about']",
            contactLink: "a[href='/contact']",
            loginLink: "a[href='/login']"
        };
    }

    async clickHome() {
        console.log("Клік по посиланню 'Головна'");
        // await this._driver.findElement(By.css(this.selectors.homeLink)).click();
        return this;
    }

    async clickAbout() {
        console.log("Клік по посиланню 'Про нас'");
        return this;
    }

    async clickContact() {
        console.log("Клік по посиланню 'Контакти'");
        return this;
    }

    async clickLogin() {
        console.log("Клік по посиланню 'Логін'");
        return this;
    }
}

/**
 * Сторінка з використанням компонента
 */
class HomePage extends BasePage {
    constructor(driver) {
        super(driver);
        // Композиція - використання компонента
        this.navigation = new NavigationComponent(driver);
    }

    async open() {
        await super.open("/");
        return this;
    }

    async navigateToLogin() {
        await this.navigation.clickLogin();
        return new LoginPage(this._driver);
    }
}

// ============================================
// КЛЮЧОВІ МОМЕНТИ:
// ============================================
// 1. Page Object Model інкапсулює логіку роботи зі сторінками
// 2. Кожна сторінка має свій клас з методами та селекторами
// 3. Базовий клас містить загальну функціональність
// 4. Методи Page Object повертають this для ланцюжкових викликів
// 5. Компоненти можуть бути винесені в окремі класи
// 6. Тести стають більш читабельними та підтримуваними
// 7. Зміни в UI потребують оновлення тільки Page Object, а не тестів

