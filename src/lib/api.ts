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
  
  // Log untuk debugging
  console.log(`API Request: ${method} ${baseUrl}${endpoint}`);
  console.log(`Full URL: ${baseUrl}${endpoint}`);

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
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
        data: errorData
      });
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
