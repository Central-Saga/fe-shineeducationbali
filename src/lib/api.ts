import { getAuthToken } from './auth';

interface FetchOptions extends RequestInit {
  credentials?: RequestCredentials;
}

export const apiRequest = async <T>(
  method: string,
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<T> => {
  // Koneksi langsung ke backend Laravel
  const baseUrl = "https://api.shineeducationbali.com";
  
  // Ambil token menggunakan utility function
  const token = getAuthToken();
  
  // Log untuk debugging
  console.log(`API Request: ${method} ${baseUrl}${endpoint}`);
  console.log(`Full URL: ${baseUrl}${endpoint}`);
  console.log(`Token available: ${!!token}`);
  if (token) {
    console.log(`Token preview: ${token.substring(0, 20)}...`);
  }
  
  // Jika tidak ada token dan endpoint memerlukan auth, berikan warning
  if (!token && !endpoint.includes('/login') && !endpoint.includes('/register')) {
    console.warn('No authentication token found. API request may fail.');
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...(token && { "Authorization": `Bearer ${token}` }),
        ...(options?.headers || {}),
      },
      // Untuk development, gunakan 'omit' untuk menghindari CORS issues
      credentials: 'omit',
      mode: 'cors',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
        url: `${baseUrl}${endpoint}`,
        token: token ? `${token.substring(0, 10)}...` : 'No token'
      });
      
      // Handle specific error cases
      if (response.status === 401) {
        // Clear invalid token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
        throw new Error("Sesi telah berakhir. Silakan login kembali.");
      }
      
      if (response.status === 422) {
        // Handle validation errors
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          throw new Error(`Validation Error: ${errorMessages.join(', ')}`);
        }
        throw new Error(errorData.message || "Data yang dikirim tidak valid. Periksa kembali form Anda.");
      }
      
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    // Jika error adalah network error, berikan pesan yang lebih jelas
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
    }
    throw error;
  }
};
