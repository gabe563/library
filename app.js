// DOM items
const gridCont = document.querySelector('.books-cont');
const bookForm = document.getElementById('bookForm');
const newBookBtn = document.getElementById('newBook');

const titleInput = document.querySelector('[data-type="Title"]');
const authorInput = document.querySelector('[data-type="Author"]');
const pagesInput = document.querySelector('[data-type="Pages"]')
const readOrNot = document.querySelector('[data-type="ReadOrNot"]');
const addNewBook = document.getElementById('addBook');
const clearFields = document.getElementById('clearField');

const addNewBookModal = document.getElementById('addNewBookModal');
const overlay = document.getElementById('overlay');


// Event listeners
newBookBtn.addEventListener('click', newBook);
addNewBook.addEventListener('click', addBookToLibrary);
clearFields.addEventListener('click', clearUp);

overlay.addEventListener('click', closeModal);

titleInput.addEventListener('input', checkInputLength);
authorInput.addEventListener('input', checkInputLength);
pagesInput.addEventListener('input', checkInputLength);

// Prevent default form submitting
bookForm.addEventListener('submit', (e)=>{
    e.preventDefault();
});

// Array to store all the books
let myLibrary = [
    // {
    //     'title':'marst', 'author':'neymar', 'pages':'295', 'read':false
    // }
];

// Book constructor
class Book {
    constructor(title, author, pages, read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read

        this.addToArray = function() {
            myLibrary.push({'title':`${title}`, 'author':`${author}`, 'pages':`${pages}`, 'read':read});
        };

        this.info = function() {
            return `${title} by ${author}, ${pages} pages, ${read}`;
        };
    };
};

// Example
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet');

console.log(theHobbit.info());

// Open the modal to create a new book
function newBook() {
    addNewBookModal.classList.add('active');
    overlay.classList.add('active');
}

// Add a book to the library
function addBookToLibrary() {
    let currTitle = titleInput.value
    let currAuthor = authorInput.value
    let currPages = pagesInput.value
    let currRead = readOrNot.checked

    const currBook = new Book(currTitle, currAuthor, currPages, currRead);

    currBook.addToArray();

    LoopBook();
    closeModal();
    setTimeout(clearUp, 5);
};

// Loop each book card and iterate through each book
function LoopBook() {
    const bookCont = document.querySelector('.books-cont');
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => bookCont.removeChild(card));
    for (const obj of myLibrary){
        createBookCard(obj);
    };
};

// Create a new book card
function createBookCard(item) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.setAttribute('data-index', myLibrary.indexOf(item));

    const titleP = document.createElement('p');
    titleP.classList.add('titleBook');
    titleP.textContent = item.title;

    const authorP = document.createElement('p');
    authorP.textContent = item.author;
    
    const pagesP = document.createElement('p');
    pagesP.textContent = item.pages;

    const btnsDiv = document.createElement('div');
    btnsDiv.classList.add('btn-group');

    const removeDiv = document.createElement('div');
    removeDiv.classList.add('remove');

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('id', 'removeBtn');

    removeBtn.addEventListener('click', () => {delet(item)})
    
    const toggleReadDiv = document.createElement('div');
    toggleReadDiv.classList.add('toggle-read');

    const readBtn = document.createElement('button');
    readBtn.textContent = 'Not read yet';
    readBtn.classList.add('readDefault');
    readBtn.setAttribute('id', 'readBtn');

    readBtn.addEventListener('click', () => {toggleRead(item)});
    
    gridCont.appendChild(newCard);

    newCard.appendChild(titleP);
    newCard.appendChild(authorP);
    newCard.appendChild(pagesP);
    newCard.appendChild(btnsDiv);

    btnsDiv.appendChild(removeDiv);
    btnsDiv.appendChild(toggleReadDiv);

    removeDiv.appendChild(removeBtn);
    toggleReadDiv.appendChild(readBtn);

    checkIfRead(readBtn, item);
};

// Check input value length
function checkInputLength() {
    const titleVal = titleInput.value.length;
    const authorVal = authorInput.value.length;
    const pagesVal = pagesInput.value.length;
    if(titleVal > 0 && authorVal > 0 && pagesVal > 0) {
        addNewBook.classList.remove('disabled');
    } else if(titleVal === 0 || authorVal === 0 || pagesVal === 0){
        addNewBook.classList.add('disabled');
    }
};

// Close the modal
function closeModal() {
    addNewBookModal.classList.remove('active');
    overlay.classList.remove('active');
};

// Check if the book is read in form 
function checkIfRead(readBtn, item) {
    if(item.read === false) {
        readBtn.textContent = 'Not read yet';
        readBtn.classList.remove('readActive');
        
    } else if(item.read === true) {
        readBtn.textContent = 'Read';
        readBtn.classList.add('readActive');
    }
};

// Toggle read button 
function toggleRead(item) {
    item.read = !item.read; 
    LoopBook();
};

// Clear up all the input fields
function clearUp() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readOrNot.checked = false;
    addNewBook.classList.add('disabled');
};

// Delete array item
function delet(item) {
    myLibrary.splice(myLibrary.indexOf(item), 1);
    LoopBook();
};