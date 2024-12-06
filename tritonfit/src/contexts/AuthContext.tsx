import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
interface User {
  _id: string;
  email: string;
  name?: string;
  isProfileComplete?: boolean;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void; // Add setter for direct user updates
  checkProfileStatus: () => Promise<boolean>;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Create context with more complete default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
  logout: () => {},
  isAuthenticated: false,
  setUser: () => {},
  checkProfileStatus: async () => false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        
        // If user data is loaded successfully and we're on the loading page,
        // redirect to home
        if (window.location.pathname === '/') {
          window.location.href = '/home';
        }
        
        return userData;
      } else {
        if (response.status === 401) {
          console.log('Token invalid, logging out');
          logout();
        }
        throw new Error('Failed to load user');
      }
    } catch (error) {
      console.error('Error loading user:', error);
      logout();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const checkProfileStatus = async (): Promise<boolean> => {
    try {
      const userData = await loadUser();
      return userData?.isProfileComplete ?? false;
    } catch (error) {
      console.error('Error checking profile status:', error);
      return false;
    }
  };

  // Keep your existing functions, but update refreshUser
  const refreshUser = async () => {
    setLoading(true);
    try {
      const userData = await loadUser();
      if (userData) {
        // If we successfully loaded user data, check if we should redirect
        if (window.location.pathname === '/') {
          window.location.href = '/home';
        }
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  // Update your logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Only redirect to signin if we're not already there
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    }
  };

  // Load user on mount and token changes
  useEffect(() => {
    loadUser();
  }, []);

  // Add event listener for storage changes (handles logout in other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        if (!e.newValue) {
          setUser(null);
        } else if (e.newValue !== localStorage.getItem('token')) {
          loadUser();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Token expiration check
  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_URL}/auth/verify`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (!response.ok) {
            logout();
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          logout();
        }
      }
    };

    // Check token validity periodically
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000); // Every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      refreshUser,
      logout,
      isAuthenticated: !!user,
      setUser, 
      checkProfileStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Update your withAuth HOC
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const { user, loading } = useAuth();
    
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    if (!user) {
      // If no user is found after loading, redirect to signin
      window.location.href = '/';
      return null;
    }
    
    // If we have a user but we're on the signin page, redirect to home
    if (window.location.pathname === '/') {
      window.location.href = '/home';
      return null;
    }
    
    return <WrappedComponent {...props} />;
  };
};
