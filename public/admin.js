//we are creating a function to send a request to retrieve a list of books from the server below. this lists of books (objects) are held in an array. 
//once fetched, we can recognize the items in the array and put it in an object called 'books', this helps makes it easier to read to identify the properties and its values
//for each item in 'books', we are going to pass a function that will allow us to make updates 

async function main() {
    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

        books.forEach(renderBookForm)
}

//the purpose of this function is to select elements from our HTML (DOM), and assign it to a variable 
// so that we can later use that variable when we want to update our data

function renderBookForm(book)   {

    //we assign bookForm to root, an ID from html that is a parent to the tags below
    let bookForm = document.querySelector('#root')

    //we assign bookList to an element we created in order to represent each book in the book list
    //since we are creating these in JS, i don't believe we will see this in our html like we see the root ID
    let bookList = document.createElement('li')
    
    //this will allow us to adjust the text of the title, which is a property held in the objects
    //it has only connected the two, but we haven't called a method yet, that will be below
        bookList.textContent = book.title;

    //we create another element in js called input to display our book quantity, which we'll link to the value property
    let quantityOfBooks = document.createElement('input')
        quantityOfBooks.value = book.quantity;

    //same logic here
    let save = document.createElement('button')
        save.textContent = 'UPDATE';

    //when the user clicks update, the event listener 'save' allows us to send the number entered back to the server (line 6). 
    //, which will update it and display on our customer-facing page. This still needs to be invoked.
    // this part kinda confuses me, but i think we are turning the id and quantity of the body into a string, 
    // so that it can properly accept the number before converting back into an object

    save.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: quantityOfBooks.value
            })
        })

    })

    //we are using the append method to push the new values to its parent element
    bookList.append(save, quantityOfBooks)

    bookForm.append(bookList)

}

main();