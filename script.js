const form = document.getElementById('book-form');
const bookList = document.getElementById('book-list');

let books = JSON.parse(localStorage.getItem('books')) || [];

function saveAndRender() {
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
}

function renderBooks() {
    bookList.innerHTML = '';
  
    if (books.length === 0) {
        bookList.innerHTML = `
            <div class="empty-state">
                <h3>📚 No books yet!</h3>
                <p>Add your first book to get started with your reading journey.</p>
            </div>
        `;
        return;
    }
  
    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.className = 'book-item';
        
        const statusClass = book.status === 'Read' ? 'status-read' : 'status-to-read';
        
        li.innerHTML = `
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
            </div>
            <span class="book-status ${statusClass}">${book.status}</span>
            <div class="actions">
                <button class="toggle-btn" onclick="toggleStatus(${index})">
                    ${book.status === 'Read' ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
            </div>
        `;
        bookList.appendChild(li);
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const statusSelect = document.getElementById('status');

    const newBook = {
        title: titleInput.value.trim(),
        author: authorInput.value.trim(),
        status: statusSelect.value,
    };

    if (newBook.title && newBook.author) {
        books.push(newBook);
        saveAndRender();
        form.reset();
        
        // Add a subtle animation effect
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Added!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            submitBtn.textContent = 'Add Book';
            submitBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        }, 1000);
    }
});

function deleteBook(index) {
    if (confirm('Are you sure you want to delete this book?')) {
        books.splice(index, 1);
        saveAndRender();
    }
}

function toggleStatus(index) {
    books[index].status = books[index].status === 'Read' ? 'To Read' : 'Read';
    saveAndRender();
}

// Initialize the app
renderBooks();