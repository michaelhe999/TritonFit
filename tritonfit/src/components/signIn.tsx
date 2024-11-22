import { useNavigate } from 'react-router-dom';
import '../views/signIn.css'
import appLogo from '../assets/appLogo.png';

export const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = () =>{
    navigate('/createAccount')
  }


  return (
    <div>
      <img src={appLogo} className="app-logo"/>
      <h1>TritonFit</h1>
      <button onClick={handleSubmit}> Sign in with Google </button>
    </div>
    
  )
};
