import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

// svg files
import HomeIcon from "../assets/home.svg";
import WorkoutIcon from "../assets/findworkout.svg";
import MeetIcon from "../assets/meetothers.svg";
import ProfileIcon from "../assets/profile.svg";
import HomeIconActive from "../assets/home-active.svg";
import WorkoutIconActive from "../assets/findworkout-active.svg";
import MeetIconActive from "../assets/meetothers-active.svg";
import ProfileIconActive from "../assets/profile-active.svg";

const Navbar: React.FC = () => {
  return (
    <nav className="bottom-navbar">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <div className="nav-item">
                <img
                  src={isActive ? HomeIconActive : HomeIcon}
                  alt="Home"
                  className="icon"
                />
                <p className="label">Home</p>
              </div>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/findworkout"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <div className="nav-item">
                <img
                  src={isActive ? WorkoutIconActive : WorkoutIcon}
                  alt="Workout"
                  className="icon"
                />
                <p className="label">Find Workout</p>
              </div>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/meetothers"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <div className="nav-item">
                <img
                  src={isActive ? MeetIconActive : MeetIcon}
                  alt="Meet Others"
                  className="icon"
                />
                <p className="label">Meet Others</p>
              </div>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <div className="nav-item">
                <img
                  src={isActive ? ProfileIconActive : ProfileIcon}
                  alt="Profile"
                  className="icon"
                />
                <p className="label">Profile</p>
              </div>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
