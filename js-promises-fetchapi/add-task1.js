// Імплементуйте функцію checkNumber, яка перевіряє, чи передане число менше 10 і повертає Promise.
// Якщо число менше 10, функця має повернути Promise що вирішується успішно і повертає рядок "Success",
// в іншому випадку - Promise має бути відхилений та повернути інстанс класу Error з повідомленням"Failure"
function checkNumber(num) {
  return new Promise((resolve, reject) => {
    if (num < 10) {
      resolve('Success');
    } else {
      reject(new Error('Failure'));
    }
  });
}

checkNumber(5)
  .then((result) => console.log(`Result for 5: ${result}`)) // "Success"
  .catch((error) => console.error(`Error for 5: ${error.message}`));

checkNumber(15)
  .then((result) => console.log(`Result for 15: ${result}`))
  .catch((error) => console.error(`Error for 15: ${error.message}`)); // "Failure"
