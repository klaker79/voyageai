/**
 * Stay Service
 * Handles all accommodation-related API calls
 * Generates dynamic mock data based on search parameters
 */

import type { StaySearchParams, StayWithScore, Amenity } from '@/types';

// Cities with typical hotel prices per night
const cityPrices: Record<string, { budget: number; mid: number; premium: number }> = {
    'paris': { budget: 80, mid: 150, premium: 350 },
    'parís': { budget: 80, mid: 150, premium: 350 },
    'london': { budget: 90, mid: 180, premium: 400 },
    'londres': { budget: 90, mid: 180, premium: 400 },
    'barcelona': { budget: 70, mid: 130, premium: 280 },
    'madrid': { budget: 65, mid: 120, premium: 260 },
    'roma': { budget: 75, mid: 140, premium: 300 },
    'rome': { budget: 75, mid: 140, premium: 300 },
    'amsterdam': { budget: 85, mid: 160, premium: 320 },
    'berlin': { budget: 60, mid: 110, premium: 240 },
    'berlín': { budget: 60, mid: 110, premium: 240 },
    'lisbon': { budget: 55, mid: 100, premium: 220 },
    'lisboa': { budget: 55, mid: 100, premium: 220 },
    'new york': { budget: 120, mid: 220, premium: 500 },
    'nueva york': { budget: 120, mid: 220, premium: 500 },
    'tokyo': { budget: 70, mid: 150, premium: 380 },
    'tokio': { budget: 70, mid: 150, premium: 380 },
    'shanghai': { budget: 50, mid: 100, premium: 250 },
    'shanghái': { budget: 50, mid: 100, premium: 250 },
    'dubai': { budget: 80, mid: 180, premium: 450 },
    'dubái': { budget: 80, mid: 180, premium: 450 },
    'bali': { budget: 30, mid: 80, premium: 200 },
    'bangkok': { budget: 25, mid: 60, premium: 150 },
    'singapore': { budget: 90, mid: 180, premium: 400 },
    'singapur': { budget: 90, mid: 180, premium: 400 },
    'miami': { budget: 100, mid: 200, premium: 450 },
    'cancun': { budget: 60, mid: 120, premium: 300 },
    'cancún': { budget: 60, mid: 120, premium: 300 },
};

// Hotel chains with their characteristics
const hotelChains = [
    { name: 'Marriott', type: 'hotel' as const, stars: 4, quality: 88, priceMultiplier: 1.2 },
    { name: 'Hilton', type: 'hotel' as const, stars: 4, quality: 86, priceMultiplier: 1.15 },
    { name: 'NH Hotels', type: 'hotel' as const, stars: 4, quality: 82, priceMultiplier: 1.0 },
    { name: 'Ibis', type: 'hotel' as const, stars: 3, quality: 72, priceMultiplier: 0.7 },
    { name: 'Holiday Inn', type: 'hotel' as const, stars: 3, quality: 75, priceMultiplier: 0.8 },
    { name: 'Novotel', type: 'hotel' as const, stars: 4, quality: 80, priceMultiplier: 0.95 },
    { name: 'Radisson', type: 'hotel' as const, stars: 4, quality: 84, priceMultiplier: 1.1 },
    { name: 'Boutique Central', type: 'boutique' as const, stars: 4, quality: 90, priceMultiplier: 1.3 },
    { name: 'City Hostel', type: 'hostel' as const, stars: 2, quality: 65, priceMultiplier: 0.4 },
    { name: 'Luxury Apartment', type: 'apartment' as const, stars: 5, quality: 92, priceMultiplier: 1.4 },
];

// Room types
const roomTypes = [
    'Habitación Doble Estándar',
    'Habitación Superior con Vistas',
    'Suite Junior',
    'Habitación Familiar',
    'Estudio con Cocina',
    'Deluxe King Room',
];

// All possible amenities
const allAmenities: Amenity[] = ['wifi', 'pool', 'parking', 'breakfast', 'spa', 'gym', 'kitchen', 'bar', 'ac'];

// Get city price tier
const getCityPrices = (destination: string): { budget: number; mid: number; premium: number } => {
    const normalized = destination.toLowerCase().trim();

    for (const [key, prices] of Object.entries(cityPrices)) {
        if (normalized.includes(key)) return prices;
    }

    // Default prices for unknown cities
    return { budget: 60, mid: 120, premium: 280 };
};

