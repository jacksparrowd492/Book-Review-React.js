import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [about, setAbout] = useState('');
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const genreOptions = ['Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Romance', 'Thriller', 'Mystery'];

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
  
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', {
        username,
        email,
        password,
        about,
        favoriteGenres,
      });
  
      if (response.data.success) {
        alert('Signup successful! Please log in.');
        navigate('/login');
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message); // Show backend error message
      } else {
        setError('Signup failed. Please try again.');
      }
      console.error('Error:', err);
    }
  };
  

  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
    setFavoriteGenres(selectedGenres);
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <textarea
          placeholder="Tell us about yourself"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows="4"
        />
        <label>Select Your Favorite Genres</label>
        <select multiple value={favoriteGenres} onChange={handleGenreChange}>
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
