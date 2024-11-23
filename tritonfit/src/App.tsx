import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CreateWorkout } from './views/CreateWorkout'
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./views/Home";
import { FindAWorkout } from "./views/FindAWorkout";
import MeetOthers from "./components/dummy-pages/MeetOthers";
import Profile from "./components/dummy-pages/Profile";
import { RecommendedWorkouts } from "./views/RecommendedWorkouts";
import { ExercisesPage } from "./components/ExercisesPage";
import { CreateAccount } from "./views/createAccount";
import { SignIn } from "./views/signIn";

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
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/createWorkout" element={<CreateWorkout />} />
      </Routes>
    </Router>

  );
};

export default App;
