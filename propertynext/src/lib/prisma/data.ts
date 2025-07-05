// prisma/data.ts

// --- 1. Define or Re-export Your Types (Aligned with new Schema) ---
export type UserType = {
  id: string // Mock ID, will be used for mapping
  name: string
  image?: string // Was avatar, maps to User.image
  email: string
  contact?: string // Could go to Profile.phoneNumber
}

// Data for AgentProfile
export type AgentProfileDataType = {
  userId: string // Mock User ID
  bio?: string
  specialty?: string
  yearsExperience?: number
  phoneNumber?: string
  licenseNumber?: string
  officeAddress?: string
  // Properties from old AgentType
  experience: number // Will map to yearsExperience
  address: string // Will map to officeAddress
  // joinDate: Date // Not directly in schema, maybe bio?
  // propertiesManaged: number // Not directly in schema, maybe bio?
}

// Data for CustomerProfile
export type CustomerProfileDataType = {
  userId: string // Mock User ID
  phoneNumber?: string
  preferences?: {
    interestedPropertyTypes?: string[]
    interestedPropertiesList?: string
    leadStatus?: string // e.g., from old customerStatus
    availability?: string // e.g., from old status
  }
  budget?: string // e.g., "928,128" - maps to budget
  // Properties from old CustomerType
  propertyInterestType: string
  customerLeadStatus: string
  availabilityStatus: string
  totalInvestment: string // Will map to budget
}

export type TransactionDataType = {
  id: string // Mock ID
  userId: string // Mock User ID (this will be the customer)
  propertyId: string // Mock Property ID
  agentMockUserId: string // NEW: Mock User ID of the agent for easier linking
  purchaseDate: Date
  paymentType: string // e.g., "Purchase", "Rent" - to map to TransactionType
  paymentStatus: string // e.g., "Completed" - to map to TransactionStatus
  amount: string // e.g., "45,842"
  description?: string // Can help determine TransactionType
}

export type PropertyDataType = {
  id: string // Mock ID
  title: string // Was name
  description: string // NEW
  price: string // e.g., "8,930"
  address: string // Was location, more structured now
  city: string // NEW
  state?: string // NEW
  zipCode: string // NEW
  country: string
  propertyType: string // e.g., "Residences", "Villas" - maps to Property.propertyType (string)
  bedrooms: number // Was beds
  bathrooms: number // Was bath
  area: number // Was size
  listingStatus: string // Was 'type' (Rent, Sale, Sold) - maps to PropertyStatus enum
  ownerMockUserId: string // NEW: Mock User ID of the owner (e.g., an agent)
  image: string // Main image, will become primary PropertyImage
}

export type ReviewDataType = {
  id: string // Mock ID
  userId: string // Mock User ID of reviewer
  propertyId: string // Mock Property ID
  rating: number
  comment: string // Combined from review.title and review.description
  reviewDate: Date // Was date, maps to createdAt
}

// --- Utility Functions & Constants (Keep as is) ---
export function addOrSubtractDaysFromDate(days: number, date: Date = new Date()): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function addOrSubtractMinutesFromDate(minutes: number, date: Date = new Date()): Date {
  const result = new Date(date)
  result.setMinutes(result.getMinutes() + minutes)
  return result
}
export const currency: string = '$' // Still useful if you want to re-add placeholders

// --- Asset Paths (Keep as is, but ensure they are used correctly) ---
export const avatar1: string = '/img/user-1.jpg'
export const avatar2: string = '/img/user-2.jpg'
export const avatar3: string = '/img/user-3.jpg'
export const avatar4: string = '/img/user-4.jpg'
export const avatar5: string = '/img/user-5.jpg'
export const avatar6: string = '/img/user-6.jpg'
export const avatar7: string = '/img/user-7.jpg'
export const avatar8: string = '/img/user-8.jpg'
export const avatar9: string = '/img/user-9.jpg'

