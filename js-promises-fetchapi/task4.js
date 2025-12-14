class SendRequests {
    constructor(baseURL){
        this.baseURL = this.#validateURL(baseURL);
    }

    #validateURL(url) {
        try {
            new URL(url);
            return url.endsWith('/')?url = url.slice(0, -1):url;
        } catch (e) {
            throw new Error("Invalid URL");
        }
    }
}

class SendRequestWithThenCatch extends SendRequests{
    constructor(baseURL){
        super(baseURL);
    }
    #fetchData(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error, status: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error; 
            });
    }

    fetchDataTodos(id){
        return this.#fetchData(this.baseURL + '/todos/' + id);
    }

    fetchDataUsers(id){
        return this.#fetchData(this.baseURL + '/users/' + id);
    }
}

class SendRequestWithAsyncAwait extends SendRequests{
    constructor(baseURL){
        super(baseURL);
    }

    async #fetchData(url){
         try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error, status: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; 
        }
    }

    async fetchDataTodos(id){
        return this.#fetchData(this.baseURL + '/todos/' + id);
    }

    async fetchDataUsers(id){
        return this.#fetchData(this.baseURL + '/users/' + id);
    }
}

//Demonstration
const baseURL = 'https://jsonplaceholder.typicode.com/';

const requestWithThenCatch = new SendRequestWithThenCatch(baseURL);
const requestWithAsyncAwait = new SendRequestWithAsyncAwait(baseURL);


const promiseTodoThenCatch = requestWithThenCatch.fetchDataTodos(1);
const promiseUserThenCatch = requestWithThenCatch.fetchDataUsers(1);

const promiseTodoAsyncAwait = requestWithAsyncAwait.fetchDataTodos(3);
const promiseUserAsyncAwait = requestWithAsyncAwait.fetchDataUsers(3);

const promiseCollectionSettled =  Promise.allSettled([promiseTodoThenCatch, promiseUserThenCatch, promiseTodoAsyncAwait, promiseUserAsyncAwait]);
promiseCollectionSettled.then( x => console.log('All Settled:', x) );

const promiseCollectionAll =  Promise.all([promiseTodoThenCatch, promiseUserThenCatch, promiseTodoAsyncAwait, promiseUserAsyncAwait]);
promiseCollectionAll
    .then(x => console.log('Promise.All Resolved:', x))
    .catch(error => console.error('Promise.All Rejected:', error));

const promiseCollectionRace = Promise.race([promiseTodoThenCatch, promiseUserThenCatch, promiseTodoAsyncAwait, promiseUserAsyncAwait]);
promiseCollectionRace
    .then(x => console.log('Promise.Race Winner:', x))
    .catch(error => console.error('Promise.Race Rejected:', error));

