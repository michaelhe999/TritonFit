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

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const destination = params.get('destination') || '/home';
    
    if (token) {
      console.log('Token received in callback');
      localStorage.setItem('token', token);
      navigate(destination);
    } else {
      console.log('No token received in callback');
      navigate('/');
    }
  }, [navigate]);

  return <div>Processing your sign in...</div>;
}

function AppRoutes() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Always allow these paths
  const publicPaths = ['/', '/auth-callback'];
  const isPublicPath = publicPaths.includes(location.pathname);

  // Redirect to sign in if trying to access protected route without auth
  if (!user && !isPublicPath) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<SignIn />} />
      <Route path="/auth-callback" element={<AuthCallback />} />

      {/* Protected routes */}
      <Route path="/home" element={
        <ProtectedRoute>
          <WithNavbar>
            <Home />
          </WithNavbar>
        </ProtectedRoute>
      } />
      <Route path="/createaccount" element={
        <ProtectedRoute>
          <CreateAccount />
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