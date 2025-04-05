import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useDemo } from "./DemoContext";

interface User {
  id: string;
  email: string;
  name: string;
  isDemo?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo user credentials
const DEMO_USER = {
  id: "demo-user-1",
  email: "john@demo.fr",
  name: "John Demo",
  isDemo: true
};

// Mock users database (will be replaced with real DB later)
const MOCK_USERS = [
  DEMO_USER
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { isDemoMode, toggleDemoMode } = useDemo();
  
  const isAuthenticated = user !== null;

  // Check if user is logged in from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (isDemoMode) {
      // Auto-login with demo user if demo mode is active
      setUser(DEMO_USER);
    }
  }, [isDemoMode]);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo user login
    if (email === "john@demo.fr" && password === "demo") {
      setUser(DEMO_USER);
      toggleDemoMode(); // Enable demo mode
      navigate("/dashboard");
      return true;
    }
    
    // Mock login logic (will be replaced with real auth later)
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser) {
      // In a real app, we would verify the password here
      setUser(foundUser);
      navigate("/dashboard");
      return true;
    }
    
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if user already exists
    const userExists = MOCK_USERS.some(u => u.email === email);
    if (userExists) {
      return false;
    }
    
    // In a real app, we would create the user in the database
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name
    };
    
    // Add to mock database (this would be a DB operation in a real app)
    MOCK_USERS.push(newUser);
    
    // Log in the new user
    setUser(newUser);
    navigate("/dashboard");
    return true;
  };

  const logout = () => {
    setUser(null);
    if (isDemoMode) {
      toggleDemoMode(); // Disable demo mode on logout
    }
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated,
      login,
      logout,
      signup
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
