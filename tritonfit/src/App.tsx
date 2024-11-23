import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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

// Protected Route component that checks for authentication
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
};

// Layout component to handle common layout with navbar
const WithNavbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
};

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
      window.location.reload();
    } else {
      navigate('/');
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
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/auth/google" element={<RedirectToGoogleAuth />} />

        {/* Protected routes with Navbar */}
        <Route path="/" element={
          <ProtectedRoute>
            <WithNavbar>
              <Home />
            </WithNavbar>
          </ProtectedRoute>
        } />
        <Route path="/findworkout" element={
          <ProtectedRoute>
            <WithNavbar>
              <FindAWorkout />
            </WithNavbar>
          </ProtectedRoute>
        } />
        <Route path="/meetothers" element={
          <ProtectedRoute>
            <WithNavbar>
              <MeetOthers />
            </WithNavbar>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <WithNavbar>
              <Profile />
            </WithNavbar>
          </ProtectedRoute>
        } />

        {/* Protected routes without Navbar */}
        <Route path="/recommendedWorkouts" element={
          <ProtectedRoute>
            <RecommendedWorkouts />
          </ProtectedRoute>
        } />
        <Route path="/exercises" element={
          <ProtectedRoute>
            <ExercisesPage />
          </ProtectedRoute>
        } />
        <Route path="/createWorkout" element={
          <ProtectedRoute>
            <CreateWorkout />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;