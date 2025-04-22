
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from '@/lib/axios';


export type UserRole = "tester" | "manager" | "customer" | "sales" | "reception";

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        '/auth/login',
        { email, password },
        { withCredentials: true } 
      );
  
      const data = response.data;
  
      const user = {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        name: data.user.name,
      };
  
      setUser(user);
      navigate(`/${user.role.toLowerCase()}/dashboard`);
      toast.success('Logged in successfully');
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.warn('Logout failed on server');
    }
  
    setUser(null);
    navigate('/');
    toast.success("Logged out successfully");
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
