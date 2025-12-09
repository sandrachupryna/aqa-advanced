/**
 * ПОРІВНЯННЯ КЛАСІВ ES6 ТА ПРОТОТИПІВ
 * 
 * Класи ES6 - це синтаксичний цукор над прототипною моделлю.
 * Під капотом класи працюють так само, як функції-конструктори з прототипами.
 * 
 * Важливо розуміти, що класи не вносять нову функціональність,
 * а лише надають більш зручний синтаксис.
 */

// ============================================
// ПРИКЛАД 1: Еквівалентність класів та прототипів
// ============================================

// Спосіб 1: Функція-конструктор (старий спосіб)
function OldStylePerson(name, age) {
    this.name = name;
    this.age = age;
}

OldStylePerson.prototype.greet = function() {
    return `Привіт! Мене звати ${this.name}, мені ${this.age} років`;
};

OldStylePerson.prototype.getInfo = function() {
    return `${this.name}, ${this.age} років`;
};

// Спосіб 2: Клас ES6 (новий спосіб)
class NewStylePerson {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `Привіт! Мене звати ${this.name}, мені ${this.age} років`;
    }

    getInfo() {
        return `${this.name}, ${this.age} років`;
    }
}

// Обидва способи створюють однакові об'єкти
const oldPerson = new OldStylePerson("Старий", 30);
const newPerson = new NewStylePerson("Новий", 25);

console.log(oldPerson.greet());  // Привіт! Мене звати Старий, мені 30 років
console.log(newPerson.greet());  // Привіт! Мене звати Новий, мені 25 років

// Перевірка еквівалентності
console.log(oldPerson.__proto__ === OldStylePerson.prototype);  // true
console.log(newPerson.__proto__ === NewStylePerson.prototype);    // true

// Обидва є функціями
console.log(typeof OldStylePerson);  // function
console.log(typeof NewStylePerson);   // function

// ============================================
// ПРИКЛАД 2: Наслідування - порівняння
// ============================================

// Спосіб 1: Наслідування через прототипи
function OldAnimal(name) {
    this.name = name;
}

OldAnimal.prototype.makeSound = function() {
    return `${this.name} видає звук`;
};

function OldDog(name, breed) {
    OldAnimal.call(this, name);
    this.breed = breed;
}

OldDog.prototype = Object.create(OldAnimal.prototype);
OldDog.prototype.constructor = OldDog;

OldDog.prototype.makeSound = function() {
    return `${this.name} гавкає: Гав-гав!`;
};

OldDog.prototype.fetch = function() {
    return `${this.name} приносить м'яч`;
};

// Спосіб 2: Наслідування через класи ES6
class NewAnimal {
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        return `${this.name} видає звук`;
    }
}

class NewDog extends NewAnimal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    makeSound() {
        return `${this.name} гавкає: Гав-гав!`;
    }

    fetch() {
        return `${this.name} приносить м'яч`;
    }
}

// Обидва способи працюють однаково
const oldDog = new OldDog("Рекс", "Лабрадор");
const newDog = new NewDog("Барсік", "Хаскі");

console.log(oldDog.makeSound());  // Рекс гавкає: Гав-гав!
console.log(newDog.makeSound());  // Барсік гавкає: Гав-гав!

// Перевірка прототипного ланцюжка
console.log(oldDog.__proto__ === OldDog.prototype);              // true
console.log(oldDog.__proto__.__proto__ === OldAnimal.prototype); // true

console.log(newDog.__proto__ === NewDog.prototype);              // true
console.log(newDog.__proto__.__proto__ === NewAnimal.prototype); // true

// ============================================
// ПРИКЛАД 3: Статичні методи
// ============================================

// Спосіб 1: Статичні методи через функції-конструктори
function OldMathHelper() {}

OldMathHelper.square = function(number) {
    return number * number;
};

OldMathHelper.cube = function(number) {
    return number * number * number;
};

// Спосіб 2: Статичні методи через класи
class NewMathHelper {
    static square(number) {
        return number * number;
    }

    static cube(number) {
        return number * number * number;
    }
}

// Обидва працюють однаково
console.log(OldMathHelper.square(5));  // 25
console.log(NewMathHelper.square(5));   // 25

// ============================================
// ПРИКЛАД 4: Геттери та сеттери
// ============================================

