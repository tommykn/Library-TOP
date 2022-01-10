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
function addBookToLibrary() {
    let title = prompt("what it the books title")
    let author = prompt("what is the author");
    let hasRead =  confirm('Have you read it yet');
    let pages = prompt("how many pages is it");
    console.log(typeof(Number(pages)));
    if (isNaN(pages) === true) {
        pages = prompt("please enter a number greater than 0");
    }
    const newBook = new Book(title, author, pages, hasRead);

    myLibrary.push(newBook);

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