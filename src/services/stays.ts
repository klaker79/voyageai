/**
 * Stays Service
 * Handles all accommodation-related API calls
 * Currently uses mock data, ready for real API integration
 */

import type { StaySearchParams, StayWithScore } from '@/types';

// Mock data - will be replaced with real API calls
const mockStays: StayWithScore[] = [
    {
        id: 'st-001',
        name: 'Hotel Arts Barcelona',
        type: 'hotel',
        starRating: 5,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        rating: 9.2,
        reviewsCount: 2450,
        location: {
            address: 'Marina 19-21',
            city: 'Barcelona',
            country: 'España',
            distance: '0.5 km del centro'
        },
        price: 289,
        originalPrice: 389,
        amenities: ['wifi', 'pool', 'parking', 'breakfast', 'spa'],
        roomType: 'Suite con vistas al mar',
        cancellation: 'free',
        aiScore: 96,
        aiReason: 'Mejor ubicación y servicios premium'
    },
    {
        id: 'st-002',
        name: 'Casa Camper Barcelona',
        type: 'boutique',
        starRating: 4,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
        rating: 8.9,
        reviewsCount: 1890,
        location: {
            address: 'Elisabets 11',
            city: 'Barcelona',
            country: 'España',
            distance: '0.2 km del centro'
        },
        price: 175,
        originalPrice: 220,
        amenities: ['wifi', 'breakfast'],
        roomType: 'Habitación Doble Superior',
        cancellation: 'free',
        aiScore: 91,
        aiReason: 'Excelente relación calidad-precio en zona céntrica'
    },
    {
        id: 'st-003',
        name: 'W Barcelona',
        type: 'hotel',
        starRating: 5,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        rating: 9.0,
        reviewsCount: 3200,
        location: {
            address: 'Plaça Rosa dels Vents 1',
            city: 'Barcelona',
            country: 'España',
            distance: '1.2 km del centro'
        },
        price: 320,
        originalPrice: 420,
        amenities: ['wifi', 'pool', 'parking', 'breakfast', 'spa', 'gym'],
        roomType: 'Wonderful Room con vistas',
        cancellation: 'free',
        aiScore: 89,
        aiReason: 'Icono arquitectónico con servicios de lujo'
    },
    {
        id: 'st-004',
        name: 'Generator Barcelona',
        type: 'hostel',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        rating: 8.4,
        reviewsCount: 4500,
        location: {
            address: 'Corsega 373',
            city: 'Barcelona',
            country: 'España',
            distance: '1.5 km del centro'
        },
        price: 45,
        originalPrice: 65,
        amenities: ['wifi', 'bar'],
        roomType: 'Habitación Privada Doble',
        cancellation: 'partial',
        aiScore: 85,
        aiReason: 'Mejor opción económica con buen ambiente'
    },
    {
        id: 'st-005',
        name: 'Apartamento Gótico Luxury',
        type: 'apartment',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        rating: 9.4,
        reviewsCount: 320,
        location: {
            address: 'Carrer Avinyó',
            city: 'Barcelona',
            country: 'España',
            distance: '0.1 km del centro'
        },
        price: 195,
        originalPrice: 250,
        amenities: ['wifi', 'kitchen', 'washer'],
        roomType: '2 Dormitorios, 80m²',
        cancellation: 'free',
        aiScore: 93,
        aiReason: 'Perfecto para estancias largas, cocina completa'
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const stayService = {
    /**
     * Search stays based on parameters
     * TODO: Replace with real Booking/Hotels.com API call
     */
    async search(params: StaySearchParams): Promise<StayWithScore[]> {
        await delay(1500);
        return mockStays;
    },

    /**
     * Get stay by ID
     */
    async getById(id: string): Promise<StayWithScore | null> {
        await delay(500);
        return mockStays.find(s => s.id === id) || null;
    },

    /**
     * Get featured destinations
     */
    async getFeaturedDestinations() {
        await delay(300);
        return [
            {
                city: 'Barcelona',
                country: 'España',
                image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
                price: 89,
                staysCount: 423
            },
            {
                city: 'París',
                country: 'Francia',
                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
                price: 120,
                staysCount: 567
            },
            {
                city: 'Roma',
                country: 'Italia',
                image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
                price: 95,
                staysCount: 389
            },
            {
                city: 'Ámsterdam',
                country: 'Países Bajos',
                image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800',
                price: 110,
                staysCount: 298
            }
        ];
    },

    /**
     * Sort stays by criteria
     */
    sortStays(
        stays: StayWithScore[],
        sortBy: 'ai' | 'price' | 'rating'
    ): StayWithScore[] {
        return [...stays].sort((a, b) => {
            switch (sortBy) {
                case 'ai':
                    return b.aiScore - a.aiScore;
                case 'price':
                    return a.price - b.price;
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });
    }
};
