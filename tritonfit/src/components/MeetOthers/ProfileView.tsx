import React from "react";
import "./ProfileView.css";

interface User {
  name: string;
  image: string;
  major: string;
  experience: string;
  about: string;
  email: string;
}

interface ProfileViewProps {
  user: User;
  onBackClick: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onBackClick }) => {
  return (
    <div className="profile-view">
      <img src={user.image} alt={user.name} className="profile-image" />
      <h2 className="profile-name">{user.name}</h2>
      <p className="profile-section"><strong>Major and Year</strong><br />{user.major}</p>
      <p className="profile-section"><strong>Experience in Working Out</strong><br />{user.experience}</p>
      <p className="profile-section"><strong>About</strong><br />{user.about}</p>
      <p className="profile-section"><strong>UCSD Email</strong><br />{user.email}</p>
      <button className="back-button" onClick={onBackClick}>
        Back
      </button>
    </div>
  );
};

export default ProfileView;
