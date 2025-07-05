# 🛡️ ThreatZone Prediction System

A comprehensive IoT-based threat detection and prediction system built with **Next.js 14**, **Express.js**, **MongoDB**, and **Socket.io** for real-time monitoring of critical infrastructure.

![ThreatZone Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green)
![Socket.io](https://img.shields.io/badge/Socket.io-4.0-orange)

## 🚀 **Recently Migrated from React + Vite to Next.js!**

This project has been successfully migrated from a React + Vite setup to **Next.js 14** with significant improvements in performance, SEO, and developer experience.

## ✨ **Key Features**

### 🎯 **Core Functionality**
- **Real-time IoT Sensor Monitoring** - Live data from 6+ sensor types
- **Advanced Threat Detection** - ML-powered anomaly detection
- **Interactive Heat Maps** - Geospatial threat visualization
- **Predictive Analytics** - Risk assessment and forecasting
- **Multi-user Dashboard** - Role-based access control
- **Real-time Notifications** - Email, SMS, and push alerts

### 🔧 **Technical Features**
- **Next.js 14** with App Router and Server Components
- **TypeScript** for type safety and better DX
- **Tailwind CSS** with custom design system
- **Socket.io** for real-time communication
- **MongoDB** with optimized schemas and indexing
- **Redis** for caching and session management
- **Machine Learning** anomaly detection engine
- **Responsive Design** mobile-first approach

## 🏗️ **System Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │    │  Express.js API │    │   MongoDB DB    │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│  Port: 3000     │    │  Port: 3001     │    │  Port: 27017    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│   Socket.io     │◄─────────────┘
                        │ (Real-time)     │
                        └─────────────────┘
                                 │
                        ┌─────────────────┐
                        │   Redis Cache   │
                        │  (Optional)     │
                        └─────────────────┘
```

## 📋 **Prerequisites**

- **Node.js** 18.0 or higher
- **MongoDB** 6.0 or higher (running on localhost:27017)
- **Redis** (optional, for caching)
- **npm** or **yarn** package manager

## 🚀 **Quick Start**

### 1. **Clone the Repository**
```bash
git clone <repository-url>
cd ThreatZone
```

### 2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

### 3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
# Next.js Configuration
NEXT_PUBLIC_APP_NAME=ThreatZone Prediction System
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001

# Database
MONGODB_URI=mongodb://localhost:27017/threatzone

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Redis (Optional)
REDIS_HOST=localhost
REDIS_PORT=6379

# Feature Flags
NEXT_PUBLIC_ENABLE_REAL_TIME=true
NEXT_PUBLIC_ENABLE_HEAT_MAP=true
```

### 4. **Start MongoDB**
Ensure MongoDB is running on your system:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 5. **Run the Application**

**Development Mode:**
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:frontend  # Next.js on port 3000
npm run dev:backend   # Express.js on port 3001
```

**Production Mode:**
```bash
npm run build
npm start
```

## 🎮 **Demo Credentials**

The system comes with pre-configured demo users:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | admin@threatzone.com | admin123 | Full system access |
| **Operator** | operator@threatzone.com | operator123 | Sensor & threat management |
| **Analyst** | analyst@threatzone.com | analyst123 | Read-only analytics |

## 📊 **System Components**

### 🖥️ **Frontend (Next.js)**
- **Dashboard** - Real-time system overview
- **Heat Map** - Interactive threat visualization
- **Sensor Management** - Monitor IoT devices
- **Threat Analysis** - Incident management
- **Analytics** - Historical data and trends
- **User Management** - Role-based access

### ⚙️ **Backend (Express.js)**
- **RESTful API** - Comprehensive endpoints
- **Socket.io Server** - Real-time communication
- **Authentication** - JWT-based security
- **Sensor Simulation** - Realistic IoT data generation
- **ML Engine** - Anomaly detection algorithms
- **Notification System** - Multi-channel alerts

### 🗄️ **Database (MongoDB)**
- **Sensors Collection** - Device metadata and configuration
- **SensorReadings Collection** - Time-series sensor data
- **Threats Collection** - Detected incidents and alerts
- **Users Collection** - Authentication and permissions
- **Alerts Collection** - Notification tracking

## 🤖 **IoT Sensor Simulation**

The system includes a sophisticated sensor simulation engine that generates realistic data:

### **Sensor Types:**
- **Pressure Sensors** (PSI) - Pipeline monitoring
- **Temperature Sensors** (°F) - Thermal monitoring
- **Flow Rate Sensors** (gal/min) - Fluid dynamics
- **Level Sensors** (%) - Tank monitoring
- **Vibration Sensors** (mm/s) - Equipment health
- **Gas Sensors** (ppm) - Chemical detection

### **Simulation Features:**
- **Realistic Patterns** - Daily cycles and seasonal variations
- **Anomaly Injection** - Configurable fault scenarios
- **Threshold Monitoring** - Warning and critical levels
- **Geospatial Data** - Location-based sensor placement
- **Real-time Streaming** - 5-second update intervals

## 🧠 **Machine Learning Engine**

### **Anomaly Detection:**
- **Statistical Analysis** - Z-score and percentile-based detection
- **Trend Analysis** - Pattern recognition and deviation detection
- **Isolation Forest** - Unsupervised anomaly detection
- **Real-time Processing** - Sub-second analysis
- **Confidence Scoring** - Reliability metrics

### **Predictive Analytics:**
- **Risk Assessment** - Threat probability calculation
- **Trend Forecasting** - Future value prediction
- **Pattern Recognition** - Historical data analysis
- **Alert Prioritization** - Severity-based ranking

## 🗺️ **Interactive Heat Maps**

### **Features:**
- **Real-time Visualization** - Live threat density mapping
- **Multi-layer Support** - Temperature, pressure, risk overlays
- **Geospatial Queries** - Location-based filtering
- **Zoom Controls** - Detailed area inspection
- **Legend System** - Color-coded risk levels
- **Export Functionality** - Data download capabilities

### **Risk Levels:**
- 🟢 **Green (0-30%)** - Normal operations
- 🟡 **Yellow (31-60%)** - Elevated monitoring
- 🟠 **Orange (61-80%)** - High alert status
- 🔴 **Red (81-100%)** - Critical intervention required

## 📱 **API Endpoints**

### **Authentication:**
```
POST /api/auth/login          # User authentication
POST /api/auth/register       # User registration
GET  /api/auth/me            # Current user profile
PUT  /api/auth/profile       # Update profile
```

### **Sensors:**
```
GET  /api/sensors            # List all sensors
GET  /api/sensors/:id        # Get sensor details
GET  /api/sensors/:id/readings # Get sensor data
POST /api/sensors/:id/readings # Add sensor reading
```

### **Threats:**
```
GET  /api/threats            # List threats
POST /api/threats            # Create threat
PUT  /api/threats/:id/acknowledge # Acknowledge threat
PUT  /api/threats/:id/resolve     # Resolve threat
```

### **Analytics:**
```
GET  /api/analytics/dashboard # Dashboard metrics
GET  /api/analytics/trends   # Historical trends
GET  /api/analytics/reports  # Generate reports
```

## 🔧 **Development**

### **Project Structure:**
```
ThreatZone/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── dashboard/        # Dashboard components
│   └── layout/           # Layout components
├── backend/              # Express.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── config/           # Configuration
├── lib/                  # Utility functions
├── types/                # TypeScript definitions
└── data/                 # Mock data and constants
```

### **Available Scripts:**
```bash
npm run dev              # Start development servers
npm run dev:frontend     # Start Next.js only
npm run dev:backend      # Start Express.js only
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run test            # Run tests
```

## 🚀 **Deployment**

### **Vercel (Recommended for Frontend):**
```bash
npm install -g vercel
vercel --prod
```

### **Docker:**
```bash
docker build -t threatzone .
docker run -p 3000:3000 threatzone
```

### **Environment Variables for Production:**
```env
NODE_ENV=production
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-production-secret
REDIS_URL=redis://your-redis-instance
```

## 🔒 **Security Features**

- **JWT Authentication** - Secure token-based auth
- **Role-based Access Control** - Granular permissions
- **Rate Limiting** - API abuse prevention
- **Input Validation** - SQL injection protection
- **CORS Configuration** - Cross-origin security
- **Helmet.js** - Security headers
- **Password Hashing** - bcrypt encryption

## 📈 **Performance Optimizations**

- **Redis Caching** - Fast data retrieval
- **Database Indexing** - Optimized queries
- **Code Splitting** - Lazy loading
- **Image Optimization** - Next.js Image component
- **Bundle Analysis** - Size optimization
- **CDN Integration** - Static asset delivery

## 🧪 **Testing**

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suite
npm run test:components
npm run test:api
```

## 📚 **Documentation**

- [API Documentation](./docs/api.md)
- [Component Library](./docs/components.md)
- [Database Schema](./docs/database.md)
- [Deployment Guide](./docs/deployment.md)

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

- **Documentation**: Check the `/docs` folder
- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Email**: support@threatzone.com

## 🙏 **Acknowledgments**

- **Next.js Team** - Amazing React framework
- **MongoDB** - Flexible document database
- **Socket.io** - Real-time communication
- **Tailwind CSS** - Utility-first CSS framework
- **Leaflet** - Interactive mapping library

---

**Built with ❤️ by the ThreatZone Team**

*Protecting critical infrastructure through intelligent monitoring and predictive analytics.*

# ThreateZone

This directory contains the ThreateZone project. Add project details, setup instructions, and usage information here.
