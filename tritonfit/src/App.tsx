import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CreateWorkout } from './views/CreateWorkout';
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

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  return <div>Processing login...</div>;
}

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Sign In as root route */}
        <Route path="/" element={<SignIn />} />
        
        {/* Auth callback route */}
        <Route path="/auth-callback" element={<AuthCallback />} />

        {/* Main app routes */}
        <Route path="/home" element={
          <>
            <Home />
            <Navbar />
          </>
        } />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/findworkout" element={
          <>
            <FindAWorkout />
            <Navbar />
          </>
        } />
        <Route path="/meetothers" element={
          <>
            <MeetOthers />
            <Navbar />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Profile />
            <Navbar />
          </>
        } />
        <Route path="/recommendedWorkouts" element={<RecommendedWorkouts />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/createWorkout" element={<CreateWorkout />} />
      </Routes>
    </Router>
  );
};

export default App;