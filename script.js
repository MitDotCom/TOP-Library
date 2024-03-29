const addBookBtn = document.querySelector(".add");
const removeBookBtn = document.querySelector(".remove");
const searchBtn = document.querySelector(".search");
const catalog = document.getElementById("catalog");

function makeRandomColor() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
}

function Book(title,author,pages,read,rating,elementType,className,color) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
    this.elementType = elementType;
    this.className = className;
    this.color = color
};

const theHobbit = new Book("The Hobbit","J.R.R. Tolkien",366,"yes",4,"div","hobbit",makeRandomColor());
const aTaleOfTwoCities = new Book("A Tale of Two Cities","Charles Dickens",489,"no",4,"div","twoCities",makeRandomColor());

const newLibrary = [];
const myLibrary = [theHobbit,aTaleOfTwoCities];

function createBooks() {
    for (book of newLibrary) {

        if (!(myLibrary.includes(book))) {
            
            let div = document.createElement("div");
            div.classList.add(book.className);
            let randomColor = makeRandomColor();
            div.style.backgroundColor = randomColor;

            let h2 = document.createElement("h2");
            h2.textContent = book.title;
            div.appendChild(h2);

            let h3 = document.createElement("h3");
            h3.textContent = book.author;
            div.appendChild(h3);

            catalog.appendChild(div);
        }
        
    };
};

function addBookForm() {
    let addDialog = document.createElement("dialog");
    addDialog.setAttribute("id","add-modal");
    addDialog.setAttribute("method","dialog");

    let closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.classList.add("close");
    addDialog.appendChild(closeButton);

    let modalForm = document.createElement("form");

    let modalTitle = document.createElement("input");
    modalTitle.setAttribute("type","text");
    modalTitle.setAttribute("id","title");
    modalTitle.setAttribute("name","title");
    let modalTitleLabel = document.createElement("label");
    modalTitleLabel.setAttribute("for","title");
    modalTitleLabel.textContent = "Title:";
    modalForm.appendChild(modalTitleLabel);
    modalForm.appendChild(modalTitle);

    let modalAuthor = document.createElement("input");
    modalAuthor.setAttribute("type","text");
    modalAuthor.setAttribute("id","author");
    modalAuthor.setAttribute("name","author");
    let modalAuthorLabel = document.createElement("label");
    modalAuthorLabel.setAttribute("for","author");
    modalAuthorLabel.textContent = "Author:";
    modalForm.appendChild(modalAuthorLabel);
    modalForm.appendChild(modalAuthor);

    let modalPages = document.createElement("input");
    modalPages.setAttribute("type","text");
    modalPages.setAttribute("id","pages");
    modalPages.setAttribute("name","pages");
    let modalPagesLabel = document.createElement("label");
    modalPagesLabel.setAttribute("for","pages");
    modalPagesLabel.textContent = "Pages:";
    modalForm.appendChild(modalPagesLabel);
    modalForm.appendChild(modalPages);

    let modalRead = document.createElement("input");
    modalRead.setAttribute("type","text");
    modalRead.setAttribute("id","read");
    modalRead.setAttribute("name","read");
    let modalReadLabel = document.createElement("label");
    modalReadLabel.setAttribute("for","read");
    modalReadLabel.textContent = "Read:";
    modalForm.appendChild(modalReadLabel);
    modalForm.appendChild(modalRead);

    let modalRating = document.createElement("input");
    modalRating.setAttribute("type","text");
    modalRating.setAttribute("id","rating");
    modalRating.setAttribute("name","rating");
    let modalRatingLabel = document.createElement("label");
    modalRatingLabel.setAttribute("for","rating");
    modalRatingLabel.textContent = "Rating (0-5):";
    modalForm.appendChild(modalRatingLabel);
    modalForm.appendChild(modalRating);

    let modalSubmit = document.createElement("button");
    modalSubmit.setAttribute("type","submit");
    modalSubmit.textContent = "Submit";
    modalForm.appendChild(modalSubmit);

    addDialog.appendChild(modalForm);
    document.body.appendChild(addDialog);

    addDialog.showModal();

    closeButton.addEventListener('click', () => {
        addDialog.close();
        document.body.removeChild(addDialog);
    });

    modalSubmit.addEventListener("click",(event) => {

        event.preventDefault();
        
        let title = modalForm.querySelector("#title").value;
        let author = modalForm.querySelector("#author").value;
        let pages = modalForm.querySelector("#pages").value;
        let read = modalForm.querySelector("#read").value;
        let rating = modalForm.querySelector("#rating").value;

        let newBook = new Book(
            title,
            author,
            pages,
            read,
            rating
        )
        myLibrary.append(newBook);
        createBooks();
    });

    
};
    

function removeBook() {
    
    console.log("clicked remove");
    // for (book in myLibrary) {
    //     
    // }

    createBooks();

};

function searchLibrary() {
    let searchDialog = document.createElement("dialog");
    searchDialog.setAttribute("id","search-modal");
    searchDialog.setAttribute("method","dialog");
    document.body.appendChild(searchDialog);

    let closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.classList.add("close");
    searchDialog.appendChild(closeButton);

    let modalForm = document.createElement("form");

    let searchHeading = document.createElement("h2");
    searchHeading.textContent = "Search";
    searchDialog.appendChild(searchHeading);
    catalog.appendChild(searchDialog);

    let searchBar = document.createElement("input");
    searchBar.setAttribute("type","text");
    searchBar.setAttribute("id","search");
    searchBar.setAttribute("name","search");
    let searchBarLabel = document.createElement("label");
    searchBarLabel.setAttribute("for","search");
    searchBarLabel.textContent = "Search alphabetically by title";
    searchDialog.appendChild(searchBar);

    let modalSubmit = document.createElement("button");
    modalSubmit.setAttribute("type","submit");
    modalSubmit.textContent = "Submit";
    modalForm.appendChild(modalSubmit);

    searchDialog.showModal();

    closeButton.addEventListener('click', () => {
        searchDialog.close();
        document.body.removeChild(searchDialog);
    })

    modalSubmit.addEventListener("click",() => {
        // ;
    })
};

createBooks();

addBookBtn.addEventListener("click",addBookForm);
removeBookBtn.addEventListener("click",removeBook);
searchBtn.addEventListener("click",searchLibrary);