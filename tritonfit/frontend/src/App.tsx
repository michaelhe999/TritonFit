import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './components/Home';
import './App.css';

function HomePage() {
  const { user, loading, login, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>TritonFit</h1>
        {user ? (
          <div>
            <img 
              src={user.picture} 
              alt={user.name} 
              style={{ borderRadius: '50%', width: 50, height: 50 }}
            />
            <p>Welcome, {user.name}!</p>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={login}  // Use the login function from AuthContext
          >
            Sign in with Google
          </button>
        )}
      </header>
    </div>
  );
}

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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth-callback" element={<AuthCallback />} />
          {/* Redirect /auth/google to the backend URL */}
          <Route path="/auth/google" element={<RedirectToGoogleAuth />} />
          <Route path="/home" element={<Home />} />
          {/* Fallback route to redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;