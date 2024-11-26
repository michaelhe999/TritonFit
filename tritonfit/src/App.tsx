import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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
import { AuthProvider, useAuth } from './contexts/AuthContext';

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
    <>
      {children}
      {user && <Navbar />}
    </>
  );
};

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <TokenHandler />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={user ? <Navigate to="/home" replace /> : <SignIn />} />
        <Route path="/auth-error" element={<div>Authentication Error</div>} />

        {/* Protected routes */}
        <Route path="/createaccount" element={
          <ProtectedRoute>
            <CreateAccount />
          </ProtectedRoute>
        } />
        <Route path="/home" element={
          <ProtectedRoute>
            <WithNavbar>
              <Home />
            </WithNavbar>
          </ProtectedRoute>
        } />

        {/* Other protected routes */}
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
        <Route path="/recommendedWorkouts" element={
          <ProtectedRoute>
            <WithNavbar>
              <RecommendedWorkouts />
            </WithNavbar>
          </ProtectedRoute>
        } />
        <Route path="/exercises" element={
          <ProtectedRoute>
            <WithNavbar>
              <ExercisesPage />
            </WithNavbar>
          </ProtectedRoute>
        } />
        <Route path="/createWorkout" element={
          <ProtectedRoute>
            <WithNavbar>
              <CreateWorkout />
            </WithNavbar>
          </ProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;