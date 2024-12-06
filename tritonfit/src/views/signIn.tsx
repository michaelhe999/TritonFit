import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import appLogo from '../assets/appLogo.png';
import styles from './signIn.module.css';

export const SignIn = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      const authUrl = 'http://localhost:5001/auth/google';
      console.log('Attempting to redirect to:', authUrl);
      
      // First try to ping the server
      const response = await fetch('http://localhost:5001/test', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (response.ok) {
        console.log('Server is accessible, proceeding with redirect');
        window.location.replace(authUrl);
      } else {
        console.error('Server is not accessible');
      }
    } catch (error) {
      console.error('Error initiating Google sign in:', error);
    }
  };

  return (
    <div className={styles.SignIn}>
      <img src={appLogo} alt="App Logo" className={styles['app-logo']} />
      <h1 className={styles.title}>TritonFit</h1>
      <button 
        onClick={handleGoogleSignIn} 
        className={styles.button}
      >
        Sign in with Google
      </button>
    </div>
  );
};