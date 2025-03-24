'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    // Check for token in cookies
    const checkAuth = async () => {
      try {
        const token = Cookies.get('authToken');
        
        if (token) {
          // In a real app, you would validate the token with your API
          // For demo, we'll create a mock user if token exists
          setUser({
            id: '1',
            name: 'Usuario Demo',
            email: 'usuario@ejemplo.com'
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, always "succeed" with mock user
      const mockUser: User = {
        id: '1',
        name: 'Usuario Demo',
        email: email,
      };

      // Store auth token in cookies
      Cookies.set('authToken', 'demo-token', { expires: 7 }); // Expires in 7 days
      
      setUser(mockUser);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we'd make an API request here
      router.push('/login');
    } catch (error) {
      console.error('Register error:', error);
      throw new Error('Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove auth token from cookies
      Cookies.remove('authToken');
      
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Recover password function
  const recoverPassword = async (email: string) => {
    try {
      // Simulate API call to send recovery email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, the API would:
      // 1. Generate a token and store it in the database with an expiry
      // 2. Send an email with a link containing the token
      console.log(`Recovery email would be sent to: ${email}`);
      
      // Success is handled in the component
    } catch (error) {
      console.error('Recover password error:', error);
      throw new Error('Error al enviar el correo de recuperación');
    }
  };

  // Reset password function
  const resetPassword = async (token: string, newPassword: string) => {
    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, the API would:
      // 1. Verify the token is valid and not expired
      // 2. Update the user's password
      // 3. Invalidate the token
      console.log(`Password would be reset with token: ${token}`);
      
      // Success is handled in the component
    } catch (error) {
      console.error('Reset password error:', error);
      throw new Error('Error al restablecer la contraseña');
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    recoverPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 