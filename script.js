const header = document.querySelector("header")
const addBookBtn = document.querySelector(".add");
const removeBookBtn = document.querySelector(".remove");
const searchBtn = document.querySelector(".search");

const catalog = document.getElementById("catalog");

const myLibrary = [];

// This makes a random color...lol
function makeRandomColor() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
}

// This is the Class for a book
function Book(title,author,pages,read,rating,elementType,className,color) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
    this.elementType = elementType;
    this.className = className;
    this.color = color;
};

// This function creates a book div in the catalog based on the Book object created
function showBooks() {

    catalog.replaceChildren();

    for (book of myLibrary) {

        let div = document.createElement("div");

        if (book.title) {
            
            let bookTitleWords = book.title.split(" ");
            div.classList.add(bookTitleWords);
            }
        

        if (book.author) {

            let bookAuthorWords = book.author.split(" ");
            div.classList.add(bookAuthorWords);
            }

        let readItInput = document.createElement("input");
        readItInput.setAttribute("type","checkbox");
        readItInput.setAttribute("class","input")
        let readItLabel = document.createElement("label");
        readItLabel.setAttribute("class","read");
        readItLabel.setAttribute("class","switch");
        let readItSpan = document.createElement("span");
        readItSpan.setAttribute("class","slider");
        readItSpan.classList.add("round");
    
        if ((book.read == "yes") || (book.read == "y")) {
            readItInput.checked = true;
        }

        div.classList.add(book.className);
        div.style.backgroundColor = book.color;

        let h2 = document.createElement("h2");
        h2.textContent = book.title;
        h2.setAttribute("class","title");
        div.appendChild(h2);

        let h3 = document.createElement("h3");
        h3.textContent = book.author;
        h3.setAttribute("class","author");
        div.appendChild(h3);
        
        
        readItLabel.appendChild(readItInput);
        readItLabel.appendChild(readItSpan);
        div.appendChild(readItLabel);

        catalog.appendChild(div);
    }
};

// This function creates a form dialog where the user can input the information for a book. This is then added to a book object.
function addBook() {
        
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
    modalReadLabel.textContent = "Read it? (y/n):";
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
    modalSubmit.setAttribute("type","button");
    modalSubmit.setAttribute("id","submit");
    modalSubmit.textContent = "Submit";
    modalForm.appendChild(modalSubmit);

    addDialog.appendChild(modalForm);
    document.body.appendChild(addDialog);
    addDialog.showModal();

    closeButton.addEventListener('click', () => {
        addDialog.close();
        document.body.removeChild(addDialog);
    })
    
    modalSubmit.addEventListener("click", () => {

        let title = modalForm.querySelector("#title").value;
        let author = modalForm.querySelector("#author").value;
        let pages = modalForm.querySelector("#pages").value;
        let read = modalForm.querySelector("#read").value;
        let rating = modalForm.querySelector("#rating").value;
        let elementType = "div";
        let className = "book";
        let color = makeRandomColor();

        if ((!(title)) || (!(author))) {
        
            if (addDialog.querySelector("h1") == null) {
                console.log("no h1")
                let noTitleAuthor = document.createElement("h1");
                noTitleAuthor.classList.add("warning");
                noTitleAuthor.textContent = "Title and Author required"
                let addDialog = document.getElementById("add-modal")
                addDialog.appendChild(noTitleAuthor);
            } 
            
        }

        else {
            
            let newBook = new Book(
                title,
                author,
                pages,
                read,
                rating,
                elementType,
                className,
                color
            );

            if ((newBook.title) || (newBook.author)) {
                
                myLibrary.push(newBook);
                showBooks();
                addDialog.close();
                document.body.removeChild(addDialog);
            }           
        }            
    })
}

// This function "flips" the book div over to see the back which has the page count and rating
function flipBook() {
    
    let catalog = document.getElementById("catalog");
    let catalogNodes = catalog.childNodes;

    let count = 0;

    catalogNodes.forEach((book) => {

        let bookH2 = book.querySelector("h2");
        let bookH3 = book.querySelector("h3");

        book.addEventListener("click", () => {

            let title = myLibrary.at(count).title;
            let author = myLibrary.at(count).author;
            let pages = myLibrary.at(count).pages;
            let rating = myLibrary.at(count).rating;

            if (!(bookH2 == null)) {
                book.removeChild(bookH2);
            }
            
            if (!(bookH3 == null)) {
                book.removeChild(bookH3);
            }

            if (bookH2.classList.contains("title")) {
                let pagesH2 = document.createElement("h2");
                pagesH2.classList.add("pages");
                pagesH2.textContent = pages + " pages";
                book.appendChild(pagesH2);
            }

            else if (bookH2.classList.contains("pages")) {
                let titleH2 = document.createElement("h2");
                titleH2.classList.add("title");
                titleH2.textContent = title;
                book.appendChild(titleH2);
            }
            
            if (bookH3.classList.contains("author")) {
                let ratingH3 = document.createElement("h3");
                ratingH3.classList.add("rating");
                ratingH3.textContent = "Rating: " + rating + " out of 5";
                book.appendChild(ratingH3);
            }
            
            else if (bookH3.classList.contains("rating")) {
                let authorH3 = document.createElement("h3");
                authorH3.classList.add("author");
                authorH3.textContent = author;
                book.appendChild(authorH3);
            }

            count++;
        })
    })
}

