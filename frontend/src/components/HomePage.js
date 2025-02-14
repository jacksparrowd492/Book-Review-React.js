import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage.css'; // Make sure to import the CSS file

const HomePage = () => {
  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
  ];

  return (
    <div className="container">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Welcome to the Book Store</h1>
      <p className="text-center text-lg text-gray-700 mb-8">
        Discover and explore a wide range of books from classic literature to modern novels.
      </p>

      <div className="card-container">
        {books.map((book) => (
          <div key={book.id} className="card">
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <Link to={`/books/${book.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
