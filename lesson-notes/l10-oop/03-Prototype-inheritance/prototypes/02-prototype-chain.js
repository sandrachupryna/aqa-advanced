/**
 * ПРОТОТИПНИЙ ЛАНЦЮЖОК В JAVASCRIPT
 * 
 * Прототипний ланцюжок - це механізм пошуку властивостей та методів.
 * Коли JavaScript шукає властивість або метод, він:
 * 1. Спочатку шукає в самому об'єкті
 * 2. Якщо не знайдено, шукає в прототипі об'єкта
 * 3. Якщо не знайдено, шукає в прототипі прототипу
 * 4. Продовжує до Object.prototype
 * 5. Якщо не знайдено, повертає undefined
 */

// ============================================
// ПРИКЛАД 1: Візуалізація прототипного ланцюжка
// ============================================

function Animal(name) {
    this.name = name;
}

Animal.prototype.makeSound = function() {
    return `${this.name} видає звук`;
};

function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
    return `${this.name} гавкає`;
};

const dog = new Dog("Рекс", "Лабрадор");

// Додамо власну властивість до об'єкта
dog.color = "Коричневий";

// Прототипний ланцюжок:
// dog -> Dog.prototype -> Animal.prototype -> Object.prototype -> null

console.log("=== Пошук властивостей ===");

// 1. color - знайдено в самому об'єкті dog
console.log(dog.color);  // Коричневий

// 2. breed - знайдено в самому об'єкті dog
console.log(dog.breed);  // Лабрадор

// 3. name - знайдено в самому об'єкті dog (через Animal.call)
console.log(dog.name);   // Рекс

// 4. bark() - знайдено в Dog.prototype
console.log(dog.bark());  // Рекс гавкає

// 5. makeSound() - знайдено в Animal.prototype (через ланцюжок)
console.log(dog.makeSound());  // Рекс видає звук

// 6. toString() - знайдено в Object.prototype (через ланцюжок)
console.log(dog.toString());  // [object Object]

// 7. Неіснуюча властивість - undefined
console.log(dog.nonExistent);  // undefined

// ============================================
// ПРИКЛАД 2: Перевірка прототипного ланцюжка
// ============================================

function checkPrototypeChain(obj, propertyName) {
    let current = obj;
    let level = 0;
    
    while (current !== null) {
        const levelName = level === 0 ? "Об'єкт" : 
                         level === 1 ? "Прототип 1" :
                         level === 2 ? "Прототип 2" :
                         "Прототип " + level;
        
        if (current.hasOwnProperty(propertyName)) {
            console.log(`✓ ${propertyName} знайдено в ${levelName}`);
            return true;
        } else {
            console.log(`✗ ${propertyName} не знайдено в ${levelName}`);
        }
        
        current = Object.getPrototypeOf(current);
        level++;
    }
    
    console.log(`✗ ${propertyName} не знайдено в ланцюжку`);
    return false;
}

console.log("\n=== Перевірка прототипного ланцюжка для dog.color ===");
checkPrototypeChain(dog, 'color');

console.log("\n=== Перевірка прототипного ланцюжка для dog.bark ===");
checkPrototypeChain(dog, 'bark');

console.log("\n=== Перевірка прототипного ланцюжка для dog.makeSound ===");
checkPrototypeChain(dog, 'makeSound');

// ============================================
// ПРИКЛАД 3: Перевизначення властивостей
// ============================================

function Parent() {
    this.value = "Батьківське значення";
}

Parent.prototype.method = function() {
    return "Батьківський метод";
};

