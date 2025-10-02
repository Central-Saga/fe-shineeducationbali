import { apiRequest } from '../api';
import { normalizeApiResponse } from '../api-utils';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
  phone?: string;
  avatar?: string;
  last_active?: string;
  permissions?: string[];
  department?: string;
  position?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  status?: string;
  phone?: string;
  department?: string;
  position?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  phone?: string;
  department?: string;
  position?: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data?: User | User[];
  user?: User;
}

export interface UsersListResponse {
  success: boolean;
  message: string;
  data?: User | User[] | {
    users: User[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
  };
}

export const userService = {
  // Get all users with pagination and filters
  async getUsers(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    role?: string;
    status?: string;
  }): Promise<UsersListResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.role) queryParams.append('role', params.role);
      if (params?.status) queryParams.append('status', params.status);

      const endpoint = `/api/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      console.log('Fetching users from:', endpoint);
      
      const response = await apiRequest<unknown>('GET', endpoint);
      console.log('Raw users response:', response);
      
      // Normalize the response to ensure consistent format
      const normalizedResponse = normalizeApiResponse<User[]>(response);
      console.log('Normalized users response:', normalizedResponse);
      
      return normalizedResponse;
    } catch (error: unknown) {
      console.error('Get users error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data users';
      throw new Error(errorMessage);
    }
  },

  // Get single user by ID
  async getUserById(id: number): Promise<UserResponse> {
    try {
      const response = await apiRequest<UserResponse>('GET', `/api/users/${id}`);
      return response;
    } catch (error: unknown) {
      console.error('Get user by ID error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data user';
      throw new Error(errorMessage);
    }
  },

  // Create new user
  async createUser(userData: CreateUserRequest): Promise<UserResponse> {
    try {
      const response = await apiRequest<UserResponse>('POST', '/api/users', userData);
      return response;
    } catch (error: unknown) {
      console.error('Create user error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat membuat user';
      throw new Error(errorMessage);
    }
  },

  // Update user
  async updateUser(id: number, userData: UpdateUserRequest): Promise<UserResponse> {
    try {
      const response = await apiRequest<UserResponse>('PUT', `/api/users/${id}`, userData);
      return response;
    } catch (error: unknown) {
      console.error('Update user error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengupdate user';
      throw new Error(errorMessage);
    }
  },

  // Delete user
  async deleteUser(id: number): Promise<UserResponse> {
    try {
      const response = await apiRequest<UserResponse>('DELETE', `/api/users/${id}`);
      return response;
    } catch (error: unknown) {
      console.error('Delete user error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat menghapus user';
      throw new Error(errorMessage);
    }
  },

  // Get users by role
  async getUsersByRole(role: string, params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
  }): Promise<UsersListResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('role', role);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);

      const endpoint = `/api/users?${queryParams.toString()}`;
      console.log('Fetching users by role from:', endpoint);
      
      const response = await apiRequest<unknown>('GET', endpoint);
      console.log('Raw users by role response:', response);
      
      // Normalize the response to ensure consistent format
      const normalizedResponse = normalizeApiResponse<User[]>(response);
      console.log('Normalized users by role response:', normalizedResponse);
      
      return normalizedResponse;
    } catch (error: unknown) {
      console.error('Get users by role error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data users';
      throw new Error(errorMessage);
    }
  }
};
