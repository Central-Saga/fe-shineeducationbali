// Utility functions for handling API responses

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data?: {
    [key: string]: any;
    total?: number;
    current_page?: number;
    last_page?: number;
    per_page?: number;
  };
}

/**
 * Normalize API response to ensure consistent format
 */
export function normalizeApiResponse<T>(
  response: any,
  dataKey?: string
): ApiResponse<T> {
  console.log('normalizeApiResponse input:', { response, dataKey, isArray: Array.isArray(response) });
  
  // If response is null or undefined
  if (!response) {
    console.log('normalizeApiResponse: No response received');
    return {
      success: false,
      message: 'No response received',
      data: undefined
    };
  }

  // If response is already in expected format
  if (response && typeof response === 'object' && 'success' in response) {
    return response as ApiResponse<T>;
  }

  // If response is direct data (array or object) - PRIORITAS TERTINGGI
  if (Array.isArray(response)) {
    console.log('normalizeApiResponse: Processing as direct array');
    return {
      success: true,
      message: 'Data retrieved successfully',
      data: response as T
    };
  }

  // If response has data key (e.g., { data: [...], total: 10 })
  if (response && typeof response === 'object' && dataKey && dataKey in response) {
    return {
      success: true,
      message: 'Data retrieved successfully',
      data: response[dataKey] as T
    };
  }

  // If response has 'data' key without dataKey parameter (common Laravel API format)
  if (response && typeof response === 'object' && 'data' in response && !dataKey) {
    return {
      success: true,
      message: 'Data retrieved successfully',
      data: response.data as T
    };
  }

  // If response is a single object
  if (response && typeof response === 'object') {
    return {
      success: true,
      message: 'Data retrieved successfully',
      data: response as T
    };
  }

  // Fallback
  return {
    success: false,
    message: 'Invalid response format',
    data: response as T
  };
}

/**
 * Extract data from API response with flexible parsing
 */
export function extractApiData<T>(
  response: any,
  dataKey?: string
): T | null {
  if (!response) return null;

  // If response has success property and data
  if (response.success && response.data) {
    return response.data as T;
  }

  // If response is direct array
  if (Array.isArray(response)) {
    return response as T;
  }

  // If response has data key
  if (dataKey && response[dataKey]) {
    return response[dataKey] as T;
  }

  // If response is direct object
  if (typeof response === 'object' && !response.success) {
    return response as T;
  }

  return null;
}

/**
 * Check if API response is successful
 */
export function isApiResponseSuccess(response: any): boolean {
  return response && typeof response === 'object' && response.success === true;
}

/**
 * Get error message from API response
 */
export function getApiErrorMessage(response: any): string {
  if (!response) return 'No response received';
  
  if (typeof response === 'string') return response;
  
  if (response && typeof response === 'object') {
    return response.message || response.error || 'Unknown error occurred';
  }
  
  return 'Invalid response format';
}

/**
 * Create a standardized error response
 */
export function createErrorResponse<T>(message: string, data?: T): ApiResponse<T> {
  return {
    success: false,
    message,
    data
  };
}

/**
 * Create a standardized success response
 */
export function createSuccessResponse<T>(data: T, message: string = 'Operation successful'): ApiResponse<T> {
  return {
    success: true,
    message,
    data
  };
}
