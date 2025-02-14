import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../css/BookListPage.css';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate to BookPage

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch books');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p className="text-center">Loading books...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container">
      <h1 className="title">Book List</h1>
      <div className="card-container">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="card">
              <img
                src={book.thumbnail || 'https://via.placeholder.com/150'}
                alt={book.title}
                className="book-image"
              />
              <div className="card-content">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">Author: {book.authors || 'Unknown'}</p>
                <p className="book-pages">Pages: {book.num_pages || 'N/A'}</p>
                <button
                  className="details-button"
                  onClick={() => navigate(`/book/${encodeURIComponent(book.title)}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookListPage;
