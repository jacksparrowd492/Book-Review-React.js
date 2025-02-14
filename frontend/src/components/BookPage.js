import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/BookPage.css';

const BookPage = () => {
  const { title } = useParams(); // Fetch the book title from the URL params
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const bookResponse = await axios.get(`http://localhost:5000/books/${title}`);
        setBook(bookResponse.data);

        const reviewsResponse = await axios.get(`http://localhost:5000/reviews/${bookResponse.data._id}`);
        setReviews(reviewsResponse.data);
        setReviewCount(reviewsResponse.data.length);
      } catch (err) {
        setError('Failed to load book details or reviews. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title]);

  const hasUserReviewed = () => {
    return reviews.some((review) => review.user.toLowerCase() === user.toLowerCase());
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (hasUserReviewed()) {
      alert('You have already submitted a review for this book.');
      return;
    }

    try {
      const newReview = {
        bookId: book._id,
        user,
        comment,
        rating,
      };

      await axios.post('http://localhost:5000/reviews', newReview);

      const response = await axios.get(`http://localhost:5000/reviews/${book._id}`);
      setReviews(response.data);
      setReviewCount(response.data.length);

      setUser('');
      setComment('');
      setRating(0);
    } catch (err) {
      setError('Failed to submit your review. Please try again.');
      console.error(err);
    }
  };

  if (loading) return <p className="loading">Loading book details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="book-details-container">
      <h1 className="book-title">{book.title}</h1>
      <div className="book-info">
        {book.thumbnail && <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />}
        <div className="book-description">
          <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
          <p><strong>Author:</strong> {book.author || 'Unknown'}</p>
          <p><strong>Published Year:</strong> {book.publishedYear || 'N/A'}</p>
        </div>
      </div>

      <h2>Reviews ({reviewCount})</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review">
            <p><strong>{review.user}:</strong> {review.comment}</p>
            <p>Rating: {review.rating}/5</p>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review this book!</p>
      )}

      <form onSubmit={handleReviewSubmit} className="review-form">
        <h3>Add a Review</h3>
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <textarea
          placeholder="Your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <input
          type="number"
          placeholder="Rating (0-5)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="0"
          max="5"
          required
        />
        <button type="submit" disabled={!user || hasUserReviewed()}>
          {hasUserReviewed() ? 'Review Submitted' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default BookPage;
