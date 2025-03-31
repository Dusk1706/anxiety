/**
 * API Service for handling backend requests
 */

const API_URL = 'http://127.0.0.1:8080';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Base API service for handling HTTP requests
 */
export const api = {
  /**
   * Make a POST request to the API
   */
  post: async <T>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include', // Include cookies in requests
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Error en la solicitud');
      }
      
      return result;
    } catch (error) {
      console.error('API error:', error);
      return { 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  },

  /**
   * Make a GET request to the API
   */
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in requests
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Error en la solicitud');
      }
      
      return result;
    } catch (error) {
      console.error('API error:', error);
      return { 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }
};
