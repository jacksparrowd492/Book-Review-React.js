import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReviewForm = ({ bookId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      setError('Please provide a rating between 1 and 5.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/reviews', {
        bookId,
        reviewText,  // Ensure this matches what the backend expects
        rating,
      });
      alert('Review submitted successfully!');
      setReviewText('');
      setRating(0);
      setError('');
      navigate(`/books/${bookId}`);
    } catch (err) {
      console.error(err);
      setError('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Submit a Review</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="reviewText" className="block text-gray-700 font-bold mb-2">
            Review:
          </label>
          <textarea
            id="reviewText"
            className="w-full p-3 border rounded-lg"
            rows="4"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">
            Rating (1-5):
          </label>
          <input
            type="number"
            id="rating"
            className="w-full p-3 border rounded-lg"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
