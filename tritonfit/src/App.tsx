import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CreateWorkout } from './views/CreateWorkout'
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./views/Home";
import { FindAWorkout } from "./views/FindAWorkout";
import MeetOthers from "./components/dummy-pages/MeetOthers";
import { ProfileTab } from "./views/ProfileTab";
import { ProfilePage } from "./views/ProfilePage";
import { RecommendedWorkouts } from "./views/RecommendedWorkouts";
import { ExercisesPage } from "./components/ExercisesPage";
import { CreateAccount } from "./views/createAccount";
import { SignIn } from "./views/signIn";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
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
              <div className="profileView">
                <ProfileTab />
                <Navbar />
              </div>
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
            <Route path="/edit-profile"
            element={
              <div className="profileView">
                <ProfilePage />
              </div>
            }
            />
        </Routes>
      </div>
    </Router>

  );
};

export default App;
