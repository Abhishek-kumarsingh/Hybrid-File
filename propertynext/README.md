# PropertyNext - Full-Stack Property Management Application

A comprehensive property listing platform built with Next.js, featuring role-based authentication, admin approval workflow, and real-time property management.

## 🚀 Features

### **Authentication & Authorization**
- **Role-based access control** (Admin, Agent, Customer)
- **JWT authentication** with NextAuth.js
- **Protected routes** and API endpoints
- **Social login** support (Google, Facebook, GitHub)
- **Account security** with device tracking and rate limiting

### **Property Management**
- **Property submission** with image upload
- **Admin approval workflow** (Pending → Under Review → Approved/Rejected)
- **Real-time status tracking** for property owners
- **Advanced search and filtering** (location, price, type, amenities)
- **Property analytics** and performance metrics

### **Admin Dashboard**
- **Property approval interface** with bulk actions
- **Comprehensive analytics** and reporting
- **User management** and role assignment
- **System statistics** and performance monitoring
- **Notification management**

### **User Dashboard**
- **Property submission tracking**
- **Approval status monitoring**
- **Performance analytics** (approval rates, views, etc.)
- **Notification center**
- **Property portfolio management**

### **Public Features**
- **Property listings** (approved properties only)
- **Advanced search** with filters and sorting
- **Property details** with image galleries
- **Reviews and ratings** system
- **Responsive design** for all devices

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 18** - UI library with hooks and context
- **Tailwind CSS** - Utility-first CSS framework
- **Bootstrap 5** - Component library
- **React Hook Form** - Form management
- **React Query** - Data fetching and caching

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database toolkit and query builder
- **PostgreSQL** - Primary database
- **JWT** - Authentication tokens
- **Zod** - Schema validation

### **Additional Tools**
- **TypeScript** - Type safety
- **ESLint & Prettier** - Code formatting and linting
- **Husky** - Git hooks
- **Jest** - Testing framework
- **Cloudinary** - Image storage and optimization

## 📋 Prerequisites

- **Node.js** 16.0 or higher
- **npm** 8.0 or higher
- **PostgreSQL** database
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd propertynext
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/propertynext"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Image Upload (Optional)
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"

# Email Service (Optional)
SMTP_HOST="your-smtp-host"
SMTP_PORT="587"
SMTP_USER="your-smtp-user"
SMTP_PASS="your-smtp-password"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (admin)/           # Admin dashboard pages
│   ├── (landing)/         # Public pages
│   ├── (other)/           # Auth and utility pages
│   ├── api/               # API routes
│   └── layout.jsx         # Root layout
├── components/            # Reusable components
│   ├── dashboard/         # Dashboard components
│   ├── property/          # Property-related components
│   ├── layout/            # Layout components
│   └── wrappers/          # Utility wrappers
├── lib/                   # Utility libraries
│   ├── prisma/            # Database schema and client
│   ├── auth/              # Authentication utilities
│   ├── validators/        # Input validation schemas
│   └── middleware/        # API middleware
├── hooks/                 # Custom React hooks
├── context/               # React context providers
├── styles/                # Global styles
└── types/                 # TypeScript type definitions
```

## 🔐 Authentication Flow

### User Registration/Login
1. User registers with email/password or social login
2. Account verification (optional)
3. Role assignment (Customer by default)
4. JWT token generation and session management

### Admin Access
1. Admin login with elevated privileges
2. Access to admin dashboard at `/app/(admin)`
3. Property approval and user management capabilities

## 🏠 Property Workflow

### Property Submission
1. **User submits property** with details and images
2. **Status: PENDING** - Awaiting admin review
3. **Notification sent** to user confirming submission

### Admin Review Process
1. **Admin reviews** property in approval dashboard
2. **Options**: Approve, Reject, or Mark Under Review
3. **Rejection requires reason** for transparency
4. **Automatic notifications** sent to property owner

### Property Approval
1. **Status: APPROVED** - Property goes live
2. **Visible in public listings** with full search functionality
3. **Owner receives approval notification**

### Property Rejection
1. **Status: REJECTED** - Property not approved
2. **Rejection reason** provided to owner
3. **Owner can resubmit** after addressing issues

## 🎯 User Roles & Permissions

### **Customer**
- Submit property listings
- View own properties and status
- Receive notifications
- Access user dashboard

### **Agent**
- All Customer permissions
- Enhanced property management
- Agent-specific analytics
- Commission tracking

### **Admin**
- All system permissions
- Property approval/rejection
- User management
- System analytics
- Admin dashboard access

## 📊 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### **Properties**
- `GET /api/properties` - Get approved properties (public)
- `POST /api/properties` - Submit new property (auth required)
- `GET /api/properties/[id]` - Get property details
- `PUT /api/properties/[id]` - Update property (owner/admin)
- `DELETE /api/properties/[id]` - Delete property (owner/admin)

### **Admin**
- `GET /api/admin/properties/pending` - Get pending properties
- `POST /api/properties/[id]/approve` - Approve/reject property
- `GET /api/admin/dashboard/stats` - Admin statistics

### **User**
- `GET /api/user/properties` - Get user's properties
- `GET /api/user/properties/stats` - User property statistics
- `GET /api/user/notifications` - Get notifications
- `PUT /api/user/notifications` - Mark notifications as read

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Manual Deployment**
```bash
# Build the application
npm run build

# Start production server
npm start
```

### **Database Migration**
```bash
# For production deployment
npx prisma migrate deploy
```

## 🔧 Configuration

### **Database Configuration**
- Configure PostgreSQL connection in `DATABASE_URL`
- Run migrations before first deployment
- Set up database backups for production

### **Authentication Configuration**
- Configure OAuth providers in respective developer consoles
- Set secure `NEXTAUTH_SECRET` for production
- Configure proper redirect URLs

### **Image Upload Configuration**
- Set up Cloudinary account for image storage
- Configure upload presets and transformations
- Set up CDN for optimal performance

## 📈 Performance Optimization

- **Image optimization** with Next.js Image component
- **Database indexing** on frequently queried fields
- **API response caching** with appropriate headers
- **Lazy loading** for property images and components
- **Code splitting** with dynamic imports

## 🛡️ Security Features

- **Input validation** with Zod schemas
- **SQL injection protection** with Prisma ORM
- **XSS protection** with proper sanitization
- **CSRF protection** with NextAuth.js
- **Rate limiting** on API endpoints
- **Secure headers** configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the [Migration Guide](MIGRATION_GUIDE.md) for setup issues
- Review API documentation in the code comments
- Check environment variable configuration
- Verify database connection and migrations

## 🔄 Version History

- **v1.0.0** - Initial release with basic property listing
- **v2.0.0** - Added admin approval workflow and enhanced dashboards
- **v2.1.0** - Added notification system and user analytics

# propertynext

This directory contains the propertynext project. Add project details, setup instructions, and usage information here.
