console.log("test")

let available = false
function isAvailable(bookTitle){
    for(book of library){
         if(bookTitle==book.title){
            available = book.author
         }
    }
}