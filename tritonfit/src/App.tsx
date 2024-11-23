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
import { AuthCallback, handleAuthToken } from './components/AuthCallback';

// Protected Route component that checks for authentication
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? <>{children}</> : null;
};

// Layout component to handle common layout with navbar
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check current route for token
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token && location.pathname !== '/auth-callback') {
      console.log('Token found in URL, storing and removing');
      handleAuthToken(token);
      // Remove token from URL
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<SignIn />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
      <Route path="/auth-error" element={<div>Authentication Error</div>} />

      {/* Protected routes */}
      <Route path="/createaccount" element={
        user ? <CreateAccount /> : <Navigate to="/" replace />
      } />
      <Route path="/home" element={
        user ? (
          <>
            <Home />
            <Navbar />
          </>
        ) : <Navigate to="/" replace />
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
  );
}

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