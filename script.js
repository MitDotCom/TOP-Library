const addBookBtn = document.querySelector(".add");
const removeBookBtn = document.querySelector(".remove");
const searchBtn = document.querySelector(".search");
const catalog = document.getElementById("catalog");

function makeRandomColor() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
}

function Book(title,author,pages,read,rating,divName) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
    this.divName = divName;
};

const theHobbit = new Book("The Hobbit","J.R.R. Tolkien",366,"yes",4,"hobbitDiv");
const aTaleOfTwoCities = new Book("A Tale of Two Cities","Charles Dickens",489,"no",4,"twoCitiesDiv");

const myLibrary = [theHobbit,aTaleOfTwoCities];

function displayBooks() {
    for (book of myLibrary) {
        let div = document.createElement("div");
        div.classList.add(book.divName);
        let randomColor = makeRandomColor();
        div.style.backgroundColor = randomColor;

        let h2 = document.createElement("h2");
        h2.textContent = book.title;
        div.appendChild(h2);

        let h3 = document.createElement("h3");
        h3.textContent = book.author;
        div.appendChild(h3);

        catalog.appendChild(div);
    };
};

function addBook() {

};

function removeBook() {

};

function searchLibrary() {

};

displayBooks();