// Parse destination
const parseDestination = (input: string): string => {
    const normalized = input.toLowerCase().trim();

    // Known city names
    const cityNames: Record<string, string> = {
        'paris': 'París',
        'parís': 'París',
        'london': 'Londres',
        'londres': 'Londres',
        'barcelona': 'Barcelona',
        'madrid': 'Madrid',
        'roma': 'Roma',
        'rome': 'Roma',
        'amsterdam': 'Ámsterdam',
        'berlin': 'Berlín',
        'berlín': 'Berlín',
        'lisbon': 'Lisboa',
        'lisboa': 'Lisboa',
        'new york': 'Nueva York',
        'nueva york': 'Nueva York',
        'tokyo': 'Tokio',
        'tokio': 'Tokio',
        'shanghai': 'Shanghái',
        'shanghái': 'Shanghái',
        'dubai': 'Dubái',
        'dubái': 'Dubái',
        'bali': 'Bali',
        'bangkok': 'Bangkok',
        'miami': 'Miami',
        'cancun': 'Cancún',
        'cancún': 'Cancún',
        'singapur': 'Singapur',
        'singapore': 'Singapur',
    };

    for (const [key, name] of Object.entries(cityNames)) {
        if (normalized.includes(key)) return name;
    }

    // Capitalize first letter
    return input.charAt(0).toUpperCase() + input.slice(1);
};

// Simulates API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate dynamic mock stays based on search parameters
 */
function generateMockStays(params: StaySearchParams): StayWithScore[] {
    const cityName = parseDestination(params.destination);
    const prices = getCityPrices(params.destination);

    // Select random hotels
    const selectedHotels = hotelChains
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);

    const stays: StayWithScore[] = selectedHotels.map((hotel, index) => {
        // Calculate price based on hotel tier
        let basePrice: number;
        if (hotel.priceMultiplier < 0.6) basePrice = prices.budget;
        else if (hotel.priceMultiplier < 1.0) basePrice = prices.mid * 0.8;
        else if (hotel.priceMultiplier < 1.2) basePrice = prices.mid;
        else basePrice = prices.premium * 0.8;

        const price = Math.round(basePrice * hotel.priceMultiplier * (0.9 + Math.random() * 0.2));
        const originalPrice = Math.round(price * (1.1 + Math.random() * 0.2));

        // Random amenities (more for premium hotels)
        const numAmenities = hotel.quality > 85 ? 6 : hotel.quality > 75 ? 4 : 3;
        const amenities = allAmenities
            .sort(() => Math.random() - 0.5)
            .slice(0, numAmenities);

        // Always include wifi
        if (!amenities.includes('wifi')) amenities[0] = 'wifi';

        // Filter by requested amenities if any
        const matchesAmenities = !params.amenities ||
            params.amenities.every(a => amenities.includes(a));

        // AI Score
        const priceScore = Math.max(0, 25 - (price / prices.mid - 0.8) * 30);
        const aiScore = Math.round(Math.min(99, hotel.quality * 0.6 + priceScore + Math.random() * 15));

        // AI Reasons
        const reasons = [
            'Mejor relación calidad-precio',
            'Excelente ubicación céntrica',
            'Reviews excepcionales de huéspedes',
            'Desayuno incluido muy valorado',
            'Mejor opción para familias',
            'Ideal para viajes de negocios',
        ];

        return {
            id: `stay-${cityName.toLowerCase()}-${index + 1}`,
            name: `${hotel.name} ${cityName}`,
            type: hotel.type,
            starRating: hotel.stars,
            image: `https://images.unsplash.com/photo-${1500000000000 + index * 1000}?w=800`,
            location: {
                city: cityName,
                country: '',
                address: `Calle Principal ${100 + index * 10}`,
                distance: `${(0.3 + Math.random() * 2).toFixed(1)} km del centro`
            },
            price,
            originalPrice,
            rating: (3.5 + Math.random() * 1.4).toFixed(1) as unknown as number,
            reviewsCount: 50 + Math.floor(Math.random() * 500),
            roomType: roomTypes[Math.floor(Math.random() * roomTypes.length)],
            amenities,
            cancellation: Math.random() > 0.3 ? 'free' : Math.random() > 0.5 ? 'partial' : 'non_refundable',
            aiScore,
            aiReason: reasons[Math.floor(Math.random() * reasons.length)],
        };
    });

    // Sort by AI score
    return stays.sort((a, b) => b.aiScore - a.aiScore);
}

export const stayService = {
    /**
     * Search stays based on parameters
     */
    async search(params: StaySearchParams): Promise<StayWithScore[]> {
        await delay(1500);
        return generateMockStays(params);
    },

    /**
     * Get stay by ID
     */
    async getById(id: string): Promise<StayWithScore | null> {
        await delay(500);
        return null;
    },

    /**
     * Get featured destinations
     */
    async getFeaturedDestinations() {
        await delay(300);
        return [
            { city: 'Barcelona', country: 'España', price: 89, staysCount: 423 },
            { city: 'París', country: 'Francia', price: 120, staysCount: 567 },
            { city: 'Roma', country: 'Italia', price: 95, staysCount: 389 },
            { city: 'Ámsterdam', country: 'Países Bajos', price: 110, staysCount: 298 },
            { city: 'Lisboa', country: 'Portugal', price: 75, staysCount: 245 },
            { city: 'Bali', country: 'Indonesia', price: 45, staysCount: 312 },
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
                    return Number(b.rating) - Number(a.rating);
                default:
                    return 0;
            }
        });
    }
};
