import appLogo from '../assets/appLogo.png';
import styles from './signIn.module.css';

export const SignIn = () => {
  const handleGoogleSignIn = () => {
    // Use full URL to ensure it goes to backend
    const authUrl = 'http://localhost:5001/auth/google';
    console.log('Redirecting to:', authUrl);
    window.location.href = authUrl;
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