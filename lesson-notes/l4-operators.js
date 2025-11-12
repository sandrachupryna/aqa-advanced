/// Префіксний та постфіксний інкремент/декремент
let counter1 = 1;
let a1 = ++counter1; //first counter++, then a = new value of counter  
console.log('Prefix increment:') 
console.log(counter1) // 2
console.log(a1); // 2

let counter2 = 1;
let a2 = counter2++; //first a = counter, then counter++
console.log('Postfix increment:') 
console.log(counter2) // 2
console.log(a2); // 1

/// Оператори порівняння
// При порівнянні значення різних типів, значення конвертуються в числа.
console.log("\nComparison operators:");
console.log( '2' > 1 ); // true, рядок '2' стає числом 2
console.log('' == false); // true
console.log('01' == 1); // true, рядок '01' стає числом 1

// Логічне значення true стає 1, а false — 0.
console.log(true == 1); // true  1 === 1
console.log(false == 0); // true 0 === 0

// Строге порівняння (тип і значення)
console.log('\nStrict comparison operators:');
console.log(0 === false); // false
console.log('' === false); // false
console.log('1' === 1); // false с початку було перевіренно тип string === number  на цьому етапі поріняння зупилось та результат поврнувся false 

// Особливі випадки порівняння з null та undefined
console.log('\nSpecial cases with null and undefined:');
console.log( null == undefined ); // true
console.log( null === undefined ); // false тому що ці значення різні, їхні типи різні.

// При арифметичних порівняннях >, <, >=, <= null/undefined конвертуються в числа:
// null стає 0, а undefined стає NaN.
console.log('\nArithmetic comparisons with null');
console.log(null > 0);  // false, 0 > 0
console.log(null >= 0); // true, 0 == 0
console.log(null == 0); // false, null == 0, null не конвертується в 0 при порівнянні на рівність

console.log('\nArithmetic comparisons with undefined:');
console.log(undefined > 0); // false, NaN > 0
console.log(undefined < 0); // false, NaN < 0
console.log(undefined == 0);// false NaN == 0

console.log('\nLogical operators:');
// Логічне АБО (OR) ||
console.log('\nLogical OR (||):');
console.log(1 || 0); // 1 (1 є першим правдивим значенням)
console.log(null || 1); // 1 (1 є першим правдивим значенням)
console.log(0 || null || undefined || 34 || 1) // 34 (34 є першим правдивим значенням)
console.log(null || 0 || "here" || 2); // "here" (перше правдиве значення)
console.log(undefined || 0 || null); // null (усі хибні, повертається останнє значення)

// Логічне І (AND) &&
console.log('\nLogical AND (&&):');
console.log(1 && 2); // 2 , усі значення правдиві, повертається останнє значення
console.log(null && 42); // null, перше хибне значення
console.log(34 && 0 && "test"); // 0
console.log(1 && 2 && null && 3); // null
console.log(1 && 2 && 3); // 3, останнє правдиве значення

// Логічне НЕ (!)
console.log('\nLogical NOT (!):');
console.log(!true); // false
console.log(!0); // true
console.log(!!"text"); // true; often used to convert a value to boolean
console.log(!!null); // false

console.log('\nDifference between || and ?? operators:');
// Оператор nullish coalescing (??) повертає перше значення, яке не є null або undefined.
console.log(null || 100); // 100, бо null є хибним значенням
console.log(null ?? 100); // 100, бо null є хибним значенням для оператора ??
console.log(undefined || 100); // 100, бо undefined є хибним значенням
console.log(undefined ?? 100); // 100, бо undefined є хибним значенням для оператора ??
console.log("" || 100); // 100, бо "" є хибним значенням
console.log("" ?? 100); // "", бо "" не є null або undefined
console.log(0 || 100); // 100
console.log(0 ?? 100); // 0, бо 0 не є null або undefined


/// Приклади неявного приведення типів
console.log('\nExamples of type coercion:');
console.log(5 + '10'); // "510" (рядок), конкатенація
console.log('5' + 10); // "510" (рядок), конкатенація
console.log('15' - 5); // 10 (число)
console.log(null + 10); // 10 (null стає 0)
console.log(true + 1); // 2 (true стає 1)
console.log(false + 1); // 1 (false стає 0)
console.log('5' * '4'); // 20 (обидва рядки стають числами)
console.log(true + ''); // "true" (рядок), true перетворюється на "true"
console.log(5 + undefined);  // NaN, undefined стає NaN при приведенні до числа
console.log(5 * false);  // 0
console.log("5" / false);  // Infinity



