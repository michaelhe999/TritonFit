import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CreateWorkout } from './views/CreateWorkout'
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./components/Home";
import { FindAWorkout } from "./views/FindAWorkout";
import MeetOthers from "./components/MeetOthers";
import Profile from "./components/Profile";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/findworkout" element={<FindAWorkout />} />
          <Route path="/meetothers" element={<MeetOthers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createWorkout" element={<CreateWorkout />} />
        </Routes>
      </div>

      <Navbar />
    </Router>
  );
};

export default App;