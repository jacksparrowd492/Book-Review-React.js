import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/UserProfile.css'; // Ensure this file exists with appropriate styling

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/user/${username}`);
        if (response.data.success) {
          setUser(response.data.user);
          setProfileImage(response.data.user.profileImage || '');
        } else {
          setError('User not found.');
        }
      } catch (err) {
        setError('Failed to retrieve user information.');
        console.error(err);
      }
    };

    fetchUser();
  }, [username]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);

      try {
        const response = await axios.post(`http://localhost:5000/auth/user/${username}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.success) {
          setProfileImage(response.data.profileImageUrl);
        } else {
          setError('Failed to upload image.');
        }
      } catch (err) {
        setError('Failed to upload image.');
        console.error(err);
      }
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-image-container">
        <img src={profileImage || 'default-profile.png'} alt="Profile" className="profile-image" />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="user-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>About:</strong> {user.about}</p>
        <p><strong>Favorite Genres:</strong> {user.favoriteGenres.join(', ')}</p>
      </div>
    </div>
  );
};

export default UserProfile;