export const properties1: string = '/img/p-1.jpg'
export const properties2: string = '/img/p-2.jpg'
export const properties3: string = '/img/p-3.jpg'
export const properties4: string = '/img/p-4.jpg'
export const properties5: string = '/img/p-5.jpg'
export const properties6: string = '/img/p-6.jpg'
export const properties7: string = '/img/p-7.jpg'
export const properties8: string = '/img/p-8.jpg'
export const properties9: string = '/img/p-9.jpg'
export const properties10: string = '/img/p-10.jpg'

// Card images not directly used in schema, but can be kept if UI needs them later
// export const mastercard: string = '@/assets/images/card/mastercard.svg'
// export const paypal: string = '@/assets/images/card/paypal.svg'
// export const visa: string = '@/assets/images/card/visa.svg'

// --- 4. Your Mock Data Arrays (ADJUSTED AND POPULATED) ---

export const mockUserData: UserType[] = [
  { id: 'user-1', name: 'Michael A. Miner', email: 'michael.miner@example.com', image: avatar1, contact: '+2310675820711' },
  { id: 'user-2', name: 'Theresa T. Brose', email: 'theresa.brose@example.com', image: avatar2, contact: '+2314723456789' },
  { id: 'user-3', name: 'James L. Erickson', email: 'james.erickson@example.com', image: avatar3, contact: '+2317334567890' },
  { id: 'user-4', name: 'Lily W. Wilson', email: 'lily.wilson@example.com', image: avatar4, contact: '+2314545678901' },
  { id: 'user-5', name: 'Sarah M. Brooks', email: 'sarah.brooks@example.com', image: avatar5, contact: '+2311656789012' },
  { id: 'user-6', name: 'Joe K. Hall', email: 'joe.hall@example.com', image: avatar6, contact: '+2318267890123' },
  { id: 'user-7', name: 'Robert V. Leavitt', email: 'robert.leavitt@example.com', image: avatar7, contact: '+7873613184753' },
  { id: 'user-8', name: 'Lydia Anderson', email: 'lydia.anderson@example.com', image: avatar8, contact: '+7876028511066' },
  { id: 'user-9', name: 'Sarah Martinez', email: 'sarah.martinez@example.com', image: avatar9, contact: '+2314545678901' },
  // Additional customer-only user
  { id: 'user-10', name: 'David Lee', email: 'david.lee@example.com', image: avatar1, contact: '+1234567890' },
]

// Data for Agent Profiles (derived from old agentData)
export const mockAgentProfileData: AgentProfileDataType[] = [
  {
    userId: 'user-1',
    experience: 5,
    address: 'Lincoln Drive Harrisburg, PA 17101 U.S.A',
    bio: 'Top performing agent specializing in residential properties.',
    specialty: 'Residential Sales',
    phoneNumber: '+2310675820711',
    licenseNumber: 'AGNT001',
  },
  {
    userId: 'user-2',
    experience: 2,
    address: 'Boulevard Cockeysville TX 75204',
    bio: 'Dedicated agent with a focus on commercial real estate.',
    specialty: 'Commercial Real Estate',
    phoneNumber: '+2314723456789',
    licenseNumber: 'AGNT002',
  },
  {
    userId: 'user-3',
    experience: 7,
    address: 'Woodside Circle Panama City, FL 32401',
    bio: 'Seven years of experience in luxury homes.',
    specialty: 'Luxury Homes',
    phoneNumber: '+2317334567890',
    licenseNumber: 'AGNT003',
  },
  {
    userId: 'user-7',
    experience: 2,
    address: 'Stockert Hollow Road Redmond, WA 98052',
    bio: 'Helping clients find their dream vacation homes.',
    specialty: 'Vacation Properties',
    phoneNumber: '+7873613184753',
    licenseNumber: 'AGNT007',
  },
  {
    userId: 'user-9',
    experience: 5,
    address: '500 Logan Lane Denver, CO 80220',
    bio: 'Expert in urban development and new constructions.',
    specialty: 'Urban Development',
    phoneNumber: '+2314545678901',
    licenseNumber: 'AGNT009',
  },
]

