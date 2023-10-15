
async function main() {

    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

        books.forEach(renderBookForm)
}

function renderBookForm(book)   {
    let bookForm = document.querySelector('#root')

    let bookList = document.createElement('li')
        bookList.textContent = book.title;

    let quantityOfBooks = document.createElement('input')
        quantityOfBooks.value = book.quantity;

    let save = document.createElement('button')
        save.textContent = 'UPDATE';

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

    bookList.append(save, quantityOfBooks)

    bookForm.append(bookList)

}

main();