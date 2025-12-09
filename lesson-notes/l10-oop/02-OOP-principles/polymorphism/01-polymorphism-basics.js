/**
 * ПОЛІМОРФІЗМ В JAVASCRIPT
 * 
 * Поліморфізм - це здатність об'єктів різних класів виконувати однакові дії,
 * але різними способами (різні реалізації).
 * 
 * Типи поліморфізму:
 * 1. Поліморфізм через перевизначення методів (Method Overriding)
 * 2. Поліморфізм через перевантаження (Method Overloading) - обмежено в JS
 * 3. Поліморфізм через інтерфейси (Duck Typing в JavaScript)
 */

// ============================================
// ПРИКЛАД 1: Поліморфізм через перевизначення методів
// ============================================

/**
 * Базовий клас Shape (Фігура)
 */
class Shape {
    constructor(name) {
        this.name = name;
    }

    // Метод, який буде перевизначений в дочірніх класах
    calculateArea() {
        return 0;
    }

    // Метод, який буде перевизначений
    draw() {
        return `Малюю ${this.name}`;
    }

    // Загальний метод, який використовує поліморфний метод
    getInfo() {
        return `${this.name}: площа = ${this.calculateArea()}`;
    }
}

/**
 * Клас Rectangle (Прямокутник)
 */
class Rectangle extends Shape {
    constructor(width, height) {
        super("Прямокутник");
        this.width = width;
        this.height = height;
    }

    // Перевизначення методу calculateArea
    calculateArea() {
        return this.width * this.height;
    }

    // Перевизначення методу draw
    draw() {
        return `Малюю прямокутник ${this.width}x${this.height}`;
    }
}

/**
 * Клас Circle (Коло)
 */
class Circle extends Shape {
    constructor(radius) {
        super("Коло");
        this.radius = radius;
    }

    // Перевизначення методу calculateArea з іншою формулою
    calculateArea() {
        return Math.PI * this.radius ** 2;
    }

    // Перевизначення методу draw
    draw() {
        return `Малюю коло з радіусом ${this.radius}`;
    }
}

/**
 * Клас Triangle (Трикутник)
 */
class Triangle extends Shape {
    constructor(base, height) {
        super("Трикутник");
        this.base = base;
        this.height = height;
    }

    // Перевизначення методу calculateArea з іншою формулою
    calculateArea() {
        return (this.base * this.height) / 2;
    }

    // Перевизначення методу draw
    draw() {
        return `Малюю трикутник з основою ${this.base} та висотою ${this.height}`;
    }
}

// Використання поліморфізму
const shapes = [
    new Rectangle(5, 10),
    new Circle(7),
    new Triangle(8, 6)
];

// Однаковий виклик методу для різних об'єктів
shapes.forEach(shape => {
    console.log(shape.draw());           // Різні реалізації
    console.log(shape.calculateArea());  // Різні обчислення
    console.log(shape.getInfo());        // Використовує поліморфний метод
    console.log("---");
});

// ============================================
// ПРИКЛАД 2: Поліморфізм через Duck Typing
// ============================================

/**
 * Duck Typing: "Якщо щось ходить як качка та крякає як качка,
 * то це, ймовірно, качка"
 * 
 * В JavaScript об'єкт визначається не за типом, а за наявністю методів
 */

// Функція, яка працює з будь-яким об'єктом, що має метод play()
function playMedia(media) {
    // Не перевіряємо тип, а тільки наявність методу
    if (typeof media.play === 'function') {
        return media.play();
    } else {
        throw new Error("Об'єкт не має методу play()");
    }
}

// Різні класи з однаковим методом play()
class AudioPlayer {
    constructor(track) {
        this.track = track;
    }

    play() {
        return `Відтворюю аудіо: ${this.track}`;
    }
}

class VideoPlayer {
    constructor(video) {
        this.video = video;
    }

    play() {
        return `Відтворюю відео: ${this.video}`;
    }
}

class StreamPlayer {
    constructor(url) {
        this.url = url;
    }

    play() {
        return `Відтворюю потік: ${this.url}`;
    }
}

// Всі об'єкти можуть використовуватися з функцією playMedia
const audio = new AudioPlayer("song.mp3");
const video = new VideoPlayer("movie.mp4");
const stream = new StreamPlayer("https://stream.example.com");

console.log(playMedia(audio));   // Відтворюю аудіо: song.mp3
console.log(playMedia(video));   // Відтворюю відео: movie.mp4
console.log(playMedia(stream));  // Відтворюю потік: https://stream.example.com

// ============================================
// ПРИКЛАД 3: Поліморфізм в обробці помилок
// ============================================

/**
 * Базовий клас для помилок
 */
class AppError {
    constructor(message) {
        this.message = message;
        this.timestamp = new Date();
    }

    // Поліморфний метод для обробки помилки
    handle() {
        return `Помилка: ${this.message}`;
    }