// Data for Customer Profiles (derived from old customerData)
export const mockCustomerProfileData: CustomerProfileDataType[] = [
  {
    userId: 'user-4', // Lily W. Wilson as a customer
    propertyInterestType: 'Residential',
    customerLeadStatus: 'Interested',
    availabilityStatus: 'Available',
    totalInvestment: '635812',
    phoneNumber: '+2314545678901',
    preferences: {
      interestedPropertyTypes: ['Residential'],
      interestedPropertiesList: '303 Elm St',
      leadStatus: 'Interested',
      availability: 'Available',
    },
  },
  {
    userId: 'user-5', // Sarah M. Brooks as a customer
    propertyInterestType: 'Industrial',
    customerLeadStatus: 'Follow-up',
    availabilityStatus: 'Available',
    totalInvestment: '733291',
    phoneNumber: '+2311656789012',
    preferences: { interestedPropertyTypes: ['Industrial'], leadStatus: 'Follow-up', availability: 'Available' },
  },
  {
    userId: 'user-6', // Joe K. Hall as a customer
    propertyInterestType: 'Residential',
    customerLeadStatus: 'Interested',
    availabilityStatus: 'Unavailable',
    totalInvestment: '831760',
    phoneNumber: '+2318267890123',
    preferences: { interestedPropertyTypes: ['Residential'], leadStatus: 'Interested', availability: 'Unavailable' },
  },
  {
    userId: 'user-8', // Lydia Anderson as a customer
    propertyInterestType: 'Residential',
    customerLeadStatus: 'Interested',
    availabilityStatus: 'Available',
    totalInvestment: '928128', // remove comma for parsing
    phoneNumber: '+7876028511066',
    preferences: {
      interestedPropertyTypes: ['Residential'],
      interestedPropertiesList: '808 Willow Dr, 909 Aspen Ln',
      leadStatus: 'Interested',
      availability: 'Available',
    },
  },
  {
    userId: 'user-10', // David Lee as a customer
    propertyInterestType: 'Commercial',
    customerLeadStatus: 'Under Review',
    availabilityStatus: 'Available',
    totalInvestment: '550000',
    phoneNumber: '+1234567890',
    preferences: { interestedPropertyTypes: ['Commercial'], leadStatus: 'Under Review', availability: 'Available' },
  },
]

