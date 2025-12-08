console.log(this); // undefined 


const person = {
  firstName: 'John',
  lastName: 'Doe',
  fullName: function() {
    return `${this.firstName} ${this.lastName}`;
  },

// Стрілочна функція не має власного this — вона використовує той самий this, що і функція, у якій її створено.
// У цьому прикладі стрілка всередині setTimeout бере this із функції printName(), 
// а та викликається як метод об'єкта person.
  printName: function() {
    setTimeout(() => {
      console.log(this.fullName());
      console.log(this); // Виведе об'єкт person
      console.log(this.firstName); // Виведе "John"
      console.log(this.lastName); // Виведе "Doe"
    }, 1000);
  }, 

  printNameTraditional: function() {
    setTimeout(function() { // Звичайна функція має власний this
    //   console.log(this.fullName()); // Викличе помилку 'this.fullName is not a function', оскільки this тут не є об'єктом person
      console.log(this); // Виведе oб'єкт NodeJS.Timeout 
      console.log(this.firstName); // Виведе undefined
      console.log(this.lastName); // Виведе undefined
    }, 1000); 
  }
};

person.printName(); // Виведе "John Doe" після затримки 1 секунда
person.printNameTraditional(); // Виведе "John Doe" одразу