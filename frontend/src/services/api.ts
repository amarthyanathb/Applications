const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export interface DemoRequestData {
  email: string;
  company_name: string;
  full_name: string;
  message?: string;
}

export interface ApiResponse {
  message: string;
  id?: number;
}

export const apiService = {
  submitDemoRequest: async (data: DemoRequestData): Promise<ApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/demo-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  },

  getDemoRequests: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/api/demo-requests`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  },

  healthCheck: async (): Promise<{ status: string }> => {
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  },
};