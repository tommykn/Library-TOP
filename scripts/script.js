let myLibrary = [
    {
        title: "Something", author: "hfase", pagenum: "1231", hasRead: 'Not Read'
    },

];


function Book(title, author, pagenum, hasRead) {
    this.title = title;
    this.author = author;
    this.pagenum = pagenum;
    this.hasRead = hasRead;
}



function pushLocalStorageToLibrary() {
    for (let i = 0; i < localStorage.length; i++) {
        const book = JSON.parse(localStorage.getItem(`${i}`));
        myLibrary.push(book);
    }
}


function displayArray() {
    for (let i = 0; i < myLibrary.length; i++) {
        const title = myLibrary[i].title;
        const author = myLibrary[i].author;
        const pagenum = myLibrary[i].pagenum;
        const hasRead = myLibrary[i].hasRead;
        addBookCard(title, author, pagenum, hasRead);

    }


}

function addBookCard(title, author, pagenum, hasRead) {
    const book = document.createElement('div');
    const titleDom = document.createElement('div');
    const authorDom = document.createElement('div');
    const pagesDom = document.createElement('div');
    const readDom = document.createElement('button');
    const bottomWrapper = document.createElement('div');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    book.classList.add('book');
    titleDom.classList.add('title');
    authorDom.classList.add('author');
    pagesDom.classList.add('pages');
    readDom.classList.add('read-status');
    bottomWrapper.classList.add('bottom-wrapper');
    editBtn.classList.add('edit-btn');
    deleteBtn.classList.add('delete-btn');

    titleDom.textContent = `Tiltle: ${title}`;
    authorDom.textContent = `Author: ${author}`;
    pagesDom.textContent = `Pages; ${pagenum}`;
    readDom.textContent = `${hasRead}`;

    editBtn.textContent = 'edit';
    deleteBtn.textContent = 'delete';

    bottomWrapper.appendChild(editBtn);
    bottomWrapper.appendChild(deleteBtn);
    book.appendChild(titleDom);
    book.appendChild(authorDom);
    book.appendChild(pagesDom);
    book.appendChild(readDom);
    book.appendChild(bottomWrapper);

    const mainColunm = document.querySelector('.main-column');

    // console.log(book);
    // console.log(mainColunm);

    mainColunm.appendChild(book);
}

// modal

const modal = document.getElementById("myModal");
const btn = document.querySelector('.modalBtn');
const span = document.getElementsByClassName('close')[0];

btn.addEventListener('click', () => {
    modal.style.display = 'block';
});



window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});


const formReadBtn = document.getElementById("has-read");

formReadBtn.addEventListener('click', (e) => {
    if (e.target.value === 'Read') {
        e.target.value = 'Not Read';
    } else if (e.target.value === 'Not Read') {
        e.target.value = 'Read';
    }
});

function getBookFromUser() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pagenum = document.getElementById('pages').value;
    const hasRead = document.getElementById('has-read').value;

    const newBook = new Book(title, author, pagenum, hasRead);
    const newBookString = JSON.stringify(newBook);
    localStorage.setItem(`${localStorage.length}`, newBookString);
}

const submitBtn = document.getElementById('submitBtn');


submitBtn.addEventListener('click', () => {
    getBookFromUser();
});

pushLocalStorageToLibrary();
