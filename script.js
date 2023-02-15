// Class Definitions,
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Book.randomID();
  }

  static randomID() {
    const StoredBooks = JSON.parse(localStorage.getItem('books'));
    const id = Math.floor(Math.random() * 9999);
    if (id in StoredBooks) {
      Book.randomID();
    }

    return id;
  }
}

// Variable Declarations
const BookContainer = document.querySelector('.book-library');
const BookTitle = document.querySelector('.title');
const BookAuthor = document.querySelector('.author');
const AddButton = document.querySelector('.addBtn');

// Function Definitions
function getBooks() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = {};
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
}

const BookList = getBooks() ?? {};

function saveBooksToLocalStorage(book) {
  const BooksString = localStorage.getItem('books') ?? JSON.stringify({});
  const books = JSON.parse(BooksString);
  books[book.id] = book;
  localStorage.setItem('books', JSON.stringify(books));
}

function deleteBookFromLocalStorage(bookId) {
  const BooksString = localStorage.getItem('books') ?? JSON.stringify({});
  const books = JSON.parse(BooksString);
  if (books[bookId]) {
    delete books[bookId];
  }
  localStorage.setItem('books', JSON.stringify(books));
}

function deleteBookFromHTML(bookId) {
  const bookHTML = document.getElementById(bookId);
  if (bookHTML) {
    bookHTML.remove();
  }
}

function deleteBook(bookId) {
  deleteBookFromHTML(bookId);
  deleteBookFromLocalStorage(bookId);
}

function createBookDiv(book) {
  const BookDiv = document.createElement('div');
  const Title = document.createElement('p');
  const Author = document.createElement('p');
  const RemoveButton = document.createElement('button');

  Title.innerText = book.title;
  Author.innerText = book.author;
  RemoveButton.innerText = 'Remove';
  BookDiv.id = book.id;

  BookDiv.append(Title, Author, RemoveButton);
  BookContainer.appendChild(BookDiv);
  RemoveButton.addEventListener('click', (e) => {
    e.preventDefault();
    deleteBook(book.id);
  });
}

function addBook(book) {
  createBookDiv(book);
  BookList[book.id] = book;
  saveBooksToLocalStorage(book);
}

// Event Listeners
AddButton.addEventListener('click', (e) => {
  e.preventDefault();

  const BookEntry = new Book(BookTitle.value, BookAuthor.value);

  addBook(BookEntry);
  BookTitle.value = '';
  BookAuthor.value = '';
});
// Function calls
// BookList.forEach(createBookDiv);
if (localStorage.getItem('books') == null) {
  localStorage.setItem('books', JSON.stringify({}));
}
