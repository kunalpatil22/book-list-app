// Initialize a books list
let books = [];

// Try to get the books from local storage
if (localStorage.getItem("books")) {
  try {
    books = JSON.parse(localStorage.getItem("books"));
    if (!(books instanceof Array)) {
      books = [];
    }
  } catch (e) {
    console.error(e);
  }
}

// Render books on table
const renderTable = () => {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = null;

  if (books.length < 1) {
    tbody.innerHTML += `<td colspan="4" style="color: rgb(100, 100, 100);">No Books</td>`;
  } else {
    books.forEach((book) => {
      tbody.innerHTML += `
            <tr>
              <td>${book.id}</td>
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>
                <button onclick="removeBook(${book.id})">Remove</button>
              </td>
            </tr>
          `;
    });
  }
};

// Remove book from the list
const removeBook = (id) => {
  books = books.filter((book) => book.id != id);
  localStorage.setItem("books", JSON.stringify(books));
  renderTable();
};

// Render books on table on page load
document.addEventListener("DOMContentLoaded", () => renderTable());

// Add new book in the list
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const formdata = new FormData(e.target);

  books = [
    ...books,
    {
      id: books.length + 1,
      title: formdata.get("title"),
      author: formdata.get("author"),
    },
  ];

  localStorage.setItem("books", JSON.stringify(books));

  renderTable();

  e.target.reset();
});
