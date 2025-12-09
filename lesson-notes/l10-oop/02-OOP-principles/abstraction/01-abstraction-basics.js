/**
 * АБСТРАКЦІЯ В JAVASCRIPT
 * 
 * Абстракція - це спрощення складності шляхом визначення загальних
 * характеристик та поведінки об'єктів, приховуючи деталі реалізації.
 * 
 * Абстракція дозволяє:
 * - Фокусуватися на важливих аспектах об'єкта
 * - Приховувати складні деталі реалізації
 * - Створювати прості інтерфейси для складних систем
 * - Зменшувати складність коду
 */

// ============================================
// ПРИКЛАД 1: Абстракція через класи
// ============================================

/**
 * Абстрактний клас для транспортних засобів
 * В JavaScript немає справжніх абстрактних класів, але можна симулювати
 */
class Vehicle {
    constructor(brand, model) {
        if (this.constructor === Vehicle) {
            throw new Error("Не можна створити екземпляр абстрактного класу Vehicle");
        }
        this.brand = brand;
        this.model = model;
    }

    // Абстрактний метод - має бути перевизначений
    start() {
        throw new Error("Метод start() має бути перевизначений");
    }

    // Абстрактний метод
    stop() {
        throw new Error("Метод stop() має бути перевизначений");
    }

    // Конкретний метод - може бути використаний як є
    getInfo() {
        return `${this.brand} ${this.model}`;
    }
}

/**
 * Конкретна реалізація - автомобіль
 */
class Car extends Vehicle {
    constructor(brand, model) {
        super(brand, model);
        this.isRunning = false;
    }

    // Реалізація абстрактного методу
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            console.log(`${this.getInfo()} заведено`);
        }
    }

    // Реалізація абстрактного методу
    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            console.log(`${this.getInfo()} зупинено`);
        }
    }
}

/**
 * Конкретна реалізація - мотоцикл
 */
class Motorcycle extends Vehicle {
    constructor(brand, model) {
        super(brand, model);
        this.isRunning = false;
    }

    // Реалізація абстрактного методу
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            console.log(`${this.getInfo()} заведено (мотоцикл)`);
        }
    }

    // Реалізація абстрактного методу
    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            console.log(`${this.getInfo()} зупинено (мотоцикл)`);
        }
    }
}

// Використання
const car = new Car("Toyota", "Camry");
const motorcycle = new Motorcycle("Yamaha", "R1");

car.start();        // Toyota Camry заведено
motorcycle.start(); // Yamaha R1 заведено (мотоцикл)

// Спроба створити екземпляр абстрактного класу
// const vehicle = new Vehicle("Brand", "Model");  // Error

// ============================================
// ПРИКЛАД 2: Абстракція через приховування деталей
// ============================================

/**
 * Клас для роботи з файлами
 * Приховує складність роботи з файловою системою
 */
class FileManager {
    constructor() {
        // Приватні властивості - деталі реалізації приховані
        this.#files = new Map();
        this.#maxSize = 1000; // MB
    }

    #files = new Map();
    #maxSize = 1000;

    // Простий публічний інтерфейс
    saveFile(name, content) {
        // Складна логіка прихована всередині
        if (this.#checkSize(content)) {
            this.#files.set(name, {
                content: content,
                createdAt: new Date(),
                size: this.#calculateSize(content)
            });
            console.log(`Файл "${name}" збережено`);
            return true;
        } else {
            console.log("Файл занадто великий");
            return false;
        }
    }

    // Простий публічний інтерфейс
    getFile(name) {
        const file = this.#files.get(name);
        if (file) {
            return file.content;
        }
        return null;
    }

    // Простий публічний інтерфейс
    deleteFile(name) {
        if (this.#files.has(name)) {
            this.#files.delete(name);
            console.log(`Файл "${name}" видалено`);
            return true;
        }
        return false;
    }

    // Приватні методи - деталі реалізації
    #checkSize(content) {
        const size = this.#calculateSize(content);
        return size <= this.#maxSize;
    }

    #calculateSize(content) {
        // Спрощена версія - в реальності складніша логіка
        return content.length / 1024; // KB
    }

    // Публічний метод для отримання інформації (без деталей)
    getFileInfo(name) {
        const file = this.#files.get(name);
        if (file) {
            return {
                name: name,
                size: `${file.size.toFixed(2)} KB`,
                createdAt: file.createdAt.toISOString()
            };
        }
        return null;
    }
}

// Використання - користувач не знає про внутрішню реалізацію
const fileManager = new FileManager();
fileManager.saveFile("test.txt", "Привіт, світ!");
const content = fileManager.getFile("test.txt");
console.log(content);  // Привіт, світ!

const info = fileManager.getFileInfo("test.txt");
console.log(info);
// { name: 'test.txt', size: '0.01 KB', createdAt: '...' }

// ============================================
// ПРИКЛАД 3: Абстракція для API клієнта
// ============================================

/**
 * Абстрактний клас для API клієнта
 * Приховує складність HTTP запитів
 */
