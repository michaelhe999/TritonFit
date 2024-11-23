import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function handleAuthToken(token: string) {
  localStorage.setItem('token', token);
}

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const destination = params.get('destination');
    
    if (token) {
      console.log('Token received, storing in localStorage');
      handleAuthToken(token);
      
      // Always navigate to createaccount for now
      navigate('/createaccount', { replace: true });
    } else {
      console.log('No token received, redirecting to signin');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return <div>Processing your sign in...</div>;
}