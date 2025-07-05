// app/types.ts (or another appropriate location)

export type Park = {
    _id : string;
    slice?: any;
    name: string;
    area: string;
    region : string;
    division: string;
    description: string;
    bookingfees?: string;
    events?: string;          // Add this if you want to include images in the Demo component
    parking?: string;       // Optional avatar image URL
    plantcost?: string;          // Optional author name
    cafeteria?: string;        // Optional address
    restroom?: string;    // Optional working days
    gates?: string;        // Optional timings
    latitude: string;         // Optional prices
    longitude: string;       // Optional country
    url: string;          // Optional city
    distance?: number;
    rating?: number;
    cost?: number;
};
