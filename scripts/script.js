let myLibrary = [];

const form = document.querySelector('.bookForm');


function Book(title, author, pagenum, hasRead, localIndex) {
    this.title = title;
    this.author = author;
    this.pagenum = pagenum;
    this.hasRead = hasRead;
    this.localIndex = localIndex;
}



function pushLocalStorageToLibrary() {
    myLibrary = [];
    for (let i = 0; i < localStorage.length; i++) {
        const book = JSON.parse(localStorage.getItem(`${localStorage.key(i)}`));
        myLibrary.push(book);
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function displayArray() {
    const mainColunmOne = document.querySelector('.one');
    const mainColunmTwo = document.querySelector('.two');
    const mainColunmThree = document.querySelector('.three');
    removeAllChildNodes(mainColunmOne);
    removeAllChildNodes(mainColunmTwo);
    removeAllChildNodes(mainColunmThree);
    let orderedLibrary = myLibrary.sort(function(a, b) {
        if (a.localIndex > b.localIndex) {
            return 1;
        } else {
            return -1;
        }
    });

    for (let i = 0; i < orderedLibrary.length; i++) {
        const title = orderedLibrary[i].title;
        const author = orderedLibrary[i].author;
        const pagenum = orderedLibrary[i].pagenum;
        const hasRead = orderedLibrary[i].hasRead;
        const localIndex = orderedLibrary[i].localIndex;
        const index = i;
        addBookCard(title, author, pagenum, hasRead, index, localIndex);

    }


}

function addBookCard(title, author, pagenum, hasRead, index, localIndex) {
    const book = document.createElement('div');
    const titleDom = document.createElement('div');
    const authorDom = document.createElement('div');
    const pagesDom = document.createElement('div');
    const readDom = document.createElement('button');
    const bottomWrapper = document.createElement('div');
    const deleteBtn = document.createElement('button');
    let titleKey = title.split(' ').join('');

    book.classList.add('book');
    titleDom.classList.add('title');
    authorDom.classList.add('author');
    pagesDom.classList.add('pages');
    readDom.classList.add('read-status');
    readDom.classList.add(`${titleKey}`);
    bottomWrapper.classList.add('bottom-wrapper');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.setAttribute('data-index', `${index}`);
    deleteBtn.setAttribute('data-localIndex', `${titleKey}`)
    readDom.setAttribute('onclick', 'onclick="this.blur();"');

    deleteBtn.addEventListener('click', (e) => {
        let index = e.target.dataset.index;
        myLibrary.splice(index, 1);
        localStorage.removeItem(`${e.target.dataset.localindex}`);
        pushLocalStorageToLibrary();
        displayArray();
    });

    titleDom.textContent = `Title: ${title}`;
    authorDom.textContent = `Author: ${author}`;
    pagesDom.textContent = `Pages: ${pagenum}`;
    readDom.textContent = `${hasRead}`;

    deleteBtn.textContent = 'delete';

    readDom.addEventListener('click', (e) => {
        let btnTitle = e.target.classList[1];
        let titleKey = btnTitle.split(' ').join('');
        const bk = localStorage.getItem(`${titleKey}`)
        const bkDestring = JSON.parse(bk);
        if (bkDestring.hasRead === 'Read') {
            bkDestring.hasRead = 'Not Read';
        } else {
            bkDestring.hasRead = 'Read';
        }
        const bkBackToString = JSON.stringify(bkDestring);
        localStorage.setItem(`${titleKey}`, bkBackToString);
        pushLocalStorageToLibrary();
        displayArray();
    });


    bottomWrapper.appendChild(deleteBtn);
    book.appendChild(titleDom);
    book.appendChild(authorDom);
    book.appendChild(pagesDom);
    book.appendChild(readDom);
    book.appendChild(bottomWrapper);

    const mainColunmOne = document.querySelector('.one');
    const mainColunmTwo = document.querySelector('.two');
    const mainColunmThree = document.querySelector('.three');
    let oneContent = mainColunmOne.childElementCount;
    let twoContent = mainColunmTwo.childElementCount;
    let threeContent = mainColunmThree.childElementCount;
    if (oneContent === twoContent && oneContent === threeContent) {
        mainColunmOne.appendChild(book);
        let oneCount = Number(oneContent) + 1;
        mainColunmOne.dataset.content = `${oneCount}`;
    } else if (oneContent > twoContent) {
        mainColunmTwo.appendChild(book);
        let twoCount = Number(twoContent) + 1;
        mainColunmTwo.dataset.content = `${twoCount}`;
    } else {
        mainColunmThree.appendChild(book);
        let threeCount = Number(threeContent) + 1;
        mainColunmThree.dataset.content = `${threeCount}`;
    }


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
    let titleKey = title.split(' ').join('');
    let total = 0;
    let localIndex = 0;
    let orderedLibrary = myLibrary.sort(function(a, b) {
        if (a.localIndex > b.localIndex) {
            return 1;
        } else {
            return -1;
        }
    });
    for (let i = 0; i < orderedLibrary.length; i++) {
        const bk = localStorage.getItem(`${orderedLibrary[i].title.split(' ').join('')}`)
        const bkDestring = JSON.parse(bk);
        bkDestring.localIndex = i;
        const bkBackToString = JSON.stringify(bkDestring);
        localStorage.setItem(`${orderedLibrary[i].title.split(' ').join('')}`, bkBackToString);
        total += i;
    }
    if (orderedLibrary.length === 0) {
        localIndex = 0;
    } else {
        localIndex = total + 1;
    }

    const newBook = new Book(title, author, pagenum, hasRead, localIndex);
    const newBookString = JSON.stringify(newBook);
    localStorage.setItem(`${titleKey}`, newBookString);
}

const submitBtn = document.getElementById('submitBtn');


submitBtn.addEventListener('click', (e) => {
    if (document.getElementById('title').value.split(' ').join('') === '' || document.getElementById('author').value.split(' ').join('') === '' || document.getElementById('pages').value.split(' ').join('') === '') {
        return;
    }
    e.preventDefault();
    getBookFromUser();
    pushLocalStorageToLibrary();
    displayArray();
    form.reset();
    modal.style.display = 'none';
});

pushLocalStorageToLibrary();
displayArray();


// const bookReadBtns = document.querySelectorAll('.read-status');

// bookReadBtns.forEach((button) => {
//     button.addEventListener('click', (e) => {
//         let btnTitle = e.target.classList[1];
//         let titleKey = btnTitle.split(' ').join('');
//         const bk = localStorage.getItem(`${titleKey}`)
//         const bkDestring = JSON.parse(bk);
//         if (bkDestring.hasRead === 'Read') {
//             bkDestring.hasRead = 'Not Read';
//         } else {
//             bkDestring.hasRead = 'Read';
//         }
//         const bkBackToString = JSON.stringify(bkDestring);
//         localStorage.setItem(`${titleKey}`, bkBackToString);
//         pushLocalStorageToLibrary();
//         displayArray();


//     });
// });

// const deleteButtons = document.querySelectorAll('.delete-btn');

// deleteButtons.forEach((button) => {
//     button.addEventListener('click', (e) => {
//         let index = e.target.dataset.index;
//         myLibrary.splice(index, 1);
//         localStorage.removeItem(`${e.target.dataset.localindex}`);
//         pushLocalStorageToLibrary();
//         displayArray();



//     });
// });
