/**
 * API Service for handling backend requests
 */

const API_URL = 'http://localhost:8080';

interface ApiResponse {
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
 * Base API service for handling HTTP requests
 */
export const api = {
  /**
   * Make a POST request to the API
   */
  post: async <T = any>(endpoint: string, data: any): Promise<T> => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('authToken');
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      // Add Authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
        credentials: 'include', // Include cookies in requests
      });
      
      // If the response is not OK, extract the error message
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Credenciales inválidas');
        }
        
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || errorText);
        } catch {
          throw new Error(errorText || 'Error en la solicitud');
        }
      }
      
      const result = await response.json();
      return result as T;
    } catch (error) {
      console.error('API error:', error);
      throw new Error(error instanceof Error ? error.message : 'Error desconocido');
    }
  },

  /**
   * Make a GET request to the API
   */
  get: async <T = any>(endpoint: string): Promise<T> => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('authToken');
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      // Add Authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || errorText);
        } catch {
          throw new Error(errorText || 'Error en la solicitud');
        }
      }

      const result = await response.json();
      return result as T;
    } catch (error) {
      console.error('API error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(errorMessage);
    }
  }
};
