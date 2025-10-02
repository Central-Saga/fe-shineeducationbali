// Utility functions for handling API responses

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse {
  success: boolean;
  message: string;
  data?: {
    [key: string]: unknown;
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
  response: unknown,
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
  if (response && typeof response === 'object' && dataKey && dataKey in (response as Record<string, unknown>)) {
    return {
      success: true,
      message: 'Data retrieved successfully',
      data: (response as Record<string, unknown>)[dataKey] as T
    };
  }

  // If response has 'data' key without dataKey parameter (common Laravel API format)
  if (response && typeof response === 'object' && 'data' in (response as Record<string, unknown>) && !dataKey) {
    return {
      success: true,
      message: 'Data retrieved successfully',
      data: (response as Record<string, unknown>).data as T
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
  response: unknown,
  dataKey?: string
): T | null {
  if (!response) return null;

  // If response has success property and data
  if ((response as Record<string, unknown>).success && (response as Record<string, unknown>).data) {
    return (response as Record<string, unknown>).data as T;
  }

  // If response is direct array
  if (Array.isArray(response)) {
    return response as T;
  }

  // If response has data key
  if (dataKey && (response as Record<string, unknown>)[dataKey]) {
    return (response as Record<string, unknown>)[dataKey] as T;
  }

  // If response is direct object
  if (typeof response === 'object' && !(response as Record<string, unknown>).success) {
    return response as T;
  }

  return null;
}

/**
 * Check if API response is successful
 */
export function isApiResponseSuccess(response: unknown): boolean {
  if (!response || typeof response !== 'object') return false;
  const responseObj = response as Record<string, unknown>;
  return responseObj.success === true;
}

/**
 * Get error message from API response
 */
export function getApiErrorMessage(response: unknown): string {
  if (!response) return 'No response received';
  
  if (typeof response === 'string') return response;
  
  if (response && typeof response === 'object') {
    const responseObj = response as Record<string, unknown>;
    return (responseObj.message as string) || (responseObj.error as string) || 'Unknown error occurred';
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
