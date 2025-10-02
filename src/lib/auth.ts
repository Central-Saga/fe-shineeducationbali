// Auth utility functions
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  // Coba ambil dari localStorage dulu
  let token = localStorage.getItem('auth_token');
  
  // Jika tidak ada, coba ambil dari cookie
  if (!token) {
    const cookies = document.cookie.split(';');
    const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith('access_token='));
    if (accessTokenCookie) {
      token = accessTokenCookie.split('=')[1];
      // Simpan ke localStorage untuk penggunaan selanjutnya
      localStorage.setItem('auth_token', token);
    }
  }
  
  return token;
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const clearAuth = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('auth_token');
  localStorage.removeItem('pengguna');
  document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'data_pengguna=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

export const getUserData = (): any | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const userData = localStorage.getItem('pengguna');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};
