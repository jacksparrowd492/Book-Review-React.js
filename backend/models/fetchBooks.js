const axios = require('axios');
const mongoose = require('mongoose');
const Book = require('./models/Book'); // Import the Book model

const MONGODB_URI = 'mongodb+srv://jacksparrowd492:Karthi2004@cluster0.zqcv1.mongodb.net/Bookreview';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const fetchBooksFromGoogleAPI = async (query) => {
  try {
    console.log(`Fetching books with query: ${query}`);
    
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`);
    
    if (!response.data.items) {
      console.log('No books found.');
      return;
    }

    console.log(`Number of books retrieved: ${response.data.items.length}`);
    
    const books = response.data.items.map((item) => ({
        image_url: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
        title: item.volumeInfo.title || 'No title available',
        root_bs_rank: item.volumeInfo.pageCount || Math.floor(Math.random() * 100000), // Use a fallback value
        url: item.volumeInfo.infoLink || 'https://example.com',  // Provide a default URL if missing
        categories: item.volumeInfo.categories || [],
        best_sellers_rank: [
          {
            category: item.volumeInfo.categories?.[0] || 'General',
            rank: Math.floor(Math.random() * 100)
          }
        ]
      }));
      
      

    for (const book of books) {
      try {
        const newBook = new Book(book);
        await newBook.save();
        console.log(`Saved book: ${book.title}`);
      } catch (err) {
        console.error(`Failed to save book: ${book.title}`, err.message);
      }
    }

    console.log('All books saved to MongoDB');
  } catch (error) {
    console.error('Error fetching books from Google API:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Fetch and save books with the query 'fiction'
fetchBooksFromGoogleAPI('fiction');
