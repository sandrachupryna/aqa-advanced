const intNumberVar = 11;
const floatNumberVar = 10.5;
const stringVar = "String example";
const booleanVar = false;
const nullVar = null;
let undefinedVar; // initialized but not assigned
const symbolVar = Symbol('s');
const bigIntVar = 11n; // BigInt literal

console.log(`The integer number example is: ${intNumberVar}, with type: ${typeof intNumberVar}`);
console.log(`The float number example is: ${floatNumberVar}, with type: ${typeof floatNumberVar}`);
console.log(`The string example is: ${stringVar}, with type: ${typeof stringVar}`);
console.log(`The boolean example is: ${booleanVar}, with type: ${typeof booleanVar}`);
console.log(`The null example is: ${nullVar}, with type: ${typeof nullVar}`);
console.log(`The undefined example is: ${undefinedVar}, with type: ${typeof undefinedVar}`);
console.log(`The symbol example is: ${symbolVar.toString()}, with type: ${typeof symbolVar}`);
console.log(`The bigInt example is: ${bigIntVar}, with type: ${typeof bigIntVar}`);

