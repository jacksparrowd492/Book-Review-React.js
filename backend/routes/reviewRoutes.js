const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST a new review
router.post('/', async (req, res) => {
  try {
    const { bookId, user, comment, rating } = req.body;

    if (!bookId || !user || !comment || rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'Invalid input. Please provide bookId, user, comment, and a rating between 0 and 5.' });
    }

    const newReview = new Review({
      book: bookId,
      user,
      comment,
      rating
    });

    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    console.error('Failed to add review:', err);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// GET reviews for a specific book
router.get('/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error('Failed to fetch reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
