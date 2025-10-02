import { apiRequest } from '../api';
import { normalizeApiResponse, extractApiData, isApiResponseSuccess, getApiErrorMessage } from '../api-utils';

export interface Role {
  id: number;
  name: string;
  description?: string;
  user_count?: number;
  permissions: string[];
  is_default?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: number;
  name: string;
  code: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissions: number[];
  is_default?: boolean;
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  permissions?: number[];
  is_default?: boolean;
}

export interface RoleResponse {
  success: boolean;
  message: string;
  data?: Role | Role[] | {
    roles: Role[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
  };
  role?: Role;
}

export interface PermissionResponse {
  success: boolean;
  message: string;
  data?: Permission | Permission[];
  permission?: Permission;
}

export interface RolesListResponse {
  success: boolean;
  message: string;
  data: {
    roles: Role[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
  };
}

export const roleService = {
  // Get all roles
  async getRoles(params?: {
    page?: number;
    per_page?: number;
    search?: string;
  }): Promise<RoleResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.search) queryParams.append('search', params.search);

      const endpoint = `/api/roles${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      console.log('Fetching roles from:', endpoint);
      
      const response = await apiRequest<any>('GET', endpoint);
      console.log('Raw roles response:', response);
      
      // Normalize the response to ensure consistent format
      const normalizedResponse = normalizeApiResponse<Role[]>(response);
      console.log('Normalized roles response:', normalizedResponse);
      
      return normalizedResponse;
    } catch (error: unknown) {
      console.error('Get roles error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data roles';
      throw new Error(errorMessage);
    }
  },

  // Get single role by ID
  async getRoleById(id: number): Promise<RoleResponse> {
    try {
      const response = await apiRequest<RoleResponse>('GET', `/api/roles/${id}`);
      return response;
    } catch (error: unknown) {
      console.error('Get role by ID error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data role';
      throw new Error(errorMessage);
    }
  },

  // Create new role
  async createRole(roleData: CreateRoleRequest): Promise<RoleResponse> {
    try {
      const response = await apiRequest<RoleResponse>('POST', '/api/roles', roleData);
      return response;
    } catch (error: unknown) {
      console.error('Create role error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat membuat role';
      throw new Error(errorMessage);
    }
  },

  // Update role
  async updateRole(id: number, roleData: UpdateRoleRequest): Promise<RoleResponse> {
    try {
      const response = await apiRequest<RoleResponse>('PUT', `/api/roles/${id}`, roleData);
      return response;
    } catch (error: unknown) {
      console.error('Update role error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengupdate role';
      throw new Error(errorMessage);
    }
  },

  // Delete role
  async deleteRole(id: number): Promise<RoleResponse> {
    try {
      const response = await apiRequest<RoleResponse>('DELETE', `/api/roles/${id}`);
      return response;
    } catch (error: unknown) {
      console.error('Delete role error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat menghapus role';
      throw new Error(errorMessage);
    }
  },

  // Get all permissions
  async getPermissions(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    category?: string;
  }): Promise<PermissionResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.category) queryParams.append('category', params.category);

      const endpoint = `/api/permissions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await apiRequest<PermissionResponse>('GET', endpoint);
      return response;
    } catch (error: unknown) {
      console.error('Get permissions error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data permissions';
      throw new Error(errorMessage);
    }
  },

  // Get permissions for a specific role
  async getRolePermissions(roleId: number): Promise<PermissionResponse> {
    try {
      const response = await apiRequest<PermissionResponse>('GET', `/api/roles/${roleId}/permissions`);
      return response;
    } catch (error: unknown) {
      console.error('Get role permissions error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil permissions role';
      throw new Error(errorMessage);
    }
  },

  // Update role permissions
  async updateRolePermissions(roleId: number, permissionIds: number[]): Promise<RoleResponse> {
    try {
      const response = await apiRequest<RoleResponse>('PUT', `/api/roles/${roleId}/permissions`, {
        permissions: permissionIds
      });
      return response;
    } catch (error: unknown) {
      console.error('Update role permissions error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengupdate permissions role';
      throw new Error(errorMessage);
    }
  }
};