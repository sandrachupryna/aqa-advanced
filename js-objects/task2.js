const book = {
  title: 'Alice in Wonderland',
  author: 'Lewis Carroll',
  year: 1865,
};
// destructure the object properties into variables with different names
const { title: bookTitle, author, year: yearPublished } = book;
console.log(bookTitle);
console.log(author);
console.log(yearPublished);
