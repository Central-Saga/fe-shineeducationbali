interface FetchOptions extends RequestInit {
  credentials?: RequestCredentials;
}

export const apiRequest = async <T>(
  method: string,
  endpoint: string,
  data?: any,
  options?: FetchOptions
): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.shineeducationbali.com";

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      credentials: options?.credentials || "include",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Terjadi kesalahan pada server");
    }

    return response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
