/**
 * Flight Service
 * Handles all flight-related API calls
 * Generates dynamic mock data based on search parameters
 */

import type { FlightSearchParams, FlightWithScore } from '@/types';

// Common airports database
const airports: Record<string, { code: string; name: string; city: string; country: string }> = {
    'madrid': { code: 'MAD', name: 'Madrid-Barajas', city: 'Madrid', country: 'España' },
    'barcelona': { code: 'BCN', name: 'El Prat', city: 'Barcelona', country: 'España' },
    'paris': { code: 'CDG', name: 'Charles de Gaulle', city: 'París', country: 'Francia' },
    'parís': { code: 'CDG', name: 'Charles de Gaulle', city: 'París', country: 'Francia' },
    'london': { code: 'LHR', name: 'Heathrow', city: 'Londres', country: 'Reino Unido' },
    'londres': { code: 'LHR', name: 'Heathrow', city: 'Londres', country: 'Reino Unido' },
    'roma': { code: 'FCO', name: 'Fiumicino', city: 'Roma', country: 'Italia' },
    'rome': { code: 'FCO', name: 'Fiumicino', city: 'Roma', country: 'Italia' },
    'amsterdam': { code: 'AMS', name: 'Schiphol', city: 'Ámsterdam', country: 'Países Bajos' },
    'berlin': { code: 'BER', name: 'Brandenburg', city: 'Berlín', country: 'Alemania' },
    'berlín': { code: 'BER', name: 'Brandenburg', city: 'Berlín', country: 'Alemania' },
    'lisbon': { code: 'LIS', name: 'Portela', city: 'Lisboa', country: 'Portugal' },
    'lisboa': { code: 'LIS', name: 'Portela', city: 'Lisboa', country: 'Portugal' },
    'new york': { code: 'JFK', name: 'John F. Kennedy', city: 'Nueva York', country: 'Estados Unidos' },
    'nueva york': { code: 'JFK', name: 'John F. Kennedy', city: 'Nueva York', country: 'Estados Unidos' },
    'tokyo': { code: 'NRT', name: 'Narita', city: 'Tokio', country: 'Japón' },
    'tokio': { code: 'NRT', name: 'Narita', city: 'Tokio', country: 'Japón' },
    'shanghai': { code: 'PVG', name: 'Pudong', city: 'Shanghái', country: 'China' },
    'shangai': { code: 'PVG', name: 'Pudong', city: 'Shanghái', country: 'China' },
    'shanghái': { code: 'PVG', name: 'Pudong', city: 'Shanghái', country: 'China' },
    'dubai': { code: 'DXB', name: 'Dubai International', city: 'Dubái', country: 'Emiratos Árabes' },
    'bali': { code: 'DPS', name: 'Ngurah Rai', city: 'Bali', country: 'Indonesia' },
    'bangkok': { code: 'BKK', name: 'Suvarnabhumi', city: 'Bangkok', country: 'Tailandia' },
    'sydney': { code: 'SYD', name: 'Kingsford Smith', city: 'Sídney', country: 'Australia' },
    'miami': { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'Estados Unidos' },
    'los angeles': { code: 'LAX', name: 'Los Angeles International', city: 'Los Ángeles', country: 'Estados Unidos' },
    'chicago': { code: 'ORD', name: "O'Hare", city: 'Chicago', country: 'Estados Unidos' },
    'singapur': { code: 'SIN', name: 'Changi', city: 'Singapur', country: 'Singapur' },
    'singapore': { code: 'SIN', name: 'Changi', city: 'Singapur', country: 'Singapur' },
    'hong kong': { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'China' },
    'cancun': { code: 'CUN', name: 'Cancún International', city: 'Cancún', country: 'México' },
    'cancún': { code: 'CUN', name: 'Cancún International', city: 'Cancún', country: 'México' },
};

// Airlines with their characteristics
const airlines = [
    { name: 'Iberia', logo: '🔴', code: 'IB', quality: 85, basePrice: 1.0 },
    { name: 'Vueling', logo: '🟡', code: 'VY', quality: 70, basePrice: 0.7 },
    { name: 'Air Europa', logo: '🔵', code: 'UX', quality: 78, basePrice: 0.85 },
    { name: 'Ryanair', logo: '🟢', code: 'FR', quality: 55, basePrice: 0.5 },
    { name: 'Emirates', logo: '🔴', code: 'EK', quality: 95, basePrice: 1.5 },
    { name: 'Qatar Airways', logo: '🟣', code: 'QR', quality: 94, basePrice: 1.4 },
    { name: 'Turkish Airlines', logo: '🔴', code: 'TK', quality: 85, basePrice: 0.9 },
    { name: 'Lufthansa', logo: '🟡', code: 'LH', quality: 88, basePrice: 1.1 },
    { name: 'British Airways', logo: '🔵', code: 'BA', quality: 82, basePrice: 1.0 },
    { name: 'Air France', logo: '🔵', code: 'AF', quality: 84, basePrice: 1.05 },
];

// Distance-based pricing (rough estimates in hours)
const getFlightDuration = (origin: string, destination: string): { hours: number; minutes: number } => {
    // Simplified distance matrix (origin-destination pairs in hours)
    const distanceMatrix: Record<string, number> = {
        'MAD-CDG': 2.25, 'MAD-LHR': 2.5, 'MAD-FCO': 2.5, 'MAD-BER': 3,
        'MAD-AMS': 2.5, 'MAD-LIS': 1.25, 'MAD-JFK': 8.5, 'MAD-NRT': 14,
        'MAD-PVG': 13, 'MAD-DXB': 7, 'MAD-BKK': 12, 'MAD-SIN': 13,
        'MAD-SYD': 22, 'MAD-MIA': 9, 'MAD-LAX': 12, 'MAD-HKG': 13,
        'MAD-DPS': 17, 'MAD-CUN': 11, 'BCN-CDG': 1.75, 'BCN-LHR': 2,
    };

    const key = `${origin}-${destination}`;
    const reverseKey = `${destination}-${origin}`;
    const hours = distanceMatrix[key] || distanceMatrix[reverseKey] || 5; // Default 5h

    const totalMinutes = Math.round(hours * 60);
    return { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 };
};

// Parse location input
const parseLocation = (input: string): { code: string; name: string; city: string; country: string } => {
    const normalized = input.toLowerCase().trim();

    // Check for IATA code in parentheses
    const iataMatch = input.match(/\(([A-Z]{3})\)/);
    if (iataMatch) {
        const code = iataMatch[1];
        // Find by code
        for (const airport of Object.values(airports)) {
            if (airport.code === code) return airport;
        }
    }

    // Check airport database
    for (const [key, airport] of Object.entries(airports)) {
        if (normalized.includes(key)) return airport;
    }

    // Generate generic airport
    const code = input.substring(0, 3).toUpperCase();
    return { code, name: `${input} Airport`, city: input, country: '' };
};

// Generate realistic base price based on distance (competitive prices)
const getBasePrice = (duration: { hours: number; minutes: number }): number => {
    const totalHours = duration.hours + duration.minutes / 60;
    if (totalHours <= 2) return 35;      // Europa corta: €35-70
    if (totalHours <= 4) return 55;      // Europa media: €55-100
    if (totalHours <= 8) return 150;     // Largo medio: €150-300
    if (totalHours <= 12) return 220;    // Largo: €220-450 (como tu vuelo a Shanghai)
    return 280;                           // Muy largo: €280-550
};

// Simulates API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate dynamic mock flights based on search parameters
 */
function generateMockFlights(params: FlightSearchParams): FlightWithScore[] {
    const origin = parseLocation(params.origin);
    const destination = parseLocation(params.destination);
    const duration = getFlightDuration(origin.code, destination.code);
    const basePrice = getBasePrice(duration);

    // Select appropriate airlines based on distance
    const isLongHaul = duration.hours >= 6;
    const availableAirlines = isLongHaul
        ? airlines.filter(a => ['EK', 'QR', 'TK', 'LH', 'BA', 'AF', 'IB'].includes(a.code))
        : airlines.filter(a => ['IB', 'VY', 'UX', 'FR', 'LH', 'BA', 'AF'].includes(a.code));

    // Shuffle and take 5 airlines
    const selectedAirlines = availableAirlines
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    const flights: FlightWithScore[] = selectedAirlines.map((airline, index) => {
        // Random departure time
        const departHour = 6 + Math.floor(Math.random() * 14); // 6:00 - 20:00
        const departMinute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];

        // Calculate arrival
        const arriveMinutes = (departHour * 60 + departMinute + duration.hours * 60 + duration.minutes);
        const arriveHour = Math.floor(arriveMinutes / 60) % 24;
        const arriveMinute = arriveMinutes % 60;

        // Price variation
        const priceMultiplier = airline.basePrice * (0.85 + Math.random() * 0.3);
        const price = Math.round(basePrice * priceMultiplier);
        const originalPrice = Math.round(price * (1.1 + Math.random() * 0.25));

        // Stops for long haul
        const stops = isLongHaul && Math.random() > 0.6 ? 1 : 0;
        const stopCities = ['Dubái', 'Estambul', 'Doha', 'Frankfurt', 'Londres'];

        // AI Score based on quality, price, and randomness
        const priceScore = Math.max(0, 30 - (price / basePrice - 0.8) * 40);
        const aiScore = Math.round(Math.min(99, airline.quality * 0.7 + priceScore + Math.random() * 10));

        // AI Reason
        const reasons = [
            `Mejor ${stops === 0 ? 'vuelo directo' : 'conexión'} disponible`,
            'Mejor relación calidad-precio',
            'Excelentes reviews de pasajeros',
            'Precio competitivo para este destino',
            'Alta puntualidad en esta ruta'
        ];

        return {
            id: `fl-${destination.code}-${index + 1}`,
            airline: airline.name,
            airlineLogo: airline.logo,
            flightNumber: `${airline.code}${1000 + Math.floor(Math.random() * 8999)}`,
            origin,
            destination,
            departTime: `${departHour.toString().padStart(2, '0')}:${departMinute.toString().padStart(2, '0')}`,
            arriveTime: `${arriveHour.toString().padStart(2, '0')}:${arriveMinute.toString().padStart(2, '0')}`,
            duration: `${duration.hours}h ${duration.minutes}min`,
            stops,
            stopCity: stops > 0 ? stopCities[Math.floor(Math.random() * stopCities.length)] : undefined,
            price,
            originalPrice,
            cabinBag: true,
            checkedBag: airline.quality > 70,
            class: 'economy' as const,
            aiScore,
            aiReason: reasons[Math.floor(Math.random() * reasons.length)],
            priceHistory: ['down', 'stable', 'up'][Math.floor(Math.random() * 3)] as 'down' | 'stable' | 'up',
            reviews: {
                positive: 60 + Math.floor(Math.random() * 35),
                total: 200 + Math.floor(Math.random() * 2000)
            }
        };
    });

    // Sort by AI score
    return flights.sort((a, b) => b.aiScore - a.aiScore);
}

export const flightService = {
    /**
     * Search flights based on parameters - generates dynamic mock data
     */
    async search(params: FlightSearchParams): Promise<FlightWithScore[]> {
        await delay(1500); // Simulate network latency
        return generateMockFlights(params);
    },

    /**
     * Get flight by ID
     */
    async getById(id: string): Promise<FlightWithScore | null> {
        await delay(500);
        // Would need to store/cache flights
        return null;
    },

    /**
     * Get popular destinations from origin
     */
    async getPopularDestinations(origin: string) {
        await delay(300);
        const originInfo = parseLocation(origin);

        // Different destinations based on origin
        const destinations = [
            { city: 'París', code: 'CDG', price: 45, emoji: '🗼' },
            { city: 'Londres', code: 'LHR', price: 52, emoji: '🎡' },
            { city: 'Roma', code: 'FCO', price: 38, emoji: '🏛️' },
            { city: 'Ámsterdam', code: 'AMS', price: 49, emoji: '🌷' },
            { city: 'Nueva York', code: 'JFK', price: 320, emoji: '🗽' },
            { city: 'Tokio', code: 'NRT', price: 580, emoji: '🗼' },
        ];

        return destinations.filter(d => d.code !== originInfo.code);
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
