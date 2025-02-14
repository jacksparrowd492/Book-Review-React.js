import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookListPage from './components/BookListPage';
import BookPage from './components/BookPage';
import UserProfile from './components/UserProfile';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import './App.css'; // Ensure your App.css has styles for navigation, main content, and footer

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1 className="logo">Book Review</h1>
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
            <NavLink to="/books" className={({ isActive }) => (isActive ? 'active' : '')}>Books</NavLink>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>Signup</NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BookListPage />} />
            <Route path="/book/:title" element={<BookPage />} /> {/* Route to fetch by book title */}
            <Route path="/profile/:username" element={<UserProfile />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2025 Book Review. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
