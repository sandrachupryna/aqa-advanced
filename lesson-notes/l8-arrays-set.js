//Перевизначення елементів масиву
console.log('--Перевизначення елементів масиву--');
const animals = ['cat', 'dog', 'elephant'];
animals[1] = 'monkey';
console.log(animals); // Виведе ["cat", "monkey", "elephant"]

// Note: важливо звернути увагу, що ми можемо це робити, навіть якщо сам масив оголошений як const.
// Оскільки const гарантує, що змінна завжди буде посилатися на той самий об'єкт (масив), але не забороняє змінювати вміст цього об'єкта.
// Таким чином, можна навіть додавати або видаляти елементи з масиву, оголошеного як const.
const letters = [];
letters.push('a');
console.log(letters); // Виведе ["a"], хоча letters оголошено як const

// Багатовимірні масиви
console.log('--Багатовимірні масиви--');
const students = [
  ['Alice', 25, 'CS'],
  ['Bob', 22, 'Math'],
  ['Carol', 28, 'Physics'],
];

console.log(students[0][0]); // 'Alice'
console.log(students[1][2]); // 'Math'
console.log(students[2][1]); // 28

// Note: елементи масиву в JS можуть бути не обовʼязково однотипними.
// Вони можуть бути будь-якого типу, включаючи інші масиви, об'єкти, функції тощо.
console.log('--Різнотипні елементи масиву--');
const mixedArray = [
  42,
  'hello',
  [1, 2, 3],
  { key: 'value' },
  function () {
    return 'I am a function';
  },
];
console.log(mixedArray[2]); // Виведе [1, 2, 3]
console.log(mixedArray[3].key); // Виведе 'value'
console.log(mixedArray[4]()); // Виведе 'I am a function'

//Ітерація по масиву
console.log('--Ітерація по масиву--');
const fruits = ['apple', 'banana', 'cherry'];

// Використання циклу for
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Використання for...of
for (const fruit of fruits) {
  console.log(fruit);
}

// Використання forEach
fruits.forEach(function (fruit) {
  console.log(fruit);
});

// Використання стрілкової функції з forEach
fruits.forEach((fruit) => console.log(fruit));
// Note: for та for...of цикли підтримують break та continue, тоді як forEach ні.
// Note: for та for...of цикли підтримують асинхронні операції всередині тіла циклу, тоді як forEach не підтримує асинхронність належним чином.

// "Присвоєння за посиланням" та "Присвоєння за значенням"
console.log('--"Присвоєння за посиланням" та "Присвоєння за значенням"--');
// Присвоєння за значенням (примітивні типи)
let x = 10;
let y = x; // Значення копіюється
x = 20;
console.log(x); // 20
console.log(y); // 10
// Присвоєння за посиланням (об'єкти та масиви)
const originalArray = [1, 2, 3];
const referenceArray = originalArray; // Посилання на той самий масив у пам'яті
referenceArray[0] = 99;

console.log(originalArray); // Виведе [99, 2, 3]
console.log(referenceArray); // Виведе [99, 2, 3]
// Note: обидві змінні посилаються на той самий масив у пам'яті.

// Присвоєння за посиланням і за значення у функціях
console.log('--Присвоєння за посиланням і за значення у функціях--');
function modifyValues(primitive, obj) {
  primitive += 10; // Зміна примітивного типу (копія)
  obj.key = 'modified'; // Зміна об'єкта (посилання)
}

let num = 5;
let myObj = { key: 'original' };

modifyValues(num, myObj);

console.log(num); // Виведе 5 (примітивний тип не змінився)
console.log(myObj.key); // Виведе 'modified' (об'єкт був змінений)

//Методи масиву
console.log('--Методи масиву--');
// split та join
console.log('--split та join--');
const str = 'apple,banana,cherry';
const strArray = str.split(','); // Розділення рядка на масив
console.log(strArray); // Виведе ['apple', 'banana', 'cherry']

const joinedStr = strArray.join(' - '); // Об'єднання масиву в рядок
console.log(joinedStr); // Виведе 'apple - banana - cherry'

//indexOf та includes
console.log('--indexOf та includes--');
const colors = ['red', 'green', 'blue'];
console.log(colors.indexOf('green')); // Виведе 1
console.log(colors.includes('blue')); // Виведе true
console.log(colors.includes('yellow')); // Виведе false

//push, pop, shift, unshift
console.log('--push, pop, shift, unshift--');
const numbers = [1, 2, 3];
numbers.push(4); // Додає 4 в кінець
numbers.push(5, 6, 7); // Додає  кілька елементів (5, 6, 7) в кінець
console.log(numbers); // Виведе [1, 2, 3, 4, 5, 6, 7]

const lastElement = numbers.pop(); // Видаляє останній елемент і повертає його значення
console.log(lastElement); // Виведе 7
console.log(numbers); // Виведе [1, 2, 3, 4, 5, 6]

const firstElement = numbers.shift(); // Видаляє перший елемент і повертає його значення
console.log(firstElement); // Виведе 1
console.log(numbers); // Виведе [2, 3, 4, 5, 6]

numbers.unshift(0); // Додає 0 на початок масиву
numbers.unshift(-2, -1); // Додає кілька елементів (-2, -1) на початок масиву
console.log(numbers); // Виведе [-2, -1, 0, 2, 3, 4, 5, 6]

//slice - створює новий масив (!), копіюючи частину існуючого масиву
console.log('--slice--');
const sampleArray = ['a', 'b', 'c', 'd', 'e'];
const oneSlicedArr = sampleArray.slice(2); // Витягує елементи з індексу 2 до кінця
const twoSlicedArr = sampleArray.slice(1, 4); // Витягує елементи з індексами від 1 до 3 (4 не включно)
console.log(oneSlicedArr); // Виведе ['c', 'd', 'e']
console.log(twoSlicedArr); // Виведе ['b', 'c', 'd']'

//splice - змінює вміст масиву, видаляючи або замінюючи існуючі елементи та/або додаючи нові
console.log('--splice--');
// Додаємо елементи
const spliceArray = ['x', 'y', 'z'];
spliceArray.splice(1, 0, 'a', 'b'); // На індексі 1 видаляємо 0 елементів і додаємо 'a' та 'b'
console.log(spliceArray); // Виведе ['x', 'a', 'b', 'y', 'z']

// Видаляємо елементи
spliceArray.splice(2, 2); // На індексі 2 видаляємо 2 елементи
console.log(spliceArray); // Виведе ['x', 'a', 'z']

// Замінюємо елементи
spliceArray.splice(1, 1, 'new'); // На індексі 1 видаляємо 1 елемент і додаємо 'new'
console.log(spliceArray); // Виведе ['x', 'new', 'z']

console.log('--concat та reverse--');
//concat - об'єднує два або більше масивів у новий масив
const array1 = [1, 2];
const array2 = [3, 4];
const combinedArray = array1.concat(array2, [5, 6]); // Об'єднуємо array1, array2 та ще один масив
console.log(combinedArray); // Виведе [1, 2, 3, 4, 5, 6]

//reverse - змінює порядок елементів масиву на зворотний
const revArray = [1, 2, 3, 4, 5];
revArray.reverse();
console.log(revArray); // Виведе [5, 4, 3, 2, 1]

// some та every
console.log('--some та every--');
const nums = [1, 2, 3, 4, 5];
const hasEven = nums.some((num) => num % 2 === 0); // Перевіряє, чи є хоча б один парний елемент
const allPositive = nums.every((num) => num > 0); // Перевіряє, чи всі елементи позитивні

console.log(hasEven); // Виведе true
console.log(allPositive); // Виведе true

// sort - сортує елементи масиву
console.log('--sort--');
const unsortedArray = [5, 2, 9, 1, 5, 6];
unsortedArray.sort(); // Сортує за замовчуванням (лексикографічно)
console.log(unsortedArray); // Виведе [1, 2, 5, 5, 6, 9]

// Сортування з власною функцією порівняння (числове сортування)
// compareFn - Function used to determine the order of the elements.
// It is expected to return a negative value if the first argument is less than the second argument,
// zero if they're equal, and a positive value otherwise.
// If omitted, the elements are sorted in ascending, UTF-16 code unit order. (previous example)
const numArray = [40, 1, 5, 200];
numArray.sort((a, b) => a - b); // Сортує за зростанням, функція (a, b) => a - b задовільняє умови для compareFn
console.log(numArray); // Виведе [1, 5, 40, 200]
numArray.sort((a, b) => b - a); // Сортує за спаданням
console.log(numArray); // Виведе [200, 40, 5, 1]

// compareFn можна також написати кастомною функцією
const data = [
  { lastLoginAt: 1638405600, name: 'Bob' },
  { lastLoginAt: 1637299200, name: 'Alice' },
  { lastLoginAt: 1638387200, name: 'Charlie' },
];

// Функція сортування - compareFn
function sortByDateUnix(field) {
  return (a, b) => {
    if (a[field] < b[field]) {
      return -1;
    }
    if (a[field] > b[field]) {
      return 1;
    }
    return 0;
  };
}

data.sort(sortByDateUnix('lastLoginAt')); // Сортування за полем 'field' у порядку зростання
console.log(data);

// forEach - виконує функцію для кожного елемента масиву
console.log('--forEach--');
const forEachArray = [1, 2, 3, 4, 5];
forEachArray.forEach((num) => {
  console.log(num * 2); // Виведе подвоєні значення елементів
});
console.log(forEachArray); // Виведе оригінальний масив [1, 2, 3, 4, 5]

console.log('--forEach з index--');
forEachArray.forEach((num, index) => {
  console.log(`Індекс: ${index}, Значення: ${num}`);
});

// map - створює новий масив, застосовуючи функцію до кожного елемента
console.log('--map--');
const mappedArray = forEachArray.map((num) => num * 3); // Створює новий масив з потроєними значеннями
console.log(mappedArray); // Виведе [3, 6, 9, 12, 15]
console.log(forEachArray); // Виведе оригінальний масив [1, 2, 3, 4, 5]

// filter - створює новий масив з елементів, які задовольняють умову
console.log('--filter--');
const filteredArray = forEachArray.filter((num) => num % 2 !== 0); // Створює новий масив з непарних чисел
console.log(filteredArray); // Виведе [1, 3, 5]
console.log(forEachArray);

//find and findIndex
console.log('--find and findIndex--');
const findArray = [10, 15, 20, 25, 30];
const foundElement = findArray.find((num) => num > 18); // Знаходить перший елемент більший за 18
const foundIndex = findArray.findIndex((num) => num > 13); // Знаходить індекс першого елемента більшого за 13

console.log(foundElement); // Виведе 20
console.log(foundIndex); // Виведе 1

//flat та flatMap
console.log('--flat та flatMap--');
const nestedArray = [1, 2, [3, 4], [5, 6, [7, 8]]];
const flatOneLevel = nestedArray.flat(); // Розгортання на 1 рівень
console.log(flatOneLevel); // Виведе [1, 2, 3, 4, 5, 6, [7, 8]]
const flatTwoLevels = nestedArray.flat(2); // Розгортання на 2 рівні
console.log(flatTwoLevels); // Виведе [1, 2, 3, 4, 5, 6, 7, 8]

const arrayForFlatMap = [1, 2, 3];
const flatMappedArray = arrayForFlatMap.flatMap((num) => [num, num * 2]); // Кожен елемент перетворюється на масив з двох елементів
console.log(flatMappedArray); // Виведе [1, 2, 2, 4, 3, 6]

//reduce
console.log('--reduce--');
const reduceArray = [1, 2, 3, 4, 5];
const sum = reduceArray.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
); // Обчислення суми елементів, 0 - початкове значення акумулятора
console.log(sum); // Виведе 15
const product = reduceArray.reduce(
  (accumulator, currentValue) => accumulator * currentValue,
  1
); // Обчислення добутку елементів, 1 - початкове значення акумулятора
console.log(product); // Виведе 120

//Копіювання масивів
console.log('--Копіювання масивів--');
const original = [100, 2, 3, 4, 5];

// Використання методу slice()
const copyWithSlice = original.slice();
original[0] = 99; // Змінимо оригінальний масив, щоб показати, що копія не змінюється
console.log(copyWithSlice); // Виведе [100, 2, 3, 4, 5]

// Використання методу concat()
const copyWithConcat = original.concat();
original[0] = 98; // Змінимо оригінальний масив, щоб показати, що копія не змінюється
console.log(copyWithConcat); // Виведе [99, 2, 3, 4, 5]

// Використання оператора розпилення (spread operator)
const copyWithSpread = [...original];
original[0] = 97; // Змінимо оригінальний масив, щоб показати, що копія не змінюється
console.log(copyWithSpread); // Виведе [98, 2, 3, 4, 5]

// Використання методу Array.from()
const copyWithArrayFrom = Array.from(original);
original[0] = 96; // Змінимо оригінальний масив, щоб показати, що копія не змінюється
console.log(copyWithArrayFrom); // Виведе [97, 2, 3, 4, 5]
// Note: всі ці методи створюють поверхневу копію масиву.
// Тобто, якщо масив містить об'єкти чи інші змінні об'єктного типу, вони будуть посилатися на ті ж об'єкти у пам'яті.

// Note: Глибоке копіювання масивів необхідне, коли масив містить вкладені масиви або об'єкти,
// і ви хочете створити повністю незалежну копію цих вкладених структур.

console.log('--Spread operator--');
// Spread operator - розділяє ітерабельні об'єкти на окремі елементи.
// Часто використовується для arrays, sets, dictionaries (objects) тощо.
const arrayA = [1, 2, 3];
const arrayB = [4, 5, 6];

// Об'єднання масивів
const combined = [...arrayA, ...arrayB];
console.log(combined); // Виведе [1, 2, 3, 4, 5, 6]

// Копіювання масиву
const copiedArray = [...arrayA];
console.log(copiedArray); // Виведе [1, 2, 3]

// Використання у функціях
function sumThreeNumbers(a, b, c) {
  return a + b + c;
}
const numbersToSum = [10, 20, 30];
const total = sumThreeNumbers(...numbersToSum);
console.log(total); // Виведе 60

//Set - колекція унікальних значень
console.log('--Set--');
const mySet = new Set();
mySet.add(1);
mySet.add(5);
mySet.add(5); // Дублікати ігноруються
mySet.add('hello');
mySet.add({ a: 1, b: 2 });

console.log(mySet.has(1)); // Виведе true
console.log(mySet.has(3)); // Виведе false

mySet.delete(5);
console.log(mySet.size); // Виведе 3

mySet.forEach((value) => {
  console.log(value);
});

// Видалення дублікатів з масиву за допомогою Set
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(arrayWithDuplicates)];
console.log(uniqueArray); // Виведе [1, 2, 3, 4, 5]

// Перетин множин за допомогою Set
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

const intersection = new Set([...setA].filter((x) => setB.has(x)));
console.log(intersection); // Виведе Set { 3, 4 }

// Об'єднання множин за допомогою Set
const union = new Set([...setA, ...setB]);
console.log(union); // Виведе Set { 1, 2, 3, 4, 5, 6 }

// Різниця множин за допомогою Set: A \ B
const difference = new Set([...setA].filter((x) => !setB.has(x)));
console.log(difference); // Виведе Set { 1, 2 }
