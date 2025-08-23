import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  // add other fields as needed
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  fetchCurrentUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Fetch logged-in user from backend
  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/me', { withCredentials: true });
      setCurrentUser(res.data);
    } catch (err) {
      console.error('Error fetching current user:', err);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, fetchCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
