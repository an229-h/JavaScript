let library = [
    { title: "The Alchemist",     author: "Paulo Coelho",   genre: "Fiction",    totalCopies: 3, borrowedCopies: 3 },
    { title: "Atomic Habits",     author: "James Clear",    genre: "Self Help",  totalCopies: 5, borrowedCopies: 2 },
    { title: "Clean Code",        author: "Robert Martin",  genre: "Tech",       totalCopies: 2, borrowedCopies: 1 },
    { title: "The Psychology of Money", author: "Morgan Housel", genre: "Finance", totalCopies: 4, borrowedCopies: 4 },
    { title: "Deep Work",         author: "Cal Newport",    genre: "Self Help",  totalCopies: 3, borrowedCopies: 1 }
];


let available = false
function isAvailable(bookTitle){
    console.log("Function Run")
    for(book of library){
         if(bookTitle==book.title){
            available=book.totalCopies-book.borrowedCopies>0       //Final Working version
            return;
         } else{
            available=false;
         }
    }    
}

