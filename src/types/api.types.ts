export interface ApiResponse<T = unknown> {
  message: string;
  status: 'success' | 'error';
  data?: T;
}

export interface PaginatedData<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ApiError {
  message: string;
  status: 'error' | 'fail';
  statusCode?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
