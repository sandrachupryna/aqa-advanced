/**
 * МОДИФІКАТОРИ ДОСТУПУ В JAVASCRIPT
 * 
 * Модифікатори доступу контролюють, хто може отримати доступ до властивостей та методів класу.
 * 
 * В JavaScript (до ES2022):
 * - Публічні (public) - доступні всюди (за замовчуванням)
 * - Захищені (protected) - конвенція з підкресленням (_)
 * - Приватні (private) - конвенція з подвійним підкресленням (__) або символ #
 * 
 * З ES2022+ JavaScript підтримує справжні приватні поля та методи через символ #
 */

// ============================================
// ПРИКЛАД 1: Публічні властивості та методи
// ============================================

/**
 * Публічні члени доступні всюди:
 * - В самому класі
 * - В дочірніх класах
 * - Ззовні класу
 */
class PublicExample {
    constructor(name) {
        // Публічна властивість - доступна всюди
        this.name = name;
        this.publicProperty = "Це публічна властивість";
    }

    // Публічний метод - доступний всюди
    publicMethod() {
        return `Публічний метод: ${this.name}`;
    }

    // Публічний метод може використовувати публічні властивості
    getName() {
        return this.name;
    }
}

const publicObj = new PublicExample("Тест");
console.log(publicObj.name);              // Тест - доступ до публічної властивості
console.log(publicObj.publicProperty);    // Це публічна властивість
console.log(publicObj.publicMethod());     // Публічний метод: Тест
console.log(publicObj.getName());         // Тест

// ============================================
// ПРИКЛАД 2: Захищені властивості (конвенція _)
// ============================================

/**
 * Захищені члени (конвенція з підкресленням _):
 * - Технічно доступні всюди, але конвенція вказує, що їх не слід використовувати ззовні
 * - Призначені для використання в класі та дочірніх класах
 */
class BankAccount {
    constructor(owner, balance = 0) {
        // Публічна властивість
        this.owner = owner;
        
        // Захищена властивість (конвенція) - не слід змінювати напряму ззовні
        this._balance = balance;
        
        // Захищена властивість для історії транзакцій
        this._transactionHistory = [];
    }

    // Публічний метод для отримання балансу
    getBalance() {
        return this._balance;
    }

    // Публічний метод для поповнення
    deposit(amount) {
        if (amount > 0) {
            this._balance += amount;
            this._addTransaction('deposit', amount);
            return true;
        }
        return false;
    }

    // Публічний метод для зняття
    withdraw(amount) {
        if (amount > 0 && amount <= this._balance) {
            this._balance -= amount;
            this._addTransaction('withdraw', amount);
            return true;
        }
        return false;
    }

    // Захищений метод (конвенція) - для внутрішнього використання
    _addTransaction(type, amount) {
        this._transactionHistory.push({
            type: type,
            amount: amount,
            date: new Date()
        });
    }

    // Публічний метод для отримання історії
    getTransactionHistory() {
        // Повертаємо копію, щоб не можна було змінити оригінал ззовні
        return [...this._transactionHistory];
    }
}

const account = new BankAccount("Іван", 1000);
console.log(account.getBalance());  // 1000

// Технічно можна отримати доступ до захищеної властивості, але це не рекомендується
console.log(account._balance);  // 1000 - працює, але не рекомендується

account.deposit(500);
console.log(account.getBalance());  // 1500

// ============================================
// ПРИКЛАД 3: Приватні поля та методи (ES2022+)
// ============================================

/**
 * Приватні члени (символ #):
 * - Справжня приватність - недоступні ззовні класу
 * - Доступні тільки всередині самого класу
 * - Не можуть бути успадковані дочірніми класами
 */
class SecureBankAccount {
    // Приватні поля оголошуються поза конструктором
    #balance = 0;
    #transactionHistory = [];
    #accountNumber;

    constructor(owner, initialBalance = 0) {
        // Публічна властивість
        this.owner = owner;
        
        // Приватна властивість
        this.#balance = initialBalance;
        this.#accountNumber = this.#generateAccountNumber();
    }

    // Публічний метод для отримання балансу
    getBalance() {
        return this.#balance;
    }

    // Публічний метод для поповнення
    deposit(amount) {
        if (this.#validateAmount(amount)) {
            this.#balance += amount;
            this.#addTransaction('deposit', amount);
            return true;
        }
        return false;
    }

    // Публічний метод для зняття
    withdraw(amount) {
        if (this.#validateAmount(amount) && amount <= this.#balance) {
            this.#balance -= amount;
            this.#addTransaction('withdraw', amount);
            return true;
        }
        return false;
    }

    // Приватний метод для валідації суми
    #validateAmount(amount) {
        return amount > 0 && typeof amount === 'number';
    }

    // Приватний метод для додавання транзакції
    #addTransaction(type, amount) {
        this.#transactionHistory.push({
            type: type,
            amount: amount,
            date: new Date(),
            balance: this.#balance
        });
    }

    // Приватний метод для генерації номера рахунку
    #generateAccountNumber() {
        return 'ACC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Публічний метод для отримання номера рахунку
    getAccountNumber() {
        return this.#accountNumber;
    }

    // Публічний метод для отримання історії
    getTransactionHistory() {
        // Повертаємо копію приватного масиву
        return this.#transactionHistory.map(t => ({ ...t }));
    }
}

const secureAccount = new SecureBankAccount("Марія", 2000);
console.log(secureAccount.getBalance());        // 2000
console.log(secureAccount.getAccountNumber());  // ACC-...

