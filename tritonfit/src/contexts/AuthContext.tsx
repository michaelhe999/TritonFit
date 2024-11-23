import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  _id: string;
  googleId: string;
  email: string;
  name: string;
  picture: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  handleAuthCallback: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  handleAuthCallback: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    }
    setLoading(false);
  };

  const handleAuthCallback = async (token: string) => {
    try {
      localStorage.setItem('token', token);
      await checkAuth(); // Fetch user data with the new token
      window.location.replace('/home'); // Redirect to home after successful auth
    } catch (error) {
      console.error('Error handling auth callback:', error);
      localStorage.removeItem('token');
      window.location.replace('/'); // Redirect to signin on error
    }
  };

  const login = () => {
    window.location.href = 'http://localhost:5001/auth/google';
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.replace('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, handleAuthCallback }}>
      {children}
    </AuthContext.Provider>
  );
};