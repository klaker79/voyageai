// ============================================
// Flight Types
// ============================================

export interface Airport {
    code: string;
    name: string;
    city: string;
    country: string;
}

export interface Flight {
    id: string;
    airline: string;
    airlineLogo: string;
    flightNumber: string;
    origin: Airport;
    destination: Airport;
    departTime: string;
    arriveTime: string;
    duration: string;
    stops: number;
    stopCity?: string;
    price: number;
    originalPrice: number;
    cabinBag: boolean;
    checkedBag: boolean;
    class: 'economy' | 'premium_economy' | 'business' | 'first';
}

export interface FlightSearchParams {
    origin: string;
    destination: string;
    departDate: string;
    returnDate?: string;
    passengers: number;
    tripType: 'roundtrip' | 'oneway';
    directOnly?: boolean;
    flexibleDates?: boolean;
}

export interface FlightWithScore extends Flight {
    aiScore: number;
    aiReason: string;
    priceHistory: 'up' | 'down' | 'stable';
    reviews: {
        positive: number;
        total: number;
    };
}

// ============================================
// Stay Types
// ============================================

export interface Stay {
    id: string;
    name: string;
    type: 'hotel' | 'apartment' | 'hostel' | 'boutique';
    starRating?: number;
    image: string;
    images?: string[];
    rating: number;
    reviewsCount: number;
    location: {
        address: string;
        city: string;
        country: string;
        distance: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    price: number;
    originalPrice: number;
    amenities: Amenity[];
    roomType: string;
    cancellation: 'free' | 'partial' | 'non_refundable';
}

export type Amenity =
    | 'wifi'
    | 'pool'
    | 'parking'
    | 'breakfast'
    | 'spa'
    | 'gym'
    | 'kitchen'
    | 'bar'
    | 'washer'
    | 'ac'
    | 'pets';

export interface StaySearchParams {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
    amenities?: Amenity[];
    minRating?: number;
    priceRange?: [number, number];
}

export interface StayWithScore extends Stay {
    aiScore: number;
    aiReason: string;
}

// ============================================
// Booking Types
// ============================================

export type BookingStatus =
    | 'pending'
    | 'confirmed'
    | 'cancelled'
    | 'completed';

export type BookingType = 'flight' | 'stay' | 'transport' | 'activity';

export interface Booking {
    id: string;
    type: BookingType;
    status: BookingStatus;
    createdAt: string;
    updatedAt: string;
    price: number;
    currency: string;
    reference: string;
    details: FlightBookingDetails | StayBookingDetails;
}

export interface FlightBookingDetails {
    flight: Flight;
    passengers: Passenger[];
    seatSelection?: string[];
}

export interface StayBookingDetails {
    stay: Stay;
    guests: number;
    checkIn: string;
    checkOut: string;
    nights: number;
}

export interface Passenger {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    passport?: string;
    nationality?: string;
}

// ============================================
// Trip / Itinerary Types
// ============================================

export interface Trip {
    id: string;
    name: string;
    destination: string;
    image: string;
    startDate: string;
    endDate: string;
    status: 'planning' | 'active' | 'completed';
    progress: number;
    bookings: Booking[];
    totalCost: number;
    savings: number;
}

export interface ItineraryEvent {
    id: string;
    time: string;
    endTime?: string;
    type: 'flight' | 'hotel' | 'transport' | 'activity' | 'dining';
    title: string;
    subtitle: string;
    status: 'confirmed' | 'pending' | 'suggestion';
    hasTicket?: boolean;
    location?: string;
}

export interface ItineraryDay {
    date: string;
    title: string;
    events: ItineraryEvent[];
}

// ============================================
// Document Types
// ============================================

export interface Passport {
    id: string;
    name: string;
    number: string;
    country: string;
    countryFlag: string;
    expiry: string;
    status: 'valid' | 'expiring_soon' | 'expired';
}

export type VisaStatus =
    | 'not_required'
    | 'pending'
    | 'approved'
    | 'denied'
    | 'expired';

export interface Visa {
    id: string;
    country: string;
    countryFlag: string;
    type: string;
    status: VisaStatus;
    note: string;
    applicationDate?: string;
    approvalDate?: string;
    expiryDate?: string;
}

export interface Insurance {
    id: string;
    provider: string;
    type: string;
    coverage: string;
    validFrom: string;
    validTo: string;
    status: 'active' | 'expired' | 'pending';
    includes: string[];
    policyNumber?: string;
}

// ============================================
// Refund Types
// ============================================

export type RefundStatus =
    | 'pending'
    | 'negotiating'
    | 'approved'
    | 'denied'
    | 'paid';

export interface RefundClaim {
    id: string;
    type: 'flight' | 'hotel';
    title: string;
    route: string;
    date: string;
    delay?: string;
    status: RefundStatus;
    amount: number;
    regulation: string;
    probability?: number;
    timeline: RefundTimelineStep[];
}

export interface RefundTimelineStep {
    date: string;
    action: string;
    status: 'done' | 'current' | 'pending';
}

// ============================================
// Deal Types
// ============================================

export interface Deal {
    id: string;
    type: 'flight' | 'hotel';
    route: string;
    details: string;
    originalPrice: number;
    currentPrice: number;
    discount: number;
    expiresIn: string;
    expiresAt: Date;
    aiScore: number;
    aiReason: string;
}

// ============================================
// Notification Types
// ============================================

export type NotificationType =
    | 'deal'
    | 'booking'
    | 'alert'
    | 'ai'
    | 'flight'
    | 'refund';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    createdAt: Date;
    read: boolean;
    actionUrl?: string;
}

// ============================================
// User Types
// ============================================

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    memberSince: string;
    travelerType: string;
}

export interface UserPreferences {
    flights: {
        seatType: 'window' | 'aisle' | 'middle';
        class: string;
        airlines: string[];
        maxLayover: string;
        directOnly: boolean;
        earlyFlights: boolean;
    };
    stays: {
        type: string;
        amenities: Amenity[];
        location: string;
        budget: string;
    };
    general: {
        currency: string;
        language: string;
        notifications: boolean;
        autoBooking: boolean;
    };
}

export interface AILearning {
    pattern: string;
    confidence: number;
}

export interface UserStats {
    tripsThisYear: number;
    countries: number;
    totalSaved: number;
}
