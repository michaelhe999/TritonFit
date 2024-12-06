
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProfileTab } from "./views/ProfileTab";
import { ProfilePage } from "./views/ProfilePage";

// Token handler component
const TokenHandler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const handleToken = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const error = params.get('error');

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload();
    } else {
      navigate("/");
    }
  }, [navigate]);

      if (error) {
        console.error('Auth error:', error);
        navigate('/', { replace: true });
        return;
      }

      if (token) {
        try {
          // Store token
          localStorage.setItem('token', token);
          
          // Refresh user data
          await refreshUser();
          
          // Get user data to check profile completion
          const response = await fetch('http://localhost:5001/auth/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const userData = await response.json();
          
          // Remove token from URL and navigate
          const targetPath = userData.isProfileComplete ? '/home' : '/createaccount';
          navigate(targetPath, { replace: true });
        } catch (error) {
          console.error('Error processing token:', error);
          localStorage.removeItem('token');
          navigate('/', { replace: true });
        }
      }
    };

    handleToken();
  }, [location, navigate, refreshUser]);

  return null;
};

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }
  
  return user ? <>{children}</> : null;
};

// Layout component with navbar
const WithNavbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  return (
    <Router>
      {/* Navbar included for these routes */}
      <div className="app-content">
        <Routes>
          <Route path="/" element={
        loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : user ? (
          <Navigate to="/home" replace />
        ) : (
          <SignIn />
        )
      } />
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
        <Route path="/signin" element={<SignIn />} />
        <Route path="/createWorkout" element={<CreateWorkout />} />
        <Route path="/edit-profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;