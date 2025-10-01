import { apiRequest } from '../api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  namaLengkap: string;
  email: string;
  password: string;
  noTelepon: string;
  alamat: string;
  sekolahAsal: string;
  namaOrangTua: string;
  noOrangTua: string;
  tanggalLahir: string;
  role?: string;
}

export interface AuthResponse {
  success?: boolean;
  message: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  token?: string;
  data?: {
    user: {
      id: string;
      nama: string;
      email: string;
      role: string[];
      permissions: string[];
    };
    token: string;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('Attempting login with credentials:', { email: credentials.email });
      // Koneksi langsung ke backend Laravel
      const response = await apiRequest<AuthResponse>(
        'POST',
        '/api/login',
        credentials
      );
      console.log('Login response received:', response);
      return response;
    } catch (error: unknown) {
      console.error('Login error details:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat login';
      throw new Error(errorMessage);
    }
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      // Koneksi langsung ke backend Laravel
      const response = await apiRequest<AuthResponse>(
        'POST',
        '/api/register',
        userData
      );
      return response;
    } catch (error: unknown) {
      console.error('Register error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mendaftar';
      throw new Error(errorMessage);
    }
  },

  async logout(): Promise<void> {
    try {
      await apiRequest('POST', '/api/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  async getProfile(): Promise<AuthResponse> {
    try {
      const response = await apiRequest<AuthResponse>(
        'GET',
        '/api/profile'
      );
      return response;
    } catch (error: unknown) {
      console.error('Get profile error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil profil';
      throw new Error(errorMessage);
    }
  }
};

