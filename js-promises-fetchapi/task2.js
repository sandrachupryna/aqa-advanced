function getToDo(){
     return fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error, status: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching "todo" object:', error);
                throw error; // need this row for rejected status
            });
}

function getUser(){
    return fetch('https://jsonplaceholder.typicode.com/users/1')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error, status: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching "user" object:', error);
                throw error; // need this row for rejected status
            });
}

const toDoPromise = getToDo();
const userPromise = getUser();
// To check result of both promises
const promiseCollectionSettled =  Promise.allSettled([toDoPromise, userPromise]);
promiseCollectionSettled.then( x => console.log('All Settled:', x) );

const promiseCollectionAll =  Promise.all([toDoPromise, userPromise]);
promiseCollectionAll
    .then(x => console.log('Promise.All Resolved:', x))
    .catch(error => console.error('Promise.All Rejected:', error));

const promiseCollectionRace = Promise.race([toDoPromise, userPromise]);
promiseCollectionRace
    .then(x => console.log('Promise.Race Winner:', x))
    .catch(error => console.error('Promise.Race Winner Rejected:', error));


