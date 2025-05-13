import { api } from './api.service';
import Cookies from 'js-cookie';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  status: 'success' | 'error';
  token?: string;
  user?: {
    email: string;
    id: number;
  };
  message?: string;
  error?: string;
}

/**
 * Authentication service for user management
 */
export const authService = {
  /**
   * Register a new user
   */
  register: async (registerData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/register', registerData);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    // Store token and user data
    if (response.token) {
      Cookies.set('authToken', response.token, { expires: 7 });
      // Store user data in cookie as JSON string
      if (response.user) {
        Cookies.set('userData', JSON.stringify(response.user), { expires: 7 });
      }
    }
    
    return response;
  },

  /**
   * Login a user
   */
  login: async (loginData: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/api/auth/login', loginData);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Store token and user data if provided
      if (response.token) {
        // Store in cookies and localStorage for consistency
        Cookies.set('authToken', response.token, { expires: 7 });
        localStorage.setItem('authToken', response.token);
        
        // Store user data
        if (response.user) {
          Cookies.set('userData', JSON.stringify(response.user), { expires: 7 });
          localStorage.setItem('userData', JSON.stringify(response.user));
        }
      } else {
        // If no token is provided, the login was not successful
        throw new Error('Authentication failed: No token received');
      }
      
      return response;
    } catch (error) {
      // Handle specific API errors vs JSON parsing errors
      if (error instanceof SyntaxError) {
        console.error('Failed to parse login response:', error);
        throw new Error('Server returned invalid data');
      } else if (error instanceof Error) {
        // Re-throw the original error
        throw error;
      } else {
        // Handle unknown errors
        throw new Error('An unknown error occurred during login');
      }
    }
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    try {
      // Call logout endpoint if exists
      await api.post('/api/auth/logout', {});
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always remove both token and user data even if API call fails
      Cookies.remove('authToken');
      Cookies.remove('userData');
      
      // Also clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<User | null> => {
    try {
      // Intenta obtener el token de cookies primero, luego de localStorage como respaldo
      let token = Cookies.get('authToken');
      if (!token) {
        const localToken = localStorage.getItem('authToken');
        if (!localToken) {
          return null;
        }
        token = localToken;
      }
      
      // Intenta obtener datos de usuario de cookies primero, luego de localStorage
      let userData = Cookies.get('userData');
      if (!userData) {
        const localUserData = localStorage.getItem('userData');
        if (!localUserData) {
          return null;
        }
        userData = localUserData;
      }
      
      return JSON.parse(userData) as User;
    } catch (error) {
      // More specific error handling
      if (error instanceof Error) {
        console.error(`Authentication service error: ${error.message}`);
      } else {
        console.error('Unknown authentication error occurred');
      }
      // Return null on any error to prevent app crashes
      return null;
    }
  }
};
