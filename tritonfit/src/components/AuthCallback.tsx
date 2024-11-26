import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function handleAuthToken(token: string) {
  localStorage.setItem('token', token);
}

export function AuthCallback() {
  const navigate = useNavigate();
  const { refreshUser, checkProfileStatus } = useAuth();

  useEffect(() => {
    const processAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        
        if (!token) {
          navigate('/', { replace: true });
          return;
        }

        localStorage.setItem('token', token);
        await refreshUser();
        
        const isProfileComplete = await checkProfileStatus();
        if (!isProfileComplete) {
          navigate('/createaccount', { replace: true });
        } else {
          navigate('/home', { replace: true });
        }

      } catch (error) {
        console.error('Auth processing error:', error);
        navigate('/', { replace: true });
      }
    };

    processAuth();
  }, [navigate, refreshUser, checkProfileStatus]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );
}