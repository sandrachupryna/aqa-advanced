const intNumber = 10; 
// style - camelCase

let anotherNumber = 5;
let stringExample = "Hello, World!";
const booleanExample = true;
const nullExample = null;
let undefinedExample; //initialized but not assigned
const symbolExample1 = Symbol('id');
const symbolExample2 = Symbol('id');
const floatNumber = 10.5; // type = number (floating point)
let bigIntExample = 9007199254740991n; // BigInt literal




console.log(`The integer number is: ${intNumber}`);
console.log(`Another number is: ${anotherNumber}`);
anotherNumber += intNumber;
console.log(`The sum of both numbers is: ${anotherNumber}`);

anotherNumber = 'intNumber'; // string in JS could be in '', "" or ``
console.log(`The sum of both numbers is: ${anotherNumber}`);

const guestList = `guests:
- John
- Jane
- Doe`;

console.log(guestList); // backtick allows multi-line strings

// example of function
function multiplyNumbers(a = 'GET' | 'POST' | 'DELETE') {
    console.log(a);
}

multiplyNumbers('TEST'); //output 'TEST'

console.log('End of the test file.'.length); // show property, blue - property, purple - method
console.log('End of the test file.'.split(' ')); // show method with parameter
console.log('End of the test file.'.split(' ').join('_')); // chaining methods


"use strict"; // activate strict mode, linter - is library that checks code style and errors

const billion = 1e9;
const microsecond = 1e-6;

console.log(symbolExample1 === symbolExample2); // false, symbols are unique