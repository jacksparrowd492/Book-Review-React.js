const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});



// GET a book by title (case-insensitive)
router.get('/:title', async (req, res) => {
  try {
    const book = await Book.findOne({ title: new RegExp(`^${req.params.title}$`, 'i') });  // Case-insensitive match
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch book details' });
  }
});

module.exports = router;
