import { PrismaClient, UserRole, PropertyStatus, TransactionStatus, TransactionType } from '@prisma/client'
import bcrypt from 'bcryptjs'

// --- Import from your new data.ts file ---
import {
  mockUserData,
  mockPropertyData,
  mockAgentProfileData,
  mockCustomerProfileData,
  mockTransactionData,
  mockReviewData,
  // Types
  UserType as MockUserType, // Not strictly needed if using data directly, but good for clarity
  AgentProfileDataType as MockAgentProfileType,
  CustomerProfileDataType as MockCustomerProfileType,
  PropertyDataType as MockPropertyType,
  TransactionDataType as MockTransactionType,
  ReviewDataType as MockReviewType,
  // Utility functions
  // addOrSubtractDaysFromDate, // Used within data.ts
  // currency as appCurrency, // No longer used directly
} from './data' // This path should now work if data.ts is next to seed.ts

const prisma = new PrismaClient()

// Helper to parse currency string "12,345.67" or "12345" to number
function parseCurrencyValue(value: string | number): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    return parseFloat(value.replace(/,/g, ''))
  }
  throw new Error(`Invalid currency value: ${value}`)
}

// --- Enum Mapping Functions ---
function mapMockPropertyListingStatusToEnum(status: string): PropertyStatus {
  const normalized = status.toLowerCase()
  if (normalized === 'rent' || normalized === 'rented') return PropertyStatus.RENTED
  if (normalized === 'sale' || normalized === 'active') return PropertyStatus.ACTIVE
  if (normalized === 'sold') return PropertyStatus.SOLD
  if (normalized === 'pending') return PropertyStatus.PENDING
  if (normalized === 'inactive') return PropertyStatus.INACTIVE
  console.warn(`Unknown property listing status: ${status}. Defaulting to INACTIVE.`)
  return PropertyStatus.INACTIVE // Default or throw error
}

function mapMockPaymentStatusToEnum(status: string): TransactionStatus {
  const normalized = status.toLowerCase()
  if (normalized === 'completed' || normalized === 'paid') return TransactionStatus.COMPLETED
  if (normalized === 'pending') return TransactionStatus.PENDING
  if (normalized === 'cancel' || normalized === 'cancelled') return TransactionStatus.CANCELLED
  if (normalized === 'refunded') return TransactionStatus.REFUNDED
  console.warn(`Unknown payment status: ${status}. Defaulting to PENDING.`)
  return TransactionStatus.PENDING // Default or throw error
}

function mapMockPaymentTypeToEnum(type: string, description?: string): TransactionType {
  const normalizedType = type.toLowerCase()
  const normalizedDesc = description?.toLowerCase() || ''

  if (normalizedType === 'purchase' || normalizedDesc.includes('purchase')) return TransactionType.PURCHASE
  if (normalizedType === 'rent' || normalizedDesc.includes('rent') || normalizedDesc.includes('rental')) return TransactionType.RENT
  if (normalizedType === 'deposit' || normalizedDesc.includes('deposit')) return TransactionType.DEPOSIT
  if (normalizedType === 'commission' || normalizedDesc.includes('commission')) return TransactionType.COMMISSION

  console.warn(`Could not map payment type: ${type} / ${description}. Defaulting to PURCHASE.`)
  return TransactionType.PURCHASE // Default or throw error
}

