
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types
export type UserRole = 'sales' | 'reception' | 'tester' | 'manager' | 'customer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a hook for easy context use
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: '1',
    name: 'Test User',
    email: 'tester@example.com',
    role: 'tester',
  });

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    console.log('Logging in with:', email, password);
    
    // Simulate successful login
    setCurrentUser({
      id: '1',
      name: 'Test User',
      email: email,
      role: 'tester',
    });
  };

  // Mock logout function
  const logout = () => {
    setCurrentUser(null);
  };

  // Function to switch roles (for demo purposes)
  const switchRole = (role: UserRole) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        role,
      });
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