function removeBook() {

    let cataloguedBooks = catalog.querySelectorAll("div");

    if (cataloguedBooks.length == 0) {
        // Do nothing
    }

    else {
        // This creates and appends the checkboxes on to the book divs
        
        for (let i = 0; i < cataloguedBooks.length; i++) {

        let selectBox = document.createElement("input");
        selectBox.setAttribute("type","checkbox");
        selectBox.setAttribute("id","select");
        cataloguedBooks[i].appendChild(selectBox);
    }
    
    let removeDialog = document.createElement("dialog");
    removeDialog.setAttribute("id","remove-modal");
    removeDialog.setAttribute("method","dialog");

    let closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.classList.add("close");
    removeDialog.appendChild(closeButton);

    let modalSubmit = document.createElement("button");
    modalSubmit.setAttribute("type","button");
    modalSubmit.setAttribute("id","submit");
    modalSubmit.textContent = "Delete";
    removeDialog.appendChild(modalSubmit);

    header.appendChild(removeDialog);

    // This removes the checkbox element from the book divs 
    closeButton.addEventListener("click", () => {

        
        for (let i = 0; i < cataloguedBooks.length; i++) {

            let bookClose = cataloguedBooks[i].querySelector("#select");
            cataloguedBooks[i].removeChild(bookClose);

        }

        removeDialog.close();
        header.removeChild(removeDialog);
    });

    // This removes divs based on checkboxs checked
    modalSubmit.addEventListener("click", () => {

        for (let i = 0; i < cataloguedBooks.length; i++) {

            let bookClose = cataloguedBooks[i].querySelector("#select");
            
            if (bookClose.checked == true) {
                
                cataloguedBooks[i].removeChild(bookClose);
                catalog.removeChild(cataloguedBooks[i]);
                myLibrary.splice(i,1);
                
            }
            else {

                cataloguedBooks[i].removeChild(bookClose);
            }

        };

        removeDialog.close();
        header.removeChild(removeDialog);
    });
}};

// This creates a form dialog which takes a string that is checked in the catalog, and returned as the sole div in the catalog.
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
    modalForm.appendChild(searchHeading);

    let searchBar = document.createElement("input");
    searchBar.setAttribute("type","text");
    searchBar.setAttribute("id","search");
    searchBar.setAttribute("name","search");
    let searchBarLabel = document.createElement("label");
    searchBarLabel.setAttribute("for","search");
    searchBarLabel.textContent = "Search alphabetically";
    modalForm.appendChild(searchBar);
    modalForm.appendChild(searchBarLabel);

    let modalSubmit = document.createElement("button");
    modalSubmit.setAttribute("type","button");
    modalSubmit.setAttribute("id","submit");
    modalSubmit.textContent = "Submit";
    modalForm.appendChild(modalSubmit);

    searchDialog.appendChild(modalForm);
    searchDialog.showModal();

    closeButton.addEventListener('click', () => {
        searchDialog.close();
        document.body.removeChild(searchDialog);
    })

    modalSubmit.addEventListener("click", () => {

        for (book of catalog.childNodes) {

            let searchValue = document.getElementById("search").value;
            searchValue = searchValue.replace(" ",",");
            searchValue = searchValue.toLowerCase();

            if (catalog.length < 2) {
                // Do nothing
            }

            else if (!(book.classList.value == searchValue)) {
                
                catalog.removeChild(book);
            }
        }

            searchDialog.close();
            document.body.removeChild(searchDialog);
        })

        let refreshButton = document.createElement("button");
        refreshButton.setAttribute("type","button");
        refreshButton.setAttribute("id","refresh");
        refreshButton.textContent = "Refresh";
        header.appendChild(refreshButton);

        refreshButton.addEventListener("click", () => {

            showBooks();
            header.removeChild(refreshButton);
        })

    };

addBookBtn.addEventListener("click",addBook);
removeBookBtn.addEventListener("click",removeBook);
searchBtn.addEventListener("click",searchLibrary);
catalog.addEventListener("click",flipBook);