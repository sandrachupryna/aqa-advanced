async function getToDo() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
    if (!response.ok) {
      throw new Error(
        `HTTP error, status: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching "todo" object:', error);
    throw error; // need this row for rejected status
  }
}

async function getUser() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users/1'
    );
    if (!response.ok) {
      throw new Error(
        `HTTP error, status: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching "user" object:', error);
    throw error; // need this row for rejected status
  }
}

const toDo = await getToDo(); // return resolved value, i.e. the fetched object toDo
const user = await getUser(); // return resolved value, i.e. the fetched object user

console.log('ToDo Object:', toDo);
console.log('User Object:', user);

const toDoPromise = getToDo(); // return a promise
const userPromise = getUser(); // return a promise

// To check result of both promises
const promiseCollectionSettled = Promise.allSettled([toDoPromise, userPromise]);
promiseCollectionSettled.then((x) => console.log('All Settled:', x));

const promiseCollectionAll = Promise.all([toDoPromise, userPromise]);
promiseCollectionAll
  .then((x) => console.log('Promise.All Resolved:', x))
  .catch((error) => console.error('Promise.All Rejected:', error));

const promiseCollectionRace = Promise.race([toDoPromise, userPromise]);
promiseCollectionRace
  .then((x) => console.log('Promise.Race Winner:', x))
  .catch((error) => console.error('Promise.Race Rejected:', error));
