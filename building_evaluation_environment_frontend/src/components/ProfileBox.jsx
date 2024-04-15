import React from 'react';
import '../App.css'; // Import CSS file for styling

const ProfileBox = () => {
  const userName = localStorage.getItem('username');

  return (
    <div className="profile-box">
      <div className="profile-icon">👤</div>
      <div className="user-name">{userName}</div>
    </div>
  );
};

export default ProfileBox;