async function main() {
  console.log('Start seeding ...')

  const saltRounds = 10
  const defaultPassword = 'Test@1234'
  const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds)

  console.log('Cleaning database (order matters due to relations)...')
  await prisma.review.deleteMany({})
  await prisma.transaction.deleteMany({})
  await prisma.propertyImage.deleteMany({})
  await prisma.property.deleteMany({})
  await prisma.agentProfile.deleteMany({})
  await prisma.customerProfile.deleteMany({})
  // Standard NextAuth tables (if you use NextAuth with Prisma adapter)
  await prisma.account.deleteMany({})
  await prisma.session.deleteMany({})
  // Other tables from your schema
  await prisma.userDevice.deleteMany({})
  await prisma.passwordReset.deleteMany({})
  await prisma.verificationToken.deleteMany({})
  await prisma.user.deleteMany({}) // User last due to FKs
  console.log('Database cleaned.')

  // --- Maps to store Prisma IDs against mock IDs ---
  const createdUserMap = new Map<string, string>() // mockId -> prismaUserId
  const createdAgentProfileMap = new Map<string, string>() // mockUserId -> agentProfileId
  const createdCustomerProfileMap = new Map<string, string>() // mockUserId -> customerProfileId
  const createdPropertyMap = new Map<string, string>() // mockPropertyId -> prismaPropertyId

  console.log('Seeding Users, AgentProfiles, and CustomerProfiles...')
  for (const u of mockUserData) {
    let userRole: UserRole = UserRole.CUSTOMER // Default

    const isAgent = mockAgentProfileData.some((ap) => ap.userId === u.id)
    // const isCustomer = mockCustomerProfileData.some(cp => cp.userId === u.id); // All users can potentially be customers

    if (isAgent) {
      userRole = UserRole.AGENT
    }
    // If a user has an agent profile, their primary role is AGENT.
    // They can still have a customer profile for their own transactions.

    const createdUser = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        password: hashedPassword,
        image: u.image,
        role: userRole,
        emailVerified: new Date(),
      },
    })
    createdUserMap.set(u.id, createdUser.id)
    console.log(`Created User: ${createdUser.name} (MockID: ${u.id}, DBID: ${createdUser.id}, Role: ${userRole})`)

    const agentProfileData = mockAgentProfileData.find((ap) => ap.userId === u.id)
    if (agentProfileData) {
      const createdAgentProfile = await prisma.agentProfile.create({
        data: {
          userId: createdUser.id,
          bio: agentProfileData.bio || `Agent profile for ${createdUser.name}.`,
          specialty: agentProfileData.specialty || 'General Real Estate',
          yearsExperience: agentProfileData.experience,
          phoneNumber: agentProfileData.phoneNumber || u.contact,
          licenseNumber: agentProfileData.licenseNumber || `AGENT-${Math.random().toString(16).slice(2, 8).toUpperCase()}`,
          officeAddress: agentProfileData.address,
          rating: Math.floor(Math.random() * 20 + 31) / 10, // Random rating 3.0-5.0
          commissionRate: parseFloat((Math.random() * (0.07 - 0.02) + 0.02).toFixed(3)), // Random 2-7%
        },
      })
      createdAgentProfileMap.set(u.id, createdAgentProfile.id)
      console.log(`  Created AgentProfile for ${createdUser.name}`)
    }

    const customerProfileData = mockCustomerProfileData.find((cp) => cp.userId === u.id)
    if (customerProfileData) {
      const createdCustomerProfile = await prisma.customerProfile.create({
        data: {
          userId: createdUser.id,
          phoneNumber: customerProfileData.phoneNumber || u.contact,
          preferences: customerProfileData.preferences || undefined,
          budget: customerProfileData.totalInvestment ? parseCurrencyValue(customerProfileData.totalInvestment) : undefined,
        },
      })
      createdCustomerProfileMap.set(u.id, createdCustomerProfile.id)
      console.log(`  Created CustomerProfile for ${createdUser.name}`)
    }
  }
  // Admin User
  const adminEmail = 'admin@example.com'
  let adminUser = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMIN,
        emailVerified: new Date(),
      },
    })
    console.log(`Created Admin User (DBID: ${adminUser.id})`)
    createdUserMap.set('admin-user', adminUser.id)
  } else {
    await prisma.user.update({ where: { id: adminUser.id }, data: { role: UserRole.ADMIN, password: hashedPassword } })
    console.log(`Updated Admin User (DBID: ${adminUser.id})`)
    if (!createdUserMap.has('admin-user')) createdUserMap.set('admin-user', adminUser.id)
  }

  console.log(`Seeded ${createdUserMap.size - 1} users (and profiles) and 1 admin user.`)

  console.log('Seeding Properties and PropertyImages...')
  for (const p of mockPropertyData) {
    const ownerPrismaId = createdUserMap.get(p.ownerMockUserId)
    if (!ownerPrismaId) {
      console.warn(`Property "${p.title}": Owner with mock ID ${p.ownerMockUserId} not found. Skipping.`)
      continue
    }
    // Ensure the owner is an AGENT or ADMIN
    const ownerUser = await prisma.user.findUnique({ where: { id: ownerPrismaId } })
    if (!ownerUser || (ownerUser.role !== UserRole.AGENT && ownerUser.role !== UserRole.ADMIN)) {
      console.warn(`Property "${p.title}": Owner ${ownerUser?.name} (MockID: ${p.ownerMockUserId}) is not an AGENT or ADMIN. Skipping property.`)
      continue
    }

    const createdProperty = await prisma.property.create({
      data: {
        title: p.title,
        description: p.description,
        price: parseCurrencyValue(p.price),
        address: p.address,
        city: p.city,
        state: p.state,
        zipCode: p.zipCode,
        country: p.country,
        propertyType: p.propertyType,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        area: p.area,
        status: mapMockPropertyListingStatusToEnum(p.listingStatus),
        ownerId: ownerPrismaId,
        featured: Math.random() < 0.3,
        images: {
          create: [{ url: p.image, isPrimary: true }],
        },
      },
    })
    createdPropertyMap.set(p.id, createdProperty.id)
    console.log(`Created Property: ${createdProperty.title} (MockID: ${p.id}, DBID: ${createdProperty.id}) owned by ${ownerUser.name}.`)
  }
  console.log(`Seeded ${createdPropertyMap.size} properties.`)

  console.log('Seeding Transactions...')
  let transactionCount = 0
  for (const t of mockTransactionData) {
    const customerPrismaProfileId = createdCustomerProfileMap.get(t.userId)
    const agentPrismaProfileId = createdAgentProfileMap.get(t.agentMockUserId)
    const propertyPrismaId = createdPropertyMap.get(t.propertyId)

    if (!customerPrismaProfileId) {
      console.warn(`Transaction ${t.id}: CustomerProfile for mock user ID ${t.userId} not found. Skipping.`)
      continue
    }
    if (!agentPrismaProfileId) {
      console.warn(`Transaction ${t.id}: AgentProfile for mock user ID ${t.agentMockUserId} not found. Skipping.`)
      continue
    }
    if (!propertyPrismaId) {
      console.warn(`Transaction ${t.id}: Property with mock ID ${t.propertyId} not found. Skipping.`)
      continue
    }

    await prisma.transaction.create({
      data: {
        propertyId: propertyPrismaId,
        customerId: customerPrismaProfileId,
        agentId: agentPrismaProfileId,
        amount: parseCurrencyValue(t.amount),
        status: mapMockPaymentStatusToEnum(t.paymentStatus),
        type: mapMockPaymentTypeToEnum(t.paymentType, t.description),
        date: t.purchaseDate,
      },
    })
    transactionCount++
    console.log(`Created Transaction: mock ID ${t.id} for property mock ID ${t.propertyId}`)
  }
  console.log(`Seeded ${transactionCount} transactions.`)

  console.log('Seeding Reviews...')
  let reviewCount = 0
  for (const r of mockReviewData) {
    const userPrismaId = createdUserMap.get(r.userId)
    const propertyPrismaId = createdPropertyMap.get(r.propertyId)

    if (!userPrismaId) {
      console.warn(`Review ${r.id}: User with mock ID ${r.userId} not found. Skipping.`)
      continue
    }
    if (!propertyPrismaId) {
      console.warn(`Review ${r.id}: Property with mock ID ${r.propertyId} not found. Skipping.`)
      continue
    }

    const existingReview = await prisma.review.findUnique({
      where: { propertyId_userId: { propertyId: propertyPrismaId, userId: userPrismaId } },
    })

    if (existingReview) {
      console.warn(`Review for property ${r.propertyId} by user ${r.userId} already exists. Skipping.`)
      continue
    }

    await prisma.review.create({
      data: {
        propertyId: propertyPrismaId,
        userId: userPrismaId,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.reviewDate,
      },
    })
    reviewCount++
    console.log(`Created Review: mock ID ${r.id} for property mock ID ${r.propertyId} by user mock ID ${r.userId}`)
  }
  console.log(`Seeded ${reviewCount} reviews.`)

  console.log('Seeding finished.')
}

main()
  .catch(async (e) => {
    console.error('Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
