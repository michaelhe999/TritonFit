import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { CreateWorkout } from "./views/CreateWorkout";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./views/Home";
import { FindAWorkout } from "./views/FindAWorkout";
import MeetOthers from "./views/MeetOthers";
import { RecommendedWorkouts } from "./views/RecommendedWorkouts";
import { ExercisesPage } from "./components/WorkoutRelated/ExercisesPage";
import { CreateAccount } from "./views/createAccount";
import { SignIn } from "./views/signIn";
import { ProfileTab } from "./views/ProfileTab";
import { ProfilePage } from "./views/ProfilePage";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload();
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <div>Processing login...</div>;
}

function RedirectToGoogleAuth() {
  useEffect(() => {
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/google`;
  }, []);

  return null;
}

const App: React.FC = () => {
  return (
    <Router>
      {/* Navbar included for these routes */}
      <div className="app-content">
        <Routes>
          <Route
            path="/home"
            element={
              <>
                <div className="content-container">
                  <Home />
                </div>
                <Navbar />
              </>
            }
          />
          <Route
            path="/findworkout"
            element={
              <>
                <div className="content-container">
                  <FindAWorkout />
                </div>

                <Navbar />
              </>
            }
          />
          <Route
            path="/meetothers"
            element={
              <>
                <div className="content-container">
                  <MeetOthers />
                </div>

                <Navbar />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <div className="content-container">
                  <ProfileTab />
                </div>

                <Navbar />
              </>
            }
          />
          <Route
            path="/exercises"
            element={
              <>
                <div className="content-container">
                  <ExercisesPage />
                </div>
                <Navbar />
              </>
            }
          />
        </Routes>
      </div>
      {/* Routes that don't include the Navbar */}
      <Routes>
        <Route path="/recommendedWorkouts" element={<RecommendedWorkouts />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/createWorkout" element={<CreateWorkout />} />
        <Route path="/edit-profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;