let myLibrary = [];


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
        
    }


}