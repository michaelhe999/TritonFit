import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appLogo from '../assets/appLogo.png';
import styles from './signIn.module.css';

export const SignIn = () => {
  const navigate = useNavigate();

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleGoogleSignIn = () => {
    // Redirect to your backend's Google auth endpoint
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/google`;
  };

  return (
    <div className={styles.SignIn}>
      <img src={appLogo} alt="App Logo" className={styles['app-logo']} />
      <h1 className={styles.title}>TritonFit</h1>
      <button onClick={handleGoogleSignIn} className={styles.button}>
        Sign in with Google
      </button>
    </div>
  );
};