class ApiClient {
    constructor(baseUrl) {
        if (this.constructor === ApiClient) {
            throw new Error("ApiClient є абстрактним класом");
        }
        this.baseUrl = baseUrl;
        this.#headers = {
            'Content-Type': 'application/json'
        };
    }

    #headers = {};

    // Абстрактний метод - має бути реалізований
    async request(method, endpoint, data = null) {
        throw new Error("Метод request() має бути реалізований");
    }

    // Конкретні методи використовують абстрактний request
    async get(endpoint) {
        return this.request('GET', endpoint);
    }

    async post(endpoint, data) {
        return this.request('POST', endpoint, data);
    }

    async put(endpoint, data) {
        return this.request('PUT', endpoint, data);
    }

    async delete(endpoint) {
        return this.request('DELETE', endpoint);
    }

    // Захищений метод для отримання заголовків
    _getHeaders() {
        return { ...this.#headers };
    }

    // Захищений метод для встановлення заголовків
    _setHeader(key, value) {
        this.#headers[key] = value;
    }
}

/**
 * Конкретна реалізація для fetch API
 */
class FetchApiClient extends ApiClient {
    async request(method, endpoint, data = null) {
        const options = {
            method: method,
            headers: this._getHeaders()
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        // Спрощена версія - в реальності більше обробки помилок
        console.log(`${method} ${this.baseUrl}${endpoint}`);
        // const response = await fetch(`${this.baseUrl}${endpoint}`, options);
        // return await response.json();
        
        return { success: true, method, endpoint, data };
    }
}

/**
 * Конкретна реалізація для axios (симуляція)
 */
class AxiosApiClient extends ApiClient {
    async request(method, endpoint, data = null) {
        // Спрощена версія - в реальності використовується axios
        console.log(`Axios: ${method} ${this.baseUrl}${endpoint}`);
        // const response = await axios({
        //     method: method,
        //     url: `${this.baseUrl}${endpoint}`,
        //     data: data
        // });
        // return response.data;
        
        return { success: true, method, endpoint, data };
    }
}

// Використання - однаковий інтерфейс для різних реалізацій
const fetchClient = new FetchApiClient("https://api.example.com");
const axiosClient = new AxiosApiClient("https://api.example.com");

// Однаковий спосіб використання
fetchClient.get("/users");
axiosClient.get("/users");

// ============================================
// ПРИКЛАД 4: Абстракція для автоматизації тестування
// ============================================

/**
 * Абстрактний клас для тестових кейсів
 * Приховує деталі виконання тестів
 */
class TestCase {
    constructor(name) {
        if (this.constructor === TestCase) {
            throw new Error("TestCase є абстрактним класом");
        }
        this.name = name;
    }

    // Абстрактні методи
    async setup() {
        throw new Error("Метод setup() має бути реалізований");
    }

    async execute() {
        throw new Error("Метод execute() має бути реалізований");
    }

    async teardown() {
        throw new Error("Метод teardown() має бути реалізований");
    }

    // Конкретний метод використовує абстрактні методи
    async run() {
        try {
            await this.setup();
            const result = await this.execute();
            console.log(`✓ Тест "${this.name}" пройдено`);
            return result;
        } catch (error) {
            console.log(`✗ Тест "${this.name}" не пройдено: ${error.message}`);
            throw error;
        } finally {
            await this.teardown();
        }
    }
}

/**
 * Конкретна реалізація для UI тестів
 */
class UiTestCase extends TestCase {
    constructor(name, page) {
        super(name);
        this.page = page;
    }

    async setup() {
        console.log(`Відкриття браузера для тесту "${this.name}"`);
        // Складна логіка відкриття браузера прихована
    }

    async execute() {
        console.log(`Виконання UI тесту на сторінці ${this.page}`);
        // Складна логіка тестування прихована
        return { passed: true };
    }

    async teardown() {
        console.log(`Закриття браузера`);
        // Складна логіка закриття прихована
    }
}

/**
 * Конкретна реалізація для API тестів
 */
class ApiTestCase extends TestCase {
    constructor(name, endpoint) {
        super(name);
        this.endpoint = endpoint;
    }

    async setup() {
        console.log(`Підготовка API тесту для ${this.endpoint}`);
        // Складна логіка підготовки прихована
    }

    async execute() {
        console.log(`Виконання API запиту до ${this.endpoint}`);
        // Складна логіка HTTP запитів прихована
        return { status: 200, data: {} };
    }

    async teardown() {
        console.log(`Очищення після API тесту`);
        // Складна логіка очищення прихована
    }
}

// Використання - простий інтерфейс, складність прихована
const uiTest = new UiTestCase("Тест логіну", "/login");
const apiTest = new ApiTestCase("Тест API", "/api/users");

// Однаковий спосіб запуску для різних типів тестів
// await uiTest.run();
// await apiTest.run();

// ============================================
// КЛЮЧОВІ МОМЕНТИ:
// ============================================
// 1. Абстракція спрощує складність, приховуючи деталі реалізації
// 2. Абстрактні класи визначають загальну структуру без конкретної реалізації
// 3. Публічний інтерфейс приховує складні внутрішні механізми
// 4. Абстракція дозволяє фокусуватися на важливих аспектах
// 5. Користувач класу не потребує знати про внутрішню реалізацію
// 6. Абстракція робить код більш читабельним та підтримуваним
// 7. В автоматизації тестування абстракція приховує деталі роботи з браузером/API

