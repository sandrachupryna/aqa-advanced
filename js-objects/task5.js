function User(name, email, age, status) {
  this.name = name;
  this.email = email;
  this.age = age;
  this.status = status;
}

const users = [
  new User('John Johnson', 'jj@gmail.com', 28, 'online'),
  new User('Dick Dickson', 'dd@gmail.com', 33, 'offline'),
  new User('Nick Nickson', 'nn@gmail.com', 64, 'deactivated'),
];

for (const { name, email, age, status } of users) {
  console.log(
    `It's the ${status} user named ${name}, ${age} years old, with the email address "${email}"`
  );
}
