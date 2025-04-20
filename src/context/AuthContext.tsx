
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
      // TODO: Replace this with your actual API call
      // Example API call structure:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      
      // For now, using mock data
      const mockUser = {
        id: "1",
        email,
        role: email.split("@")[0] as UserRole, // Extracts role from email
        name: "John Doe"
      };
      
      // TODO: Store the token from your API response
      // localStorage.setItem('token', data.token);
      
      setUser(mockUser);
      
      // Redirect based on role
      switch (mockUser.role) {
        case "tester":
          navigate("/tester/dashboard");
          break;
        case "manager":
          navigate("/manager/dashboard");
          break;
        case "customer":
          navigate("/customer/dashboard");
          break;
        case "sales":
          navigate("/sales/dashboard");
          break;
        case "reception":
          navigate("/reception/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    // TODO: Call your logout API endpoint if needed
    // TODO: Remove token from localStorage
    // localStorage.removeItem('token');
    setUser(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
