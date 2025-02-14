import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'; // Ensure you have styles

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      if (response.data.success) {
        alert('Login successful!');
        navigate(`/profile/${username}`); // Pass username in the URL
      } else {
        setError(response.data.message || 'Invalid username or password.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
