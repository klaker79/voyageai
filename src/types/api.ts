// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

// ============================================
// Search State Types
// ============================================

export interface SearchState<T> {
    results: T[];
    isLoading: boolean;
    error: string | null;
    hasSearched: boolean;
}

export type SortOption = 'ai' | 'price' | 'duration' | 'rating';

export interface FilterState {
    sortBy: SortOption;
    priceRange?: [number, number];
    directOnly?: boolean;
    amenities?: string[];
    minRating?: number;
}

// ============================================
// UI State Types
// ============================================

export interface ModalState {
    isOpen: boolean;
    type: string | null;
    data: unknown;
}

export interface ToastState {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
}