function Child() {
    Parent.call(this);
    // Перевизначення властивості
    this.value = "Дочірнє значення";
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

// Перевизначення методу
Child.prototype.method = function() {
    return "Дочірній метод";
};

const child = new Child();

// value знаходиться в самому об'єкті (перевизначено)
console.log(child.value);  // Дочірнє значення

// method знаходиться в Child.prototype (перевизначено)
console.log(child.method());  // Дочірній метод

// Якщо видалити властивість з об'єкта, вона знайдеться в прототипі
delete child.value;
// Тепер value не знайдено в об'єкті, але це не спрацює для прототипу
// оскільки value була в самому об'єкті через Parent.call(this)

// ============================================
// ПРИКЛАД 4: hasOwnProperty vs in оператор
// ============================================

function Base() {
    this.ownProperty = "Власна властивість";
}

Base.prototype.inheritedProperty = "Успадкована властивість";

const obj = new Base();

// hasOwnProperty() - перевіряє тільки власні властивості об'єкта
console.log(obj.hasOwnProperty('ownProperty'));        // true
console.log(obj.hasOwnProperty('inheritedProperty'));   // false

// in оператор - перевіряє всю ланцюжок прототипів
console.log('ownProperty' in obj);        // true
console.log('inheritedProperty' in obj);  // true
console.log('nonExistent' in obj);        // false

// ============================================
// ПРИКЛАД 5: Object.prototype - кінець ланцюжка
// ============================================

// Всі об'єкти в JavaScript наслідують від Object.prototype
const simpleObj = {};

// Методи з Object.prototype доступні всім об'єктам
console.log(simpleObj.toString());        // [object Object]
console.log(simpleObj.hasOwnProperty);   // [Function: hasOwnProperty]
console.log(simpleObj.valueOf);          // [Function: valueOf]

// Перевірка прототипу
console.log(Object.getPrototypeOf(simpleObj) === Object.prototype);  // true
console.log(Object.getPrototypeOf(Object.prototype) === null);       // true

// Object.prototype - це кінець прототипного ланцюжка
// Його прототип - null

// ============================================
// ПРИКЛАД 6: Створення об'єкта без прототипу
// ============================================

// Створення об'єкта без прототипу (null)
const objWithoutPrototype = Object.create(null);

// Цей об'єкт не має методів з Object.prototype
console.log(objWithoutPrototype.toString);  // undefined
console.log(objWithoutPrototype.hasOwnProperty);  // undefined

// Додавання власних властивостей
objWithoutPrototype.name = "Тест";
objWithoutPrototype.getValue = function() {
    return this.name;
};

console.log(objWithoutPrototype.getValue());  // Тест

// Перевірка прототипу
console.log(Object.getPrototypeOf(objWithoutPrototype));  // null

// ============================================
// ПРИКЛАД 7: Практичне застосування для автоматизації
// ============================================

/**
 * Базовий клас для тестових утиліт
 */
function TestUtils() {
    this.timestamp = new Date();
}

TestUtils.prototype.log = function(message) {
    console.log(`[${this.timestamp.toISOString()}] ${message}`);
};

TestUtils.prototype.wait = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Розширений клас для API тестів
 */
function ApiTestUtils() {
    TestUtils.call(this);
    this.baseUrl = "";
}

ApiTestUtils.prototype = Object.create(TestUtils.prototype);
ApiTestUtils.prototype.constructor = ApiTestUtils;

ApiTestUtils.prototype.setBaseUrl = function(url) {
    this.baseUrl = url;
};

ApiTestUtils.prototype.request = function(endpoint) {
    this.log(`Запит до ${this.baseUrl}${endpoint}`);
    // Симуляція запиту
    return Promise.resolve({ status: 200 });
};

const apiUtils = new ApiTestUtils();
apiUtils.setBaseUrl("https://api.example.com");

// Використання методів з прототипного ланцюжка
apiUtils.log("Тест запущено");           // З TestUtils.prototype
await apiUtils.wait(1000);                // З TestUtils.prototype
await apiUtils.request("/users");         // З ApiTestUtils.prototype

// ============================================
// КЛЮЧОВІ МОМЕНТИ:
// ============================================
// 1. Прототипний ланцюжок - механізм пошуку властивостей
// 2. Пошук починається з об'єкта і йде вгору по ланцюжку
// 3. hasOwnProperty() перевіряє тільки власні властивості
// 4. in оператор перевіряє всю ланцюжок прототипів
// 5. Object.prototype - кінець ланцюжка (його прототип - null)
// 6. Можна створити об'єкт без прототипу через Object.create(null)
// 7. Перевизначення властивостей "закриває" властивості з прототипу

