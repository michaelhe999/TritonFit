import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./views/Home";
import { FindAWorkout } from "./views/FindAWorkout";
import MeetOthers from "./components/dummy-pages/MeetOthers";
import Profile from "./components/dummy-pages/Profile";
import { RecommendedWorkouts } from "./views/RecommendedWorkouts";
import { ExercisesPage } from "./components/ExercisesPage";

const App: React.FC = () => {
  return (
    <Router>
      {/* Navbar included for these routes */}
      <Routes>
        <Route path="/" 
          element={
            <>
              <Home />
              <Navbar />
            </>
          }
        />
        <Route path="/findworkout"
          element={
            <>
              <FindAWorkout />
              <Navbar />
            </>
          }
        />
        <Route path="/meetothers"
          element={
            <>
              <MeetOthers />
              <Navbar />
            </>
          }
        />
        <Route path="/profile"
          element={
            <>
              <Profile />
              <Navbar />
            </>
          }
        />
      </Routes>

      {/* Routes that don't include the Navbar */}
      <Routes>
        <Route path="/recommendedWorkouts" element={<RecommendedWorkouts />} />
        <Route path="/exercises" element={<ExercisesPage />} />
      </Routes>
    </Router>

  );
};

export default App;
