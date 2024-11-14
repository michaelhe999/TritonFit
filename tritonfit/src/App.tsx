import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./components/Home";
import FindWorkout from "./components/FindWorkout";
import MeetOthers from "./components/MeetOthers";
import Profile from "./components/Profile";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/findworkout" element={<FindWorkout />} />
          <Route path="/meetothers" element={<MeetOthers />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      <Navbar />
    </Router>
  );
};

export default App;
