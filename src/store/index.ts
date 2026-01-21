/**
 * App Store
 * Global state management with Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserPreferences, Trip, Notification, Deal } from '@/types';

// ============================================
// User Store
// ============================================

interface UserState {
    user: User | null;
    preferences: UserPreferences | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setPreferences: (prefs: UserPreferences) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: {
                id: '1',
                name: 'Iker Fernández',
                email: 'iker@example.com',
                avatar: undefined,
                memberSince: 'Enero 2024',
                travelerType: 'Explorer'
            },
            preferences: {
                flights: {
                    seatType: 'aisle',
                    class: 'Economy / Economy Plus',
                    airlines: ['Iberia', 'Vueling', 'Air Europa'],
                    maxLayover: '3 horas',
                    directOnly: false,
                    earlyFlights: true
                },
                stays: {
                    type: 'Hotel 4★ o Boutique',
                    amenities: ['wifi', 'breakfast', 'gym'],
                    location: 'Centro ciudad',
                    budget: '€100-200/noche'
                },
                general: {
                    currency: 'EUR',
                    language: 'Español',
                    notifications: true,
                    autoBooking: false
                }
            },
            isAuthenticated: true,
            setUser: (user) => set({ user, isAuthenticated: !!user }),
            setPreferences: (preferences) => set({ preferences }),
            logout: () => set({ user: null, isAuthenticated: false, preferences: null })
        }),
        { name: 'voyageai-user' }
    )
);

// ============================================
// Search Store
// ============================================

interface SearchState {
    // Flight search
    flightSearch: {
        origin: string;
        destination: string;
        departDate: string;
        returnDate: string;
        passengers: number;
        tripType: 'roundtrip' | 'oneway';
    };
    // Stay search  
    staySearch: {
        destination: string;
        checkIn: string;
        checkOut: string;
        guests: number;
        rooms: number;
    };
    setFlightSearch: (search: Partial<SearchState['flightSearch']>) => void;
    setStaySearch: (search: Partial<SearchState['staySearch']>) => void;
    resetFlightSearch: () => void;
    resetStaySearch: () => void;
}

const defaultFlightSearch = {
    origin: 'Madrid (MAD)',
    destination: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'roundtrip' as const
};

const defaultStaySearch = {
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
};

export const useSearchStore = create<SearchState>()((set) => ({
    flightSearch: defaultFlightSearch,
    staySearch: defaultStaySearch,
    setFlightSearch: (search) =>
        set((state) => ({ flightSearch: { ...state.flightSearch, ...search } })),
    setStaySearch: (search) =>
        set((state) => ({ staySearch: { ...state.staySearch, ...search } })),
    resetFlightSearch: () => set({ flightSearch: defaultFlightSearch }),
    resetStaySearch: () => set({ staySearch: defaultStaySearch })
}));

// ============================================
// Favorites Store
// ============================================

interface FavoritesState {
    flightIds: string[];
    stayIds: string[];
    addFlight: (id: string) => void;
    removeFlight: (id: string) => void;
    toggleFlight: (id: string) => void;
    addStay: (id: string) => void;
    removeStay: (id: string) => void;
    toggleStay: (id: string) => void;
    isFavoriteFlight: (id: string) => boolean;
    isFavoriteStay: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            flightIds: [],
            stayIds: [],
            addFlight: (id) => set((state) => ({ flightIds: [...state.flightIds, id] })),
            removeFlight: (id) => set((state) => ({ flightIds: state.flightIds.filter(f => f !== id) })),
            toggleFlight: (id) => {
                const { flightIds } = get();
                if (flightIds.includes(id)) {
                    set({ flightIds: flightIds.filter(f => f !== id) });
                } else {
                    set({ flightIds: [...flightIds, id] });
                }
            },
            addStay: (id) => set((state) => ({ stayIds: [...state.stayIds, id] })),
            removeStay: (id) => set((state) => ({ stayIds: state.stayIds.filter(s => s !== id) })),
            toggleStay: (id) => {
                const { stayIds } = get();
                if (stayIds.includes(id)) {
                    set({ stayIds: stayIds.filter(s => s !== id) });
                } else {
                    set({ stayIds: [...stayIds, id] });
                }
            },
            isFavoriteFlight: (id) => get().flightIds.includes(id),
            isFavoriteStay: (id) => get().stayIds.includes(id)
        }),
        { name: 'voyageai-favorites' }
    )
);

// ============================================
// Notifications Store
// ============================================

interface NotificationsState {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeNotification: (id: string) => void;
    clearAll: () => void;
}

export const useNotificationsStore = create<NotificationsState>()((set, get) => ({
    notifications: [],
    unreadCount: 0,
    addNotification: (data) => {
        const notification: Notification = {
            ...data,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            read: false
        };
        set((state) => ({
            notifications: [notification, ...state.notifications],
            unreadCount: state.unreadCount + 1
        }));
    },
    markAsRead: (id) => {
        set((state) => ({
            notifications: state.notifications.map(n =>
                n.id === id ? { ...n, read: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1)
        }));
    },
    markAllAsRead: () => {
        set((state) => ({
            notifications: state.notifications.map(n => ({ ...n, read: true })),
            unreadCount: 0
        }));
    },
    removeNotification: (id) => {
        const notification = get().notifications.find(n => n.id === id);
        set((state) => ({
            notifications: state.notifications.filter(n => n.id !== id),
            unreadCount: notification && !notification.read
                ? Math.max(0, state.unreadCount - 1)
                : state.unreadCount
        }));
    },
    clearAll: () => set({ notifications: [], unreadCount: 0 })
}));

// ============================================
// Trips Store
// ============================================

interface TripsState {
    trips: Trip[];
    activeTrip: Trip | null;
    setActiveTrip: (trip: Trip | null) => void;
    addTrip: (trip: Trip) => void;
    updateTrip: (id: string, updates: Partial<Trip>) => void;
    removeTrip: (id: string) => void;
}

export const useTripsStore = create<TripsState>()((set) => ({
    trips: [],
    activeTrip: null,
    setActiveTrip: (activeTrip) => set({ activeTrip }),
    addTrip: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
    updateTrip: (id, updates) => set((state) => ({
        trips: state.trips.map(t => t.id === id ? { ...t, ...updates } : t)
    })),
    removeTrip: (id) => set((state) => ({
        trips: state.trips.filter(t => t.id !== id),
        activeTrip: state.activeTrip?.id === id ? null : state.activeTrip
    }))
}));
