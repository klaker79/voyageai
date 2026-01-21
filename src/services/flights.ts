/**
 * Flight Service
 * Handles all flight-related API calls
 * Currently uses mock data, ready for real API integration
 */

import type { FlightSearchParams, FlightWithScore } from '@/types';

// Mock data - will be replaced with real API calls
const mockFlights: FlightWithScore[] = [
    {
        id: 'fl-001',
        airline: 'Iberia',
        airlineLogo: '🔴',
        flightNumber: 'IB3456',
        origin: { code: 'MAD', name: 'Madrid-Barajas', city: 'Madrid', country: 'España' },
        destination: { code: 'CDG', name: 'Charles de Gaulle', city: 'París', country: 'Francia' },
        departTime: '08:30',
        arriveTime: '10:45',
        duration: '2h 15min',
        stops: 0,
        price: 89,
        originalPrice: 145,
        cabinBag: true,
        checkedBag: true,
        class: 'economy',
        aiScore: 94,
        aiReason: 'Mejor relación calidad-precio',
        priceHistory: 'down',
        reviews: { positive: 89, total: 1240 }
    },
    {
        id: 'fl-002',
        airline: 'Vueling',
        airlineLogo: '🟡',
        flightNumber: 'VY1234',
        origin: { code: 'MAD', name: 'Madrid-Barajas', city: 'Madrid', country: 'España' },
        destination: { code: 'CDG', name: 'Charles de Gaulle', city: 'París', country: 'Francia' },
        departTime: '11:00',
        arriveTime: '13:20',
        duration: '2h 20min',
        stops: 0,
        price: 52,
        originalPrice: 78,
        cabinBag: true,
        checkedBag: false,
        class: 'economy',
        aiScore: 87,
        aiReason: 'Precio más bajo disponible',
        priceHistory: 'stable',
        reviews: { positive: 72, total: 890 }
    },
    {
        id: 'fl-003',
        airline: 'Air Europa',
        airlineLogo: '🔵',
        flightNumber: 'UX5678',
        origin: { code: 'MAD', name: 'Madrid-Barajas', city: 'Madrid', country: 'España' },
        destination: { code: 'CDG', name: 'Charles de Gaulle', city: 'París', country: 'Francia' },
        departTime: '14:30',
        arriveTime: '16:50',
        duration: '2h 20min',
        stops: 0,
        price: 75,
        originalPrice: 95,
        cabinBag: true,
        checkedBag: true,
        class: 'economy',
        aiScore: 82,
        aiReason: 'Buenas reviews de puntualidad',
        priceHistory: 'up',
        reviews: { positive: 85, total: 650 }
    },
    {
        id: 'fl-004',
        airline: 'Ryanair',
        airlineLogo: '🟢',
        flightNumber: 'FR9012',
        origin: { code: 'MAD', name: 'Madrid-Barajas', city: 'Madrid', country: 'España' },
        destination: { code: 'CDG', name: 'Charles de Gaulle', city: 'París', country: 'Francia' },
        departTime: '06:15',
        arriveTime: '08:25',
        duration: '2h 10min',
        stops: 0,
        price: 35,
        originalPrice: 45,
        cabinBag: true,
        checkedBag: false,
        class: 'economy',
        aiScore: 65,
        aiReason: 'Precio bajo pero reviews mixtas',
        priceHistory: 'down',
        reviews: { positive: 58, total: 2100 }
    },
    {
        id: 'fl-005',
        airline: 'TAP Portugal',
        airlineLogo: '⭐',
        flightNumber: 'TP4321',
        origin: { code: 'MAD', name: 'Madrid-Barajas', city: 'Madrid', country: 'España' },
        destination: { code: 'CDG', name: 'Charles de Gaulle', city: 'París', country: 'Francia' },
        departTime: '18:00',
        arriveTime: '21:30',
        duration: '3h 30min',
        stops: 1,
        stopCity: 'Lisboa',
        price: 68,
        originalPrice: 110,
        cabinBag: true,
        checkedBag: true,
        class: 'economy',
        aiScore: 71,
        aiReason: 'Buena opción con escala corta',
        priceHistory: 'down',
        reviews: { positive: 81, total: 430 }
    }
];

// Simulates API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const flightService = {
    /**
     * Search flights based on parameters
     * TODO: Replace with real Amadeus/Kiwi API call
     */
    async search(params: FlightSearchParams): Promise<FlightWithScore[]> {
        await delay(1500); // Simulate network latency

        // In production, this would be:
        // const response = await fetch(`${API_URL}/flights/search`, {
        //   method: 'POST',
        //   body: JSON.stringify(params)
        // });
        // return response.json();

        return mockFlights;
    },

    /**
     * Get flight by ID
     */
    async getById(id: string): Promise<FlightWithScore | null> {
        await delay(500);
        return mockFlights.find(f => f.id === id) || null;
    },

    /**
     * Get popular destinations from origin
     */
    async getPopularDestinations(origin: string) {
        await delay(300);
        return [
            { city: 'París', code: 'CDG', price: 45, emoji: '🗼' },
            { city: 'Londres', code: 'LHR', price: 52, emoji: '🎡' },
            { city: 'Roma', code: 'FCO', price: 38, emoji: '🏛️' },
            { city: 'Ámsterdam', code: 'AMS', price: 49, emoji: '🌷' },
            { city: 'Berlín', code: 'BER', price: 41, emoji: '🏰' },
            { city: 'Lisboa', code: 'LIS', price: 35, emoji: '🌊' },
        ];
    },

    /**
     * Sort flights by criteria
     */
    sortFlights(
        flights: FlightWithScore[],
        sortBy: 'ai' | 'price' | 'duration'
    ): FlightWithScore[] {
        return [...flights].sort((a, b) => {
            switch (sortBy) {
                case 'ai':
                    return b.aiScore - a.aiScore;
                case 'price':
                    return a.price - b.price;
                case 'duration':
                    return a.duration.localeCompare(b.duration);
                default:
                    return 0;
            }
        });
    }
};
