import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./views/Home";
import { FindAWorkout } from "./views/FindAWorkout";
import MeetOthers from "./components/dummy-pages/MeetOthers";
import Profile from "./components/dummy-pages/Profile";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/findworkout" element={<FindAWorkout />} />
            <Route path="/meetothers" element={<MeetOthers />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        <Navbar />
      </div>
    </Router>
  );
};

export default App;
