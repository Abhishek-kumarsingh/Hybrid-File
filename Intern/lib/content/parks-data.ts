// This file simulates a CMS or API response with real content data
// In a production environment, this would be fetched from a CMS or API

export interface Park {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  location: {
    address: string;
    district: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: string[];
  amenities: {
    hasParking: boolean;
    hasRestrooms: boolean;
    hasPlayground: boolean;
    hasWaterFeature: boolean;
    hasFitnessArea: boolean;
    hasAccessiblePaths: boolean;
    hasPicnicArea: boolean;
    hasCafeteria: boolean;
  };
  openingHours: {
    weekdays: string;
    weekends: string;
    holidays: string;
  };
  entryFee: {
    adults: number;
    children: number;
    seniors: number;
  };
  images: {
    main: string;
    gallery: string[];
  };
  events: {
    id: string;
    name: string;
    date: string;
    description: string;
  }[];
  reviews: {
    rating: number;
    count: number;
  };
  nearbyAttractions: string[];
  lastUpdated: string;
  seoMetadata: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const parksData: Park[] = [
  {
    id: "lodhi-gardens",
    name: "Lodhi Gardens",
    slug: "lodhi-gardens",
    description: "Lodhi Gardens is a city park situated in New Delhi. Spread over 90 acres, it contains architectural works of the 15th century Lodhi dynasty. The gardens are situated between Khan Market and Safdarjung's Tomb on Lodhi Road and is a popular spot for morning walks for the residents of Delhi. The gardens are protected as a heritage site and maintained by the Archaeological Survey of India.",
    shortDescription: "Historic park with monuments from the 15th century Lodhi dynasty",
    location: {
      address: "Lodhi Road, New Delhi, Delhi 110003",
      district: "Central Delhi",
      coordinates: {
        latitude: 28.5933,
        longitude: 77.2207
      }
    },
    features: [
      "Historical Monuments",
      "Botanical Gardens",
      "Walking Trails",
      "Picnic Areas",
      "Bird Watching"
    ],
    amenities: {
      hasParking: true,
      hasRestrooms: true,
      hasPlayground: false,
      hasWaterFeature: true,
      hasFitnessArea: true,
      hasAccessiblePaths: true,
      hasPicnicArea: true,
      hasCafeteria: false
    },
    openingHours: {
      weekdays: "5:00 AM - 8:00 PM",
      weekends: "5:00 AM - 8:00 PM",
      holidays: "5:00 AM - 8:00 PM"
    },
    entryFee: {
      adults: 0,
      children: 0,
      seniors: 0
    },
    images: {
      main: "/images/lodhi-gardens-main.jpg",
      gallery: [
        "/images/lodhi-gardens-1.jpg",
        "/images/lodhi-gardens-2.jpg",
        "/images/lodhi-gardens-3.jpg",
        "/images/lodhi-gardens-4.jpg"
      ]
    },
    events: [
      {
        id: "morning-yoga",
        name: "Morning Yoga Sessions",
        date: "Every Saturday, 6:00 AM - 7:30 AM",
        description: "Join our certified yoga instructors for a rejuvenating morning yoga session amidst the greenery and historical monuments."
      },
      {
        id: "heritage-walk",
        name: "Heritage Walk",
        date: "First Sunday of every month, 9:00 AM - 11:00 AM",
        description: "Explore the rich history of Lodhi Gardens with our expert guides who will take you through the historical monuments and share fascinating stories."
      }
    ],
    reviews: {
      rating: 4.7,
      count: 12500
    },
    nearbyAttractions: [
      "Khan Market",
      "India International Centre",
      "National Gallery of Modern Art",
      "Safdarjung's Tomb"
    ],
    lastUpdated: "2023-09-15",
    seoMetadata: {
      title: "Lodhi Gardens - Historic Park in Central Delhi | DDA Parks",
      description: "Explore Lodhi Gardens, a 90-acre historic park in Central Delhi featuring 15th century monuments, walking trails, and botanical gardens. Open daily from 5 AM to 8 PM with free entry.",
      keywords: ["Lodhi Gardens", "historic park", "Delhi monuments", "morning walk", "botanical garden", "heritage site"]
    }
  },
  {
    id: "nehru-park",
    name: "Nehru Park",
    slug: "nehru-park",
    description: "Nehru Park is a large park situated in the Chanakyapuri diplomatic area of New Delhi. Named after India's first Prime Minister, Jawaharlal Nehru, this park is spread over 80 acres and is one of the most popular parks in Delhi. The park features beautiful landscaped gardens, jogging tracks, and open spaces for recreational activities. It is also a venue for cultural events, including the famous 'Morning Ragas' and 'Music in the Park' concerts.",
    shortDescription: "Sprawling park named after India's first Prime Minister in the diplomatic enclave",
    location: {
      address: "Vinay Marg, Chanakyapuri, New Delhi, Delhi 110021",
      district: "South Delhi",
      coordinates: {
        latitude: 28.5883,
        longitude: 77.1989
      }
    },
    features: [
      "Landscaped Gardens",
      "Jogging Tracks",
      "Open Lawns",
      "Cultural Events Venue",
      "Musical Fountain"
    ],
    amenities: {
      hasParking: true,
      hasRestrooms: true,
      hasPlayground: true,
      hasWaterFeature: true,
      hasFitnessArea: true,
      hasAccessiblePaths: true,
      hasPicnicArea: true,
      hasCafeteria: true
    },
    openingHours: {
      weekdays: "5:00 AM - 9:00 PM",
      weekends: "5:00 AM - 9:00 PM",
      holidays: "5:00 AM - 9:00 PM"
    },
    entryFee: {
      adults: 0,
      children: 0,
      seniors: 0
    },
    images: {
      main: "/images/nehru-park-main.jpg",
      gallery: [
        "/images/nehru-park-1.jpg",
        "/images/nehru-park-2.jpg",
        "/images/nehru-park-3.jpg",
        "/images/nehru-park-4.jpg"
      ]
    },
    events: [
      {
        id: "music-in-park",
        name: "Music in the Park",
        date: "Last Saturday of every month, 6:30 PM - 8:30 PM",
        description: "Enjoy live music performances by renowned artists in the serene environment of Nehru Park."
      },
      {
        id: "morning-ragas",
        name: "Morning Ragas",
        date: "First Sunday of every month, 6:00 AM - 8:00 AM",
        description: "Experience the magic of classical Indian music with performances by maestros in the peaceful morning ambiance."
      },
      {
        id: "yoga-day",
        name: "International Yoga Day Celebration",
        date: "June 21, 6:00 AM - 9:00 AM",
        description: "Join thousands of yoga enthusiasts in celebrating International Yoga Day with mass yoga sessions and wellness activities."
      }
    ],
    reviews: {
      rating: 4.6,
      count: 9800
    },
    nearbyAttractions: [
      "Chanakyapuri Diplomatic Enclave",
      "Santushti Shopping Complex",
      "Leela Palace Hotel",
      "National Rail Museum"
    ],
    lastUpdated: "2023-10-05",
    seoMetadata: {
      title: "Nehru Park - Scenic Park in Chanakyapuri | DDA Parks",
      description: "Visit Nehru Park, an 80-acre scenic park in Chanakyapuri featuring jogging tracks, musical fountains, and regular cultural events. Perfect for morning walks and family outings.",
      keywords: ["Nehru Park", "Chanakyapuri", "jogging track", "music in the park", "morning ragas", "Delhi parks"]
    }
  },
  {
    id: "deer-park",
    name: "Deer Park",
    slug: "deer-park",
    description: "Deer Park, officially known as A.N. Jha Deer Park, is a large park located in Hauz Khas, South Delhi. As the name suggests, the park is home to a large number of deer, as well as various other forms of wildlife including peacocks, rabbits, and guinea pigs. The park is divided into four sections: Deer Park, Duck Park, Rabbit Park, and District Park, each offering unique attractions. The park also features a beautiful lake, jogging tracks, and picnic spots, making it a popular destination for nature lovers and families.",
    shortDescription: "Wildlife park with a deer enclosure and beautiful lake in Hauz Khas",
    location: {
      address: "Hauz Khas, New Delhi, Delhi 110016",
      district: "South Delhi",
      coordinates: {
        latitude: 28.5542,
        longitude: 77.2030
      }
    },
    features: [
      "Deer Enclosure",
      "Lake",
      "Walking Paths",
      "Bird Watching",
      "Picnic Areas"
    ],
    amenities: {
      hasParking: true,
      hasRestrooms: true,
      hasPlayground: true,
      hasWaterFeature: true,
      hasFitnessArea: true,
      hasAccessiblePaths: true,
      hasPicnicArea: true,
      hasCafeteria: false
    },
    openingHours: {
      weekdays: "5:30 AM - 8:00 PM",
      weekends: "5:30 AM - 8:00 PM",
      holidays: "5:30 AM - 8:00 PM"
    },
    entryFee: {
      adults: 0,
      children: 0,
      seniors: 0
    },
    images: {
      main: "/images/deer-park-main.jpg",
      gallery: [
        "/images/deer-park-1.jpg",
        "/images/deer-park-2.jpg",
        "/images/deer-park-3.jpg",
        "/images/deer-park-4.jpg"
      ]
    },
    events: [
      {
        id: "nature-walk",
        name: "Guided Nature Walk",
        date: "Second Sunday of every month, 7:00 AM - 9:00 AM",
        description: "Join our naturalists for a guided walk through the park to learn about the local flora and fauna."
      },
      {
        id: "bird-watching",
        name: "Bird Watching Tour",
        date: "First Saturday of every month, 6:30 AM - 8:30 AM",
        description: "Explore the diverse bird species in the park with expert ornithologists. Binoculars will be provided."
      }
    ],
    reviews: {
      rating: 4.5,
      count: 7200
    },
    nearbyAttractions: [
      "Hauz Khas Village",
      "Hauz Khas Fort",
      "Hauz Khas Lake",
      "Green Park Market"
    ],
    lastUpdated: "2023-09-28",
    seoMetadata: {
      title: "Deer Park - Wildlife Park in Hauz Khas | DDA Parks",
      description: "Explore Deer Park in Hauz Khas, home to deer, peacocks, and rabbits. Enjoy the lake, walking paths, and picnic areas in this wildlife sanctuary in the heart of South Delhi.",
      keywords: ["Deer Park", "Hauz Khas", "wildlife park", "deer enclosure", "bird watching", "Delhi lake"]
    }
  }
];

export const getParks = () => {
  return parksData;
};

export const getParkBySlug = (slug: string) => {
  return parksData.find(park => park.slug === slug);
};

export const getParksByDistrict = (district: string) => {
  return parksData.filter(park => park.location.district === district);
};

export const getParksByFeature = (feature: string) => {
  return parksData.filter(park => park.features.includes(feature));
};

export const getParksWithAmenity = (amenity: keyof Park['amenities']) => {
  return parksData.filter(park => park.amenities[amenity]);
};

export const searchParks = (query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  return parksData.filter(park => 
    park.name.toLowerCase().includes(lowerCaseQuery) ||
    park.description.toLowerCase().includes(lowerCaseQuery) ||
    park.features.some(feature => feature.toLowerCase().includes(lowerCaseQuery)) ||
    park.location.district.toLowerCase().includes(lowerCaseQuery)
  );
};
