/**
 * Kiwi.com Tequila API Service
 * Free flight search API - no credit card required
 * Sign up at: https://tequila.kiwi.com
 */

import type { FlightSearchParams, FlightWithScore } from '@/types';

const KIWI_API_URL = 'https://api.tequila.kiwi.com/v2';
const API_KEY = process.env.NEXT_PUBLIC_KIWI_API_KEY;

// Location search cache
const locationCache = new Map<string, string>();

interface KiwiFlightResult {
    id: string;
    flyFrom: string;
    flyTo: string;
    cityFrom: string;
    cityTo: string;
    countryFrom: { name: string };
    countryTo: { name: string };
    dTime: number;
    aTime: number;
    fly_duration: string;
    airlines: string[];
    route: { airline: string }[];
    price: number;
    deep_link: string;
    bags_price?: { [key: string]: number };
    availability?: { seats: number };
}

interface KiwiSearchResponse {
    data: KiwiFlightResult[];
    currency: string;
}

// Airline logos mapping
const airlineLogos: Record<string, string> = {
    'FR': '🟢', // Ryanair
    'VY': '🟡', // Vueling
    'IB': '🔴', // Iberia
    'UX': '🔵', // Air Europa
    'W6': '🟣', // Wizz Air
    'U2': '🟠', // EasyJet
    'BA': '🔵', // British Airways
    'AF': '🔵', // Air France
    'LH': '🟡', // Lufthansa
    'TK': '🔴', // Turkish Airlines
};

/**
 * Search for location code (IATA)
 */
async function getLocationCode(query: string): Promise<string> {
    // Check cache first
    if (locationCache.has(query.toLowerCase())) {
        return locationCache.get(query.toLowerCase())!;
    }

    // Extract IATA code if already in format "City (CODE)"
    const iataMatch = query.match(/\(([A-Z]{3})\)/);
    if (iataMatch) {
        return iataMatch[1];
    }

    if (!API_KEY) {
        // Fallback for common cities when no API key
        const commonCities: Record<string, string> = {
            'madrid': 'MAD', 'barcelona': 'BCN', 'paris': 'CDG',
            'londres': 'LHR', 'london': 'LHR', 'roma': 'FCO', 'rome': 'FCO',
            'tokio': 'TYO', 'tokyo': 'TYO', 'nueva york': 'NYC', 'new york': 'NYC',
            'amsterdam': 'AMS', 'berlin': 'BER', 'lisboa': 'LIS', 'lisbon': 'LIS'
        };
        return commonCities[query.toLowerCase()] || query.substring(0, 3).toUpperCase();
    }

    try {
        const response = await fetch(
            `${KIWI_API_URL}/locations/query?term=${encodeURIComponent(query)}&limit=1`,
            { headers: { 'apikey': API_KEY } }
        );
        const data = await response.json();

        if (data.locations?.[0]?.code) {
            locationCache.set(query.toLowerCase(), data.locations[0].code);
            return data.locations[0].code;
        }
    } catch (error) {
        console.error('Location search error:', error);
    }

    return query.substring(0, 3).toUpperCase();
}

/**
 * Calculate AI score for a flight
 */