export const mockPropertyData: PropertyDataType[] = [
  {
    id: 'prop-101',
    title: 'Dvilla Residences Batu',
    description:
      'A beautiful residence perfect for families, offering modern amenities and a serene environment. Spacious rooms and a well-maintained garden.',
    price: '8930',
    address: '4604 Philli Lane',
    city: 'Kiowa',
    state: 'CO',
    zipCode: '80117',
    country: 'USA',
    propertyType: 'Residences',
    bedrooms: 5,
    bathrooms: 4,
    area: 1400,
    listingStatus: 'RENTED',
    ownerMockUserId: 'user-1',
    image: properties1,
  },
  {
    id: 'prop-102',
    title: 'PIK Villa House',
    description: 'Luxurious villa with stunning ocean views. Features include a private pool, expansive deck, and state-of-the-art kitchen.',
    price: '60691',
    address: '127 Boulevard',
    city: 'Cockeysville',
    state: 'MD',
    zipCode: '21030',
    country: 'USA',
    propertyType: 'Villas',
    bedrooms: 6,
    bathrooms: 5,
    area: 1700,
    listingStatus: 'SOLD',
    ownerMockUserId: 'user-2',
    image: properties2,
  },
  {
    id: 'prop-103',
    title: 'Tungis Luxury',
    description: 'Elegant bungalow with classic architecture and modern comforts, set in a prestigious neighborhood.',
    price: '70245',
    address: '900 Creside',
    city: 'Appleton',
    state: 'WI',
    zipCode: '54913',
    country: 'USA',
    propertyType: 'Bungalow',
    bedrooms: 4,
    bathrooms: 3,
    area: 1200,
    listingStatus: 'ACTIVE',
    ownerMockUserId: 'user-3',
    image: properties3,
  },
  {
    id: 'prop-104',
    title: 'Luxury Apartment Downtown',
    description: 'Chic downtown apartment with breathtaking city views, close to all amenities and transport links.',
    price: '5825',
    address: '223 Creside',
    city: 'Santa Maria',
    state: 'CA',
    zipCode: '93454',
    country: 'USA',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 900,
    listingStatus: 'RENTED',
    ownerMockUserId: 'user-1',
    image: properties4,
  },
  {
    id: 'prop-105',
    title: 'Weekend Villa MBH',
    description: 'Perfect weekend getaway villa with a large garden, private lake access, and cozy interiors.',
    price: '90674',
    address: '980 Jim Rosa Lane',
    city: 'Dublin',
    state: 'OH',
    zipCode: '43017',
    country: 'USA',
    propertyType: 'Villas',
    bedrooms: 5,
    bathrooms: 5,
    area: 1900,
    listingStatus: 'ACTIVE',
    ownerMockUserId: 'user-7',
    image: properties5,
  },
  {
    id: 'prop-106',
    title: 'Luxury Penthouse Suite',
    description: 'Exclusive penthouse offering unparalleled luxury, panoramic city views, and top-tier amenities.',
    price: '10500',
    address: 'Sumner Street',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90012',
    country: 'USA',
    propertyType: 'Penthouse',
    bedrooms: 7,
    bathrooms: 6,
    area: 2000,
    listingStatus: 'RENTED',
    ownerMockUserId: 'user-9',
    image: properties6,
  },
  {
    id: 'prop-107',
    title: 'Ojiag Duplex House',
    description: 'Modern duplex house in a quiet residential area, ideal for small families or professionals.',
    price: '75341',
    address: '24 Hanover',
    city: 'New York',
    state: 'NY',
    zipCode: '10004',
    country: 'USA',
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 1300, // Changed from Apartment to Duplex in type
    listingStatus: 'SOLD',
    ownerMockUserId: 'user-1',
    image: properties7,
  },
  {
    id: 'prop-108',
    title: 'Luxury Bungalow Villas',
    description: 'A collection of luxury bungalow villas offering privacy, comfort, and high-end finishes.',
    price: '54230',
    address: 'Khale Street',
    city: 'Florence',
    state: 'SC',
    zipCode: '29501',
    country: 'USA',
    propertyType: 'Bungalow',
    bedrooms: 4,
    bathrooms: 3,
    area: 1200,
    listingStatus: 'ACTIVE',
    ownerMockUserId: 'user-3',
    image: properties8,
  },
  {
    id: 'prop-109',
    title: 'Duplex Residences',
    description: 'Spacious duplex residences with contemporary design, perfect for modern living.',
    price: '14564',
    address: '25 Willison Street',
    city: 'Becker',
    state: 'MN',
    zipCode: '55308',
    country: 'Canada',
    propertyType: 'Residences',
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    listingStatus: 'RENTED',
    ownerMockUserId: 'user-7',
    image: properties9,
  },
  {
    id: 'prop-110',
    title: 'Woodis B. Apartment Complex',
    description: 'Well-maintained apartment complex offering various unit sizes, close to parks and schools.',
    price: '34341',
    address: 'Bungalow Road',
    city: 'Niobrara',
    state: 'NE',
    zipCode: '68760',
    country: 'USA',
    propertyType: 'Apartment',
    bedrooms: 4,
    bathrooms: 3,
    area: 1700,
    listingStatus: 'SOLD',
    ownerMockUserId: 'user-9',
    image: properties10,
  },
]