// Спроба доступу до приватної властивості викличе помилку
// console.log(secureAccount.#balance);  // SyntaxError: Private field '#balance' must be declared in an enclosing class

secureAccount.deposit(300);
console.log(secureAccount.getBalance());  // 2300

// ============================================
// ПРИКЛАД 4: Порівняння публічних, захищених та приватних
// ============================================

class User {
    // Публічна властивість
    username = "";
    
    // Захищена властивість (конвенція)
    _email = "";
    _passwordHash = "";
    
    // Приватна властивість (ES2022+)
    #secretKey = "";
    #loginAttempts = 0;

    constructor(username, email, password) {
        this.username = username;
        this._email = email;
        this._passwordHash = this._hashPassword(password);
        this.#secretKey = this.#generateSecretKey();
    }

    // Публічний метод
    getUsername() {
        return this.username;
    }

    // Публічний метод
    getEmail() {
        return this._email;
    }

    // Захищений метод (конвенція) - для хешування пароля
    _hashPassword(password) {
        // Спрощена версія - в реальності використовуйте бібліотеки типу bcrypt
        return `hash_${password}_${Date.now()}`;
    }

    // Приватний метод для генерації секретного ключа
    #generateSecretKey() {
        return Math.random().toString(36).substr(2, 15);
    }

    // Публічний метод для перевірки пароля
    verifyPassword(password) {
        const hash = this._hashPassword(password);
        // Спрощена перевірка
        return hash.includes(password);
    }

    // Публічний метод для логіну
    login(password) {
        if (this.verifyPassword(password)) {
            this.#loginAttempts = 0;
            return true;
        } else {
            this.#loginAttempts++;
            return false;
        }
    }

    // Публічний метод для отримання кількості спроб (без доступу до приватного поля напряму)
    getLoginAttempts() {
        return this.#loginAttempts;
    }
}

const user = new User("john_doe", "john@example.com", "mypassword123");

// Доступ до публічних властивостей та методів
console.log(user.username);           // john_doe
console.log(user.getUsername());      // john_doe
console.log(user.getEmail());         // john@example.com

// Доступ до захищених властивостей (працює, але не рекомендується)
console.log(user._email);             // john@example.com - працює, але не рекомендується
console.log(user._passwordHash);      // hash_mypassword123_... - працює, але не рекомендується

// Спроба доступу до приватних властивостей викличе помилку
// console.log(user.#secretKey);      // SyntaxError
// console.log(user.#loginAttempts);  // SyntaxError

// Використання публічних методів
console.log(user.login("mypassword123"));  // true
console.log(user.getLoginAttempts());       // 0

// ============================================
// ПРИКЛАД 5: Практичне застосування для автоматизації тестування
// ============================================

/**
 * Клас для роботи з API в тестах
 * Демонструє використання різних модифікаторів доступу
 */
class ApiClient {
    // Публічні властивості
    baseUrl = "";
    
    // Захищені властивості (конвенція)
    _headers = {};
    _timeout = 5000;
    
    // Приватні властивості
    #requestCount = 0;
    #errorCount = 0;
    #lastRequestTime = null;

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this._headers = {
            'Content-Type': 'application/json'
        };
    }

    // Публічний метод для встановлення заголовків
    setHeader(key, value) {
        this._headers[key] = value;
    }

    // Публічний метод для GET запиту
    async get(endpoint) {
        return this.#makeRequest('GET', endpoint);
    }

    // Публічний метод для POST запиту
    async post(endpoint, data) {
        return this.#makeRequest('POST', endpoint, data);
    }

    // Приватний метод для виконання HTTP запитів
    async #makeRequest(method, endpoint, data = null) {
        this.#requestCount++;
        this.#lastRequestTime = new Date();

        try {
            const options = {
                method: method,
                headers: this._headers,
                timeout: this._timeout
            };

            if (data) {
                options.body = JSON.stringify(data);
            }

            // Спрощена версія - в реальності використовуйте fetch або axios
            console.log(`${method} ${this.baseUrl}${endpoint}`);
            // const response = await fetch(`${this.baseUrl}${endpoint}`, options);
            // return await response.json();
            
            return { success: true, method, endpoint };
        } catch (error) {
            this.#errorCount++;
            throw error;
        }
    }

    // Публічний метод для отримання статистики
    getStats() {
        return {
            requestCount: this.#requestCount,
            errorCount: this.#errorCount,
            lastRequestTime: this.#lastRequestTime
        };
    }

    // Публічний метод для скидання статистики
    resetStats() {
        this.#requestCount = 0;
        this.#errorCount = 0;
        this.#lastRequestTime = null;
    }
}

const apiClient = new ApiClient("https://api.example.com");
apiClient.setHeader('Authorization', 'Bearer token123');

// Використання публічних методів
apiClient.get('/users');
apiClient.post('/users', { name: 'John' });

// Отримання статистики
console.log(apiClient.getStats());
// { requestCount: 2, errorCount: 0, lastRequestTime: ... }

// Приватні методи недоступні ззовні
// apiClient.#makeRequest();  // SyntaxError

// ============================================
// КЛЮЧОВІ МОМЕНТИ:
// ============================================
// 1. Публічні члени доступні всюди (за замовчуванням)
// 2. Захищені члени (конвенція _) - технічно доступні, але не рекомендовані для прямого використання
// 3. Приватні члени (#) - справжня приватність, недоступні ззовні класу
// 4. Приватні поля та методи доступні тільки в самому класі
// 5. Використання модифікаторів доступу допомагає в інкапсуляції та захисті даних
// 6. Для автоматизації тестування приватні методи приховують деталі реалізації

