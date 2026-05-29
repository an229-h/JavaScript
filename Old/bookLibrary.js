let library = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    totalCopies: 3,
    borrowedCopies: 3,
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Help",
    totalCopies: 5,
    borrowedCopies: 2,
  },
  {
    title: "Clean Code",
    author: "Robert Martin",
    genre: "Tech",
    totalCopies: 2,
    borrowedCopies: 1,
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance",
    totalCopies: 4,
    borrowedCopies: 4,
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Self Help",
    totalCopies: 3,
    borrowedCopies: 1,
  },
];

//get book index by name
let id;
function bookcheck(booktitle) {
  for (let idx = 0; idx < library.length; idx++) {
    if (booktitle == library[idx].title) {
      id = idx;
      return idx;
    }
  }
  id=-1
  return -1;
}

let available;
function isAvailable(booktitle) {
  bookcheck(booktitle);
  if (id == -1) {
    available =false;
    return "Book not found";
  } else {
    let numberOfBooks = library[id].totalCopies-library[id].borrowedCopies
    if (numberOfBooks > 0) {
      available = true;
      return `${numberOfBooks} ${numberOfBooks === 1 ? "copy is" : "copies are"} available`;
    } else {
      available =false;
      return "Sorry, no copies available";
    }
  }
}

function borrowBook(booktitle) {
  console.log(isAvailable(booktitle))
  if(available==true) {
    library[id].borrowedCopies+=1;
    return "Borrowed Successfully"
  } else {
    return;
  }
}

function returnBook(booktitle) {
  bookcheck(booktitle);
  if(id!==-1){
    if(library[id].borrowedCopies!==0){
      library[id].borrowedCopies-=1;
      return "Returned successfully"
    } else {
      return `No copy of ${booktitle} has been borrowed yet`
    }
  } else {
    return "book not found"
  }
}

function bookDetails(){
  for(book of library){
    console.log(`Book:${book.title}\nAuthor:${book.author}`)
  }
}

function availableCopies(){
  for(book of library){
    console.log(`${book.title} has ${book.totalCopies-book.borrowedCopies} copies available`)
  }
}


function statusOfLibrary(){
  let available_books=[]
  let unavailable_books=[]
  let last_copy=[]
  for(let book of library){
    if (book.totalCopies-book.borrowedCopies===1){
      last_copy.push(book.title)
    } else if (book.totalCopies-book.borrowedCopies>1){
      available_books.push(book.title)
    } else {
      unavailable_books.push(book.title)
    }
  }
  console.log(`Available Books - ${available_books}\nUnavailable books - ${unavailable_books}\nLast copies - ${last_copy}`)
}

function report(query){
  if(query=="book details"){
    console.log("Books in Library")
    bookDetails();
  } else if(query=="available copies") {
    console.log("Copies Available in Library")
    availableCopies();
  } else if (query=="books remaining"){
    console.log("Status Of library")
    statusOfLibrary();
  } else{
    console.log("Full report")
    bookDetails();
    availableCopies();
    statusOfLibrary();

  }
}

function searchByGenre(genre){
  let listOfBooks = []
  for(let book of library){
    if(book.genre==genre){
      listOfBooks.push(book.title)
    }
  }

  return listOfBooks;
}
