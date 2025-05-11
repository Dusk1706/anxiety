'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { authService } from '../../services/auth.service';

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
          const userData = Cookies.get('userData');
          if (userData) {
            setUser(JSON.parse(userData));
          }
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
      const response = await authService.login({
        email,
        password
      });

      // Handle response
      if (response.status === 'error') {
        throw new Error(response.error || 'Error al iniciar sesión');
      }

      if (response.status === 'success' && response.token && response.user) {
        // Store auth token and user data
        Cookies.set('authToken', response.token, { expires: 7 });
        
        // Create a user object with the required fields
        const user = {
          id: response.user.id.toString(), // Convert number to string to match User interface
          email: response.user.email,
          name: email.split('@')[0] // Use email prefix as name if not provided
        };
        
        // Store user data
        Cookies.set('userData', JSON.stringify(user), { expires: 7 });
        setUser(user);
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        throw new Error('No se recibieron datos de respuesta');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error instanceof Error ? error : new Error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authService.register({
        name,
        email,
        password
      });

      // Handle response
      if (response.status === 'error') {
        throw new Error(response.error || 'Error al registrarse');
      }

      if (response.status === 'success' && response.token && response.user) {
        // Store token
        Cookies.set('authToken', response.token, { expires: 7 });
        
        // Create a user object with the required fields
        const user = {
          id: response.user.id.toString(), // Convert number to string to match User interface
          email: response.user.email,
          name: name // Use the name from the form since it's not returned by the backend
        };
        
        // Store user data
        Cookies.set('userData', JSON.stringify(user), { expires: 7 });
        setUser(user);
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        throw new Error('No se recibieron datos de respuesta');
      }
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
      await authService.logout();
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