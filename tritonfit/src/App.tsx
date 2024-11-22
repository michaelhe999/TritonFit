import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./components/Home";
import { FindAWorkout } from "./views/FindAWorkout";
import MeetOthers from "./components/MeetOthers";
import Profile from "./components/Profile";
import { RecommendedWorkouts } from "./views/RecommendedWorkouts";
import { ExercisesPage } from "./components/ExercisesPage";
import { CreateAccount } from "./components/createAccount";
import { SignIn } from "./components/signIn";

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
      </Routes>
    </Router>

  );
};

export default App;