export const mockTransactionData: TransactionDataType[] = [
  {
    id: 'txn-201',
    userId: 'user-4', // Customer: Lily W. Wilson
    propertyId: 'prop-101', // Dvilla Residences Batu
    agentMockUserId: 'user-1', // Agent: Michael A. Miner
    purchaseDate: addOrSubtractDaysFromDate(-50),
    paymentType: 'COMMISSION', // Was Mastercard, assuming commission for agent
    paymentStatus: 'COMPLETED', // Was Completed
    amount: '4582', // Reduced from original, as it's commission
    description: 'Commission for Dvilla Residences sale',
  },
  {
    id: 'txn-202',
    userId: 'user-5', // Customer: Sarah M. Brooks
    propertyId: 'prop-102', // PIK Villa House
    agentMockUserId: 'user-2', // Agent: Theresa T. Brose
    purchaseDate: addOrSubtractDaysFromDate(-150),
    paymentType: 'PURCHASE', // Was Visa
    paymentStatus: 'CANCELLED', // Was Cancel
    amount: '60691',
    description: 'Purchase of PIK Villa House (Cancelled)',
  },
  {
    id: 'txn-203',
    userId: 'user-6', // Customer: Joe K. Hall
    propertyId: 'prop-103', // Tungis Luxury
    agentMockUserId: 'user-3', // Agent: James L. Erickson
    purchaseDate: addOrSubtractDaysFromDate(-45),
    paymentType: 'DEPOSIT', // Was Paypal
    paymentStatus: 'COMPLETED', // Was Completed
    amount: '7000', // Deposit for Tungis Luxury
    description: 'Security deposit for Tungis Luxury',
  },
  {
    id: 'txn-204',
    userId: 'user-8', // Customer: Lydia Anderson
    propertyId: 'prop-105', // Weekend Villa MBH
    agentMockUserId: 'user-7', // Agent: Robert V. Leavitt
    purchaseDate: addOrSubtractDaysFromDate(-17),
    paymentType: 'RENT', // Was Mastercard
    paymentStatus: 'PENDING', // Was Pending
    amount: '9067', // Monthly rent for Weekend Villa
    description: 'First month rent for Weekend Villa MBH',
  },
  {
    id: 'txn-205',
    userId: 'user-10', // Customer: David Lee
    propertyId: 'prop-110', // Woodis B. Apartment
    agentMockUserId: 'user-9', // Agent: Sarah Martinez
    purchaseDate: addOrSubtractDaysFromDate(-12),
    paymentType: 'PURCHASE', // Was Visa
    paymentStatus: 'COMPLETED', // Was Cancel, changed to COMPLETED
    amount: '34341',
    description: 'Full payment for Woodis B. Apartment',
  },
]

export const mockReviewData: ReviewDataType[] = [
  {
    id: 'rev-501',
    userId: 'user-4', // Lily W. Wilson
    propertyId: 'prop-101', // Dvilla Residences Batu
    rating: 4,
    comment: 'Best For Family Living. The property was exactly as described and the buying process was smooth and hassle-free.',
    reviewDate: addOrSubtractDaysFromDate(-20),
  },
  {
    id: 'rev-502',
    userId: 'user-5', // Sarah M. Brooks
    propertyId: 'prop-102', // PIK Villa House
    rating: 3,
    comment: 'Best In Low Price. Great experience overall, but there were a few delays in communication.',
    reviewDate: addOrSubtractDaysFromDate(-70),
  },
  {
    id: 'rev-503',
    userId: 'user-6', // Joe K. Hall
    propertyId: 'prop-103', // Tungis Luxury
    rating: 5, // Original had 4.3, Prisma is Int
    comment: 'Agent Is Good. Fantastic service and very knowledgeable agent. Highly recommend!',
    reviewDate: addOrSubtractDaysFromDate(-15),
  },
  {
    id: 'rev-504',
    userId: 'user-8', // Lydia Anderson
    propertyId: 'prop-105', // Weekend Villa MBH (Changed from prop-104)
    rating: 3, // Original had 3.1
    comment: 'Renovation Requirement. Good experience, but the property needed more repairs than expected.',
    reviewDate: addOrSubtractDaysFromDate(-30),
  },
  {
    id: 'rev-505',
    userId: 'user-10', // David Lee
    propertyId: 'prop-110', // Woodis B. Apartment (Changed from prop-105)
    rating: 4, // Original had 4.4
    comment: 'Best Property. Excellent service! The agent was very helpful and responsive throughout the process.',
    reviewDate: addOrSubtractDaysFromDate(-45),
  },
]
