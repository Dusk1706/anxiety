'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

interface User {
  id: string;
  email: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check auth state on initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check both cookies and localStorage
      const token = Cookies.get('token') || localStorage.getItem('token');
      
      if (token) {
        console.log('Found token, setting authenticated state');
        setIsAuthenticated(true);
        
        // Try to get user data
        const userStr = localStorage.getItem('user');
        if (userStr) {
          try {
            setUser(JSON.parse(userStr));
          } catch (e) {
            console.error('Failed to parse user data');
          }
        }
      }
      
      setIsInitialized(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Use full URL during development, relative in production
      const url = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8080/api/auth/login'
        : '/api/auth/login';
        
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      
      // Store token in both localStorage and cookie
      localStorage.setItem('token', data.token);
      Cookies.set('token', data.token, { expires: 1 }); // 1 day expiry
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update state
      setUser(data.user);
      setIsAuthenticated(true);
      
      // Navigate to dashboard
      console.log('Redirecting to dashboard...');
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Use full URL during development, relative in production
      const url = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8080/api/auth/register'
        : '/api/auth/register';
        
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      
      // Store token in both localStorage and cookie
      localStorage.setItem('token', data.token);
      Cookies.set('token', data.token, { expires: 1 }); // 1 day expiry
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update state
      setUser(data.user);
      setIsAuthenticated(true);
      
      // Navigate to dashboard
      console.log('Redirecting to dashboard after registration...');
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Remove token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Cookies.remove('token');
    
    // Update state
    setUser(null);
    setIsAuthenticated(false);
    
    // Redirect to login
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, loading, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);