const person = {
  firstName: 'John',
  lastName: 'Johnson',
  age: 28,
};
// add new property
person.email = 'jj@gmail.com';
// delete property
delete person.age;

console.log(person);
