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
  checkProfileStatus: () => Promise<boolean>; // Add profile status checker
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
        return userData; // Return user data for external use
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
      throw error; // Rethrow for external handling
    } finally {
      setLoading(false);
    }
  };

  // Check if user profile is complete
  const checkProfileStatus = async (): Promise<boolean> => {
    try {
      const userData = await loadUser();
      return userData?.isProfileComplete ?? false;
    } catch (error) {
      console.error('Error checking profile status:', error);
      return false;
    }
  };

  // Refresh user data - useful after profile updates
  const refreshUser = async () => {
    setLoading(true);
    try {
      await loadUser();
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  // Enhanced logout function with cleanup
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Clean up any other auth-related state here
    window.location.href = '/';
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

// Enhanced protected route HOC with loading state
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
      window.location.href = '/';
      return null;
    }
    
    return <WrappedComponent {...props} />;
  };
};