/**
 * Custom Hooks
 * Reusable logic for common operations
 */

'use client';

import { useState, useCallback } from 'react';
import { flightService } from '@/services/flights';
import { kiwiService } from '@/services/kiwi';
import { apifyService } from '@/services/apify';
import { stayService } from '@/services/stays';
import type { FlightSearchParams, FlightWithScore, StaySearchParams, StayWithScore } from '@/types';

// ============================================
// useFlightSearch Hook
// ============================================

interface UseFlightSearchReturn {
    results: FlightWithScore[];
    isLoading: boolean;
    error: string | null;
    hasSearched: boolean;
    search: (params: FlightSearchParams) => Promise<void>;
    sortBy: 'ai' | 'price' | 'duration';
    setSortBy: (sort: 'ai' | 'price' | 'duration') => void;
    sortedResults: FlightWithScore[];
    reset: () => void;
    dataSource: 'apify' | 'kiwi' | 'mock';
}

export function useFlightSearch(): UseFlightSearchReturn {
    const [results, setResults] = useState<FlightWithScore[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [sortBy, setSortBy] = useState<'ai' | 'price' | 'duration'>('ai');
    const [dataSource, setDataSource] = useState<'apify' | 'kiwi' | 'mock'>('mock');

    const search = useCallback(async (params: FlightSearchParams) => {
        setIsLoading(true);
        setError(null);

        try {
            // Try Apify first (scrapes Google Flights)
            // Then Kiwi, then fallback to mock
            const hasApify = process.env.NEXT_PUBLIC_APIFY_TOKEN &&
                process.env.NEXT_PUBLIC_APIFY_TOKEN !== 'your_apify_token_here';
            const hasKiwi = process.env.NEXT_PUBLIC_KIWI_API_KEY &&
                process.env.NEXT_PUBLIC_KIWI_API_KEY !== 'your_kiwi_api_key_here';

            let data: FlightWithScore[];

            if (hasApify) {
                data = await apifyService.search(params);
                setDataSource('apify');
            } else if (hasKiwi) {
                data = await kiwiService.search(params);
                setDataSource('kiwi');
            } else {
                data = await flightService.search(params);
                setDataSource('mock');
            }

            setResults(data);
            setHasSearched(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al buscar vuelos');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const sortedResults = flightService.sortFlights(results, sortBy);

    const reset = useCallback(() => {
        setResults([]);
        setHasSearched(false);
        setError(null);
        setSortBy('ai');
    }, []);

    return {
        results,
        isLoading,
        error,
        hasSearched,
        search,
        sortBy,
        setSortBy,
        sortedResults,
        reset,
        dataSource
    };
}

// ============================================
// useStaySearch Hook
// ============================================

interface UseStaySearchReturn {
    results: StayWithScore[];
    isLoading: boolean;
    error: string | null;
    hasSearched: boolean;
    search: (params: StaySearchParams) => Promise<void>;
    sortBy: 'ai' | 'price' | 'rating';
    setSortBy: (sort: 'ai' | 'price' | 'rating') => void;
    sortedResults: StayWithScore[];
    reset: () => void;
}

export function useStaySearch(): UseStaySearchReturn {
    const [results, setResults] = useState<StayWithScore[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [sortBy, setSortBy] = useState<'ai' | 'price' | 'rating'>('ai');

    const search = useCallback(async (params: StaySearchParams) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await stayService.search(params);
            setResults(data);
            setHasSearched(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al buscar alojamientos');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const sortedResults = stayService.sortStays(results, sortBy);

    const reset = useCallback(() => {
        setResults([]);
        setHasSearched(false);
        setError(null);
        setSortBy('ai');
    }, []);

    return {
        results,
        isLoading,
        error,
        hasSearched,
        search,
        sortBy,
        setSortBy,
        sortedResults,
        reset
    };
}

// ============================================
// useDebounce Hook
// ============================================

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useState(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    });

    return debouncedValue;
}

// ============================================
// useLocalStorage Hook
// ============================================

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue;

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    return [storedValue, setValue];
}

// ============================================
// useToggle Hook
// ============================================

export function useToggle(initialValue = false): [boolean, () => void, (value: boolean) => void] {
    const [value, setValue] = useState(initialValue);
    const toggle = useCallback(() => setValue(v => !v), []);
    return [value, toggle, setValue];
}

// ============================================
// useMediaQuery Hook
// ============================================

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useState(() => {
        if (typeof window === 'undefined') return;

        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    });

    return matches;
}

export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(max-width: 1024px)');