    // Поліморфний метод для логування
    log() {
        console.log(`[${this.timestamp.toISOString()}] ${this.handle()}`);
    }
}

/**
 * Клас для помилок валідації
 */
class ValidationError extends AppError {
    constructor(message, field) {
        super(message);
        this.field = field;
    }

    // Перевизначення методу handle
    handle() {
        return `Помилка валідації в полі "${this.field}": ${this.message}`;
    }
}

/**
 * Клас для помилок мережі
 */
class NetworkError extends AppError {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    // Перевизначення методу handle
    handle() {
        return `Мережева помилка (${this.statusCode}): ${this.message}`;
    }
}

/**
 * Клас для помилок бази даних
 */
class DatabaseError extends AppError {
    constructor(message, query) {
        super(message);
        this.query = query;
    }

    // Перевизначення методу handle
    handle() {
        return `Помилка бази даних: ${this.message}. Запит: ${this.query}`;
    }
}

// Функція для обробки різних типів помилок
function handleError(error) {
    // Однакова обробка для різних типів помилок
    error.log();
    return error.handle();
}

// Використання поліморфізму
const errors = [
    new ValidationError("Поле обов'язкове", "email"),
    new NetworkError("Не вдалося підключитися", 500),
    new DatabaseError("Таблиця не знайдена", "SELECT * FROM users")
];

errors.forEach(error => {
    console.log(handleError(error));
    console.log("---");
});

// ============================================
// ПРИКЛАД 4: Поліморфізм для автоматизації тестування
// ============================================

/**
 * Базовий клас для тестових кейсів
 */
class TestCase {
    constructor(name) {
        this.name = name;
    }

    // Поліморфний метод - буде перевизначений
    async setup() {
        console.log(`Налаштування тесту: ${this.name}`);
    }

    // Поліморфний метод - буде перевизначений
    async execute() {
        throw new Error("Метод execute() має бути перевизначений");
    }

    // Поліморфний метод - буде перевизначений
    async teardown() {
        console.log(`Очищення після тесту: ${this.name}`);
    }

    // Загальний метод, який використовує поліморфні методи
    async run() {
        try {
            await this.setup();
            await this.execute();
            console.log(`✓ Тест "${this.name}" пройдено`);
        } catch (error) {
            console.log(`✗ Тест "${this.name}" не пройдено: ${error.message}`);
        } finally {
            await this.teardown();
        }
    }
}

/**
 * Тест для API
 */
class ApiTest extends TestCase {
    constructor(name, endpoint) {
        super(name);
        this.endpoint = endpoint;
    }

    async setup() {
        await super.setup();
        console.log(`Підготовка API тесту для ${this.endpoint}`);
    }

    async execute() {
        console.log(`Виконання GET запиту до ${this.endpoint}`);
        // Симуляція API запиту
        return { status: 200, data: {} };
    }

    async teardown() {
        console.log(`Очищення після API тесту`);
        await super.teardown();
    }
}

/**
 * Тест для UI
 */
class UiTest extends TestCase {
    constructor(name, page) {
        super(name);
        this.page = page;
    }

    async setup() {
        await super.setup();
        console.log(`Відкриття сторінки ${this.page}`);
    }

    async execute() {
        console.log(`Перевірка елементів на сторінці ${this.page}`);
        // Симуляція UI тесту
        return true;
    }

    async teardown() {
        console.log(`Закриття браузера`);
        await super.teardown();
    }
}

/**
 * Тест для бази даних
 */
class DatabaseTest extends TestCase {
    constructor(name, query) {
        super(name);
        this.query = query;
    }

    async setup() {
        await super.setup();
        console.log(`Підключення до бази даних`);
    }

    async execute() {
        console.log(`Виконання запиту: ${this.query}`);
        // Симуляція запиту до БД
        return [];
    }

    async teardown() {
        console.log(`Закриття з'єднання з БД`);
        await super.teardown();
    }
}

// Використання поліморфізму - однаковий виклик для різних типів тестів
const tests = [
    new ApiTest("Тест API користувачів", "/api/users"),
    new UiTest("Тест сторінки логіну", "/login"),
    new DatabaseTest("Тест запиту користувачів", "SELECT * FROM users")
];

// Запуск всіх тестів однаковим способом
async function runAllTests() {
    for (const test of tests) {
        await test.run();
        console.log("---");
    }
}

// runAllTests();

// ============================================
// КЛЮЧОВІ МОМЕНТИ:
// ============================================
// 1. Поліморфізм дозволяє об'єктам різних класів виконувати однакові дії
// 2. Перевизначення методів - різні класи мають різні реалізації одного методу
// 3. Duck Typing - об'єкт визначається за наявністю методів, а не типом
// 4. Поліморфізм спрощує код та робить його більш гнучким
// 5. Один інтерфейс може працювати з різними реалізаціями
// 6. Поліморфізм особливо корисний для автоматизації тестування

