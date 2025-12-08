// Видалення ключів: 
// Імплементуйте функцію deleteKeys, яка приймає об'єкт та масив ключів. 
// Функція має повернути копію вхідного об'єкту без вказаних ключів.

function deleteKeys(obj, keys) {
    const newObj = {...obj};
    for (let key of keys){
        delete newObj[key];
    }
    return newObj;
}

console.log(deleteKeys({name: "John", age: 30, city: "New York"}, ["age", "city", "country"])); 

// Alternative solution: copying of object without destructurization, using for..of loop
function deleteKeys(obj, keys) {
    const resObj = {};
    for(let originalKey of Object.keys(obj)){
        if (!keys.includes(originalKey)){
            resObj[originalKey] = obj[originalKey];
        }
    }
    return resObj;
}