// Спосіб 1: Геттери та сеттери через Object.defineProperty
function OldTemperature() {
    this._celsius = 0;
}

Object.defineProperty(OldTemperature.prototype, 'celsius', {
    get: function() {
        return this._celsius;
    },
    set: function(value) {
        if (value < -273.15) {
            throw new Error("Температура не може бути нижче абсолютного нуля");
        }
        this._celsius = value;
    }
});

// Спосіб 2: Геттери та сеттери через класи
class NewTemperature {
    constructor() {
        this._celsius = 0;
    }

    get celsius() {
        return this._celsius;
    }

    set celsius(value) {
        if (value < -273.15) {
            throw new Error("Температура не може бути нижче абсолютного нуля");
        }
        this._celsius = value;
    }
}

// Обидва працюють однаково
const oldTemp = new OldTemperature();
const newTemp = new NewTemperature();

oldTemp.celsius = 25;
newTemp.celsius = 25;

console.log(oldTemp.celsius);  // 25
console.log(newTemp.celsius);   // 25

// ============================================
// ПРИКЛАД 5: Приватні поля (ES2022+)
// ============================================

// Спосіб 1: Приватні поля через замикання (старий спосіб)
function OldBankAccount(owner, balance) {
    this.owner = owner;
    
    // Приватна змінна через замикання
    let _balance = balance;
    
    this.getBalance = function() {
        return _balance;
    };
    
    this.deposit = function(amount) {
        if (amount > 0) {
            _balance += amount;
        }
    };
    
    this.withdraw = function(amount) {
        if (amount > 0 && amount <= _balance) {
            _balance -= amount;
        }
    };
}

// Спосіб 2: Приватні поля через класи (ES2022+)
class NewBankAccount {
    #balance = 0;

    constructor(owner, balance) {
        this.owner = owner;
        this.#balance = balance;
    }

    getBalance() {
        return this.#balance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
        }
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.#balance) {
            this.#balance -= amount;
        }
    }
}

// Обидва працюють однаково
const oldAccount = new OldBankAccount("Іван", 1000);
const newAccount = new NewBankAccount("Марія", 1000);

oldAccount.deposit(500);
newAccount.deposit(500);

console.log(oldAccount.getBalance());  // 1500
console.log(newAccount.getBalance());   // 1500

// ============================================
// ПРИКЛАД 6: Коли використовувати що
// ============================================

/**
 * Класи ES6 краще використовувати, коли:
 * - Потрібен сучасний, читабельний синтаксис
 * - Працюєте в команді, яка знайома з ООП
 * - Потрібна підтримка приватних полів (ES2022+)
 * - Потрібна підтримка статичних методів
 */

class ModernApiClient {
    #baseUrl = "";
    #headers = {};

    constructor(baseUrl) {
        this.#baseUrl = baseUrl;
    }

    static create(baseUrl) {
        return new ModernApiClient(baseUrl);
    }

    async get(endpoint) {
        console.log(`GET ${this.#baseUrl}${endpoint}`);
        return { success: true };
    }
}

/**
 * Прототипи краще використовувати, коли:
 * - Потрібна максимальна сумісність зі старим кодом
 * - Потрібна динамічна модифікація прототипів
 * - Працюєте з бібліотеками, які використовують прототипи
 */

function LegacyApiClient(baseUrl) {
    this.baseUrl = baseUrl;
    this.headers = {};
}

LegacyApiClient.prototype.get = function(endpoint) {
    console.log(`GET ${this.baseUrl}${endpoint}`);
    return { success: true };
};

// Динамічна модифікація прототипу
LegacyApiClient.prototype.post = function(endpoint, data) {
    console.log(`POST ${this.baseUrl}${endpoint}`, data);
    return { success: true };
};

// ============================================
// КЛЮЧОВІ МОМЕНТИ:
// ============================================
// 1. Класи ES6 - це синтаксичний цукор над прототипами
// 2. Під капотом класи працюють як функції-конструктори
// 3. Обидва способи створюють однакові об'єкти з прототипами
// 4. Класи надають більш читабельний та зручний синтаксис
// 5. Прототипи дають більше контролю та гнучкості
// 6. Вибір залежить від контексту та вимог проекту
// 7. Розуміння прототипів допомагає краще зрозуміти класи

