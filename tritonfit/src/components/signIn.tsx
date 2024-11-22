import { useNavigate } from 'react-router-dom';
import appLogo from '../assets/appLogo.png';
import styles from '../views/signIn.module.css';


export const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = () =>{
    navigate('/createAccount')
  }

  return (
    <div className={styles.SignIn}>
      <img src={appLogo} alt="App Logo" className={styles['app-logo']} />
      <h1 className={styles.title}>TritonFit</h1>
      <button  onClick={handleSubmit} className={styles.button}>
        Sign in with Google
      </button>
    </div>
  );
};

