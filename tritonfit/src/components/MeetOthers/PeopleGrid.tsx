import React from "react";
import "./PeopleGrid.css";

interface User {
  name: string;
  image: string;
  major: string;
  experience: string;
  about: string;
  email: string;
}

interface PeopleGridProps {
  users: User[];
  onCardClick: (user: User) => void;
}

function PeopleGrid({ users, onCardClick }: PeopleGridProps) {
  return (
    <div className="grid-container">
      {users.map((user, index) => (
        <div key={index} className="user-card">
          <button className="user-button" onClick={() => onCardClick(user)}>
            <img src={user.image} alt={user.name} className="user-image" />
            <p className="user-name">{user.name}</p>
          </button>
        </div>
      ))}
    </div>
  );
}

export default PeopleGrid;
