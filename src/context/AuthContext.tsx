
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'tester' | 'sales' | 'reception' | 'manager' | 'customer';

interface User {
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>({
    name: 'Test User',
    email: 'tester@example.com',
    role: 'tester'
  });

  const login = async (email: string, password: string) => {
    // This would normally validate credentials with a backend
    setCurrentUser({
      name: 'Test User',
      email: email,
      role: 'tester'
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        role: role
      });
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
