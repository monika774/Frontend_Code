import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../services/api';
import BookForm from './BookForm';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await getBooks();
      setBooks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    setCurrentBook(book);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
      } catch (err) {
        setError('Failed to delete book. Please try again.');
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setCurrentBook(null);
  };

  const handleBookSaved = () => {
    fetchBooks();
    setShowForm(false);
    setCurrentBook(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Library Books</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Book
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-4">Loading books...</div>
      ) : books.length === 0 ? (
        <div className="text-center py-4 bg-gray-100 rounded">No books found. Add your first book!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Author</th>
                <th className="py-2 px-4 text-left">ISBN</th>
                <th className="py-2 px-4 text-left">Year</th>
                <th className="py-2 px-4 text-left">Genre</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-b">
                  <td className="py-2 px-4">{book.title}</td>
                  <td className="py-2 px-4">{book.author}</td>
                  <td className="py-2 px-4">{book.isbn}</td>
                  <td className="py-2 px-4">{book.publication_year}</td>
                  <td className="py-2 px-4">{book.genre}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleEdit(book)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {currentBook ? 'Edit Book' : 'Add New Book'}
              </h3>
              <button
                onClick={handleFormClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <BookForm
              book={currentBook}
              onSave={handleBookSaved}
              onCancel={handleFormClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
