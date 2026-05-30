console.log("test")
let library = [
    { title: "The Alchemist",     author: "Paulo Coelho",   genre: "Fiction",    totalCopies: 3, borrowedCopies: 3 },
    { title: "Atomic Habits",     author: "James Clear",    genre: "Self Help",  totalCopies: 5, borrowedCopies: 2 },
    { title: "Clean Code",        author: "Robert Martin",  genre: "Tech",       totalCopies: 2, borrowedCopies: 1 },
    { title: "The Psychology of Money", author: "Morgan Housel", genre: "Finance", totalCopies: 4, borrowedCopies: 4 },
    { title: "Deep Work",         author: "Cal Newport",    genre: "Self Help",  totalCopies: 3, borrowedCopies: 1 }
];


//Loop function

function bookcheck(booktitle){
    for(let idx=0; idx<library.length; idx++){
        if(booktitle==library[idx].title){
            return idx;
        }
    }
    return -1;
}





// let available = false
// function ischeck(bookTitle){
//     console.log("Function Run")
//     for(book of library){
//          if(bookTitle==book.title){
//             available=book.totalCopies-book.borrowedCopies>0                     // 1.  Final Working version(Sleek)
//             return;
//          } else{
//             available=false;
//          }
//     }
// }


// let available = false
// function isAvailable(bookTitle){
//     for(book of library){
//         if(bookTitle==book.title && book.totalCopies-book.borrowedCopies>0){
//             console.log(bookTitle,"is Available")
//             available=true
//             return;
//         } else if(bookTitle==book.title && book.totalCopies-book.borrowedCopies==0){
//             console.log(`All the Copies of ${bookTitle} are borrowed, Please Check Later.`)
//             available=false
//             return;
//         }
//     }                                                                             //Final working version(non sleek 1)
//     console.log(`${bookTitle} is not Availabe\nAvailable books are listed below`)
//     available=false;
//     let num_idx=1
//     for(booklist of library){
//         console.log(num_idx,booklist.title,`by ${booklist.author}`)
//         num_idx++;
//     }
// }
