import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UserData {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  isProfileComplete: boolean;
  // Add other user fields as needed
}

export const useUserData = (fields?: string[]) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        // Construct the URL with optional fields
        const url = fields?.length 
          ? `http://localhost:5001/api/user/profile?fields=${fields.join(',')}`
          : 'http://localhost:5001/api/user/me';

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const result = await response.json();
        setUserData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, fields]);

  return { userData, loading, error };
};