function calculateAIScore(flight: KiwiFlightResult, allFlights: KiwiFlightResult[]): number {
    let score = 70; // Base score

    // Price factor (cheaper = higher score)
    const prices = allFlights.map(f => f.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;
    const priceScore = ((maxPrice - flight.price) / priceRange) * 15;
    score += priceScore;

    // Direct flight bonus
    if (flight.route.length <= 1) {
        score += 10;
    }

    // Duration factor
    const durationHours = parseInt(flight.fly_duration) || 2;
    if (durationHours < 3) score += 5;

    return Math.min(99, Math.round(score));
}

/**
 * Get AI reason based on flight characteristics
 */
function getAIReason(flight: KiwiFlightResult, score: number, allFlights: KiwiFlightResult[]): string {
    const minPrice = Math.min(...allFlights.map(f => f.price));

    if (flight.price === minPrice) {
        return 'Precio más bajo disponible';
    }
    if (flight.route.length <= 1 && score >= 90) {
        return 'Vuelo directo con mejor relación calidad-precio';
    }
    if (score >= 90) {
        return 'Mejor opción según análisis IA';
    }
    if (flight.route.length <= 1) {
        return 'Vuelo directo disponible';
    }
    return 'Buena opción de viaje';
}

/**
 * Transform Kiwi flight to our format
 */
function transformFlight(flight: KiwiFlightResult, allFlights: KiwiFlightResult[]): FlightWithScore {
    const aiScore = calculateAIScore(flight, allFlights);
    const mainAirline = flight.airlines[0] || 'XX';

    return {
        id: flight.id,
        airline: mainAirline,
        airlineLogo: airlineLogos[mainAirline] || '✈️',
        flightNumber: `${mainAirline}${Math.floor(Math.random() * 9000 + 1000)}`,
        origin: {
            code: flight.flyFrom,
            name: flight.flyFrom,
            city: flight.cityFrom,
            country: flight.countryFrom.name
        },
        destination: {
            code: flight.flyTo,
            name: flight.flyTo,
            city: flight.cityTo,
            country: flight.countryTo.name
        },
        departTime: new Date(flight.dTime * 1000).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        }),
        arriveTime: new Date(flight.aTime * 1000).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        }),
        duration: flight.fly_duration,
        stops: Math.max(0, flight.route.length - 1),
        price: flight.price,
        originalPrice: Math.round(flight.price * 1.15), // Simulate original price
        cabinBag: true,
        checkedBag: flight.bags_price?.['1'] !== undefined,
        class: 'economy',
        aiScore,
        aiReason: getAIReason(flight, aiScore, allFlights),
        priceHistory: Math.random() > 0.5 ? 'down' : 'stable',
        reviews: {
            positive: 70 + Math.floor(Math.random() * 25),
            total: 500 + Math.floor(Math.random() * 2000)
        }
    };
}

/**
 * Search flights using Kiwi.com API
 */
export async function searchFlightsKiwi(params: FlightSearchParams): Promise<FlightWithScore[]> {
    // If no API key, return mock data
    if (!API_KEY || API_KEY === 'your_kiwi_api_key_here') {
        console.log('No Kiwi API key configured, using mock data');
        const { flightService } = await import('./flights');
        return flightService.search(params);
    }

    try {
        const fromCode = await getLocationCode(params.origin);
        const toCode = await getLocationCode(params.destination);

        // Format date for Kiwi API (DD/MM/YYYY)
        const formatDate = (dateStr: string) => {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        };

        const searchDate = params.departDate ? formatDate(params.departDate) : formatDate(new Date().toISOString());

        const searchParams = new URLSearchParams({
            fly_from: fromCode,
            fly_to: toCode,
            date_from: searchDate,
            date_to: searchDate,
            adults: params.passengers.toString(),
            curr: 'EUR',
            limit: '15',
            sort: 'price'
        });

        if (params.directOnly) {
            searchParams.set('max_stopovers', '0');
        }

        const response = await fetch(
            `${KIWI_API_URL}/search?${searchParams.toString()}`,
            {
                headers: {
                    'apikey': API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Kiwi API error: ${response.status}`);
        }

        const data: KiwiSearchResponse = await response.json();

        if (!data.data || data.data.length === 0) {
            return [];
        }

        // Transform and sort by AI score
        const flights = data.data.map(f => transformFlight(f, data.data));
        return flights.sort((a, b) => b.aiScore - a.aiScore);

    } catch (error) {
        console.error('Kiwi API search error:', error);
        // Fallback to mock data on error
        const { flightService } = await import('./flights');
        return flightService.search(params);
    }
}

export const kiwiService = {
    search: searchFlightsKiwi,
    getLocationCode
};
