const form = document.getElementById('book-form');
const bookList = document.getElementById('book-list');

let books = JSON.parse(localStorage.getItem('books')) || [];

function saveAndRender() {
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
}

function renderBooks() {
    bookList.innerHTML = '';
  
    books.forEach((book, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <strong>${book.title}</strong> by ${book.author} — <em>${book.status}</em>
        </div>
        <div class="actions">
          <button onclick="editBook(${index})">Edit</button>
          <button onclick="deleteBook(${index})">Delete</button>
        </div>
      `;
      bookList.appendChild(li);
    });
  }
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
  
    const newBook = {
      title: document.getElementById('title').value.trim(),
      author: document.getElementById('author').value.trim(),
      status: document.getElementById('status').value,
    };
  
    books.push(newBook);
    saveAndRender();
    form.reset();
  });
  
  function deleteBook(index) {
    books.splice(index, 1);
    saveAndRender();
  }
  
  function editBook(index) {
    const book = books[index];
    const newTitle = prompt('Edit title:', book.title);
    const newAuthor = prompt('Edit author:', book.author);
    const newStatus = prompt('Edit status (Read / To Read):', book.status);
  
    if (newTitle && newAuthor && (newStatus === "Read" || newStatus === "To Read")) {
      books[index] = {
        title: newTitle,
        author: newAuthor,
        status: newStatus
      };
      saveAndRender();
    }
  }
  
  renderBooks();