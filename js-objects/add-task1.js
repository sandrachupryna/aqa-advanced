// Порівняння об'єктів: Імплементуйте функцію isObjectsEqual, яка порівнює два об'єкта і повертає true, 
// якщо вони мають однакові ключі та значення, і false в іншому випадку. 

// Примітка 1: В даній задачі об'єкти можуть мати лише властивості примітивних типів. 
// Жоден з об'єктів не містить методів 
// Примітка 2: В даній задачі якщо будь-яке значення є рядком то регістр слід ігнорувати. 
// Тобто "javaScript" та "JAVASCRIPT" слід вважати рівними значеннями.



function isObjectsEqual(obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length){
        return false;
    }
    for (let key of Object.keys(obj1)){
        if (!Object.keys(obj2).includes(key)){
            return false;
        }
    }
 
    for (let key of Object.keys(obj1)){
        if (typeof obj1[key] === "string" && typeof obj2[key] === "string"){
            if (obj1[key].toLowerCase() !== obj2[key].toLowerCase()){
                return false;
            }
        } else {
            if (obj1[key] !== obj2[key]){
                return false;
            }
        }
    }
    return true;
}

console.log(isObjectsEqual({name: "John", age: 30}, {age: 30, name: "john"})); // true
console.log(isObjectsEqual({name: "Alice", age: 25}, {name: "alice", age: 26})); // false
console.log(isObjectsEqual({city: "New York"}, {city: "new york", country: "USA"})); // false
console.log(isObjectsEqual({name: "Alice", age: 25}, {name: "alice", age: '26'})); // false



