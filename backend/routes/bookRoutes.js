const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// GET a book by title
router.get('/:title', async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book details' });
  }
});

// POST a review for a book
router.post('/:title/review', async (req, res) => {
  try {
    const { user, comment, rating } = req.body;

    if (!user || !comment || rating == null || rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'Invalid input. Please provide user, comment, and rating between 0 and 5.' });
    }

    const book = await Book.findOne({ title: req.params.title });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    // Add review to the book's reviews array
    book.reviews.push({ user, comment, rating });
    await book.save();

    res.status(201).json({ message: 'Review added successfully', book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

module.exports = router;
