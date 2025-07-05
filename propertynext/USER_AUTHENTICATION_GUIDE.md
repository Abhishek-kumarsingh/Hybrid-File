# PropertyNext - User Authentication Guide

## 🔐 Authentication System Overview

PropertyNext uses a comprehensive authentication system with NextAuth.js, supporting both email/password and social login options.

## 📋 Default Login Credentials

### **Admin Account**
- **Email**: `admin@example.com`
- **Password**: `Test@1234`
- **Role**: ADMIN
- **Access**: Full system access, property approval, user management

### **Test User Account**
- **Email**: `user@example.com`
- **Password**: `Test@1234`
- **Role**: CUSTOMER
- **Access**: Property submission, user dashboard

### **Test Agent Account**
- **Email**: `agent@example.com`
- **Password**: `Test@1234`
- **Role**: AGENT
- **Access**: Enhanced property management, agent analytics

## 🚀 How to Login

### **Method 1: Using the Web Interface**

1. **Navigate to Login Page**
   ```
   http://localhost:3000/auth/sign-in
   ```

2. **Enter Credentials**
   - Email: Use one of the default accounts above
   - Password: `Test@1234`

3. **Click "Sign In"**
   - You'll be redirected to the appropriate dashboard based on your role

### **Method 2: Using API Endpoints**

#### **Login via API**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "Test@1234"
  }'
```

#### **Register via API**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Test@1234",
    "confirmPassword": "Test@1234",
    "role": "CUSTOMER"
  }'
```

## 👥 User Roles & Access Levels

### **CUSTOMER (Default)**
- **Dashboard**: `/dashboard`
- **Permissions**:
  - Submit property listings
  - View own properties and status
  - Receive notifications
  - Track approval progress

### **AGENT**
- **Dashboard**: `/dashboard` (enhanced features)
- **Permissions**:
  - All Customer permissions
  - Enhanced property management
  - Agent-specific analytics
  - Commission tracking

### **ADMIN**
- **Dashboard**: `/app/(admin)`
- **Permissions**:
  - All system permissions
  - Property approval/rejection
  - User management
  - System analytics
  - Access to admin panel

## 🔑 Password Requirements

Passwords must meet the following criteria:
- **Minimum 8 characters**
- **At least 1 uppercase letter** (A-Z)
- **At least 1 lowercase letter** (a-z)
- **At least 1 number** (0-9)
- **At least 1 special character** (!@#$%^&*)

### **Valid Password Examples**
- `Test@1234`
- `MyPass123!`
- `SecureP@ss1`

## 🛡️ Security Features

### **Account Protection**
- **Failed Login Attempts**: Account locks after 5 failed attempts
- **Lockout Duration**: 30 minutes
- **Password Hashing**: bcrypt with salt rounds
- **Device Tracking**: Login devices are tracked for security

### **Session Management**
- **JWT Tokens**: Secure token-based authentication
- **Session Duration**: 24 hours
- **Auto Logout**: Sessions expire automatically

## 📱 Social Login (Optional)

The system supports social login with:
- **Google OAuth**
- **Facebook OAuth**
- **GitHub OAuth**

To enable social login, configure the following environment variables:

```env
# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Facebook OAuth
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

## 🔄 Password Reset

### **Reset Password Flow**
1. **Go to Reset Page**: `/auth/reset-password`
2. **Enter Email**: Provide registered email address
3. **Check Email**: Click the reset link sent to your email
4. **Set New Password**: Enter and confirm new password

### **Reset via API**
```bash
# Request password reset
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'

# Reset password with token
curl -X POST http://localhost:3000/api/auth/reset-password/confirm \
  -H "Content-Type: application/json" \
  -d '{
    "token": "reset-token-here",
    "password": "NewPass@123",
    "confirmPassword": "NewPass@123"
  }'
```

## 👤 Creating New Users

### **Self Registration**
Users can register themselves at: `/auth/sign-up`

### **Admin User Creation**
Admins can create users through the admin panel or API:

```bash
curl -X POST http://localhost:3000/api/admin/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin-jwt-token" \
  -d '{
    "name": "New User",
    "email": "newuser@example.com",
    "password": "TempPass@123",
    "role": "CUSTOMER"
  }'
```

## 🔧 Environment Configuration

Required environment variables for authentication:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/propertynext"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email Service (for password reset)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## 🚨 Troubleshooting

### **Common Issues**

#### **"Invalid Credentials" Error**
- Check email and password are correct
- Ensure account is not locked
- Verify user exists in database

#### **Account Locked**
- Wait 30 minutes for automatic unlock
- Or contact admin to manually unlock

#### **Social Login Not Working**
- Check OAuth provider configuration
- Verify redirect URLs are correct
- Ensure environment variables are set

#### **Password Reset Not Working**
- Check email service configuration
- Verify SMTP settings
- Check spam folder for reset emails

### **Database Queries for User Management**

```sql
-- Check user details
SELECT id, name, email, role, "failedAttempts", "lockedUntil" 
FROM "User" 
WHERE email = 'user@example.com';

-- Unlock user account
UPDATE "User" 
SET "failedAttempts" = 0, "lockedUntil" = NULL 
WHERE email = 'user@example.com';

-- Change user role
UPDATE "User" 
SET role = 'ADMIN' 
WHERE email = 'user@example.com';
```

## 📞 Support

For authentication issues:
1. Check this guide first
2. Verify environment variables
3. Check database connectivity
4. Review server logs for errors
5. Contact system administrator

## 🔄 Quick Start Commands

```bash
# Start the application
npm run dev

# Access login page
open http://localhost:3000/auth/sign-in

# Access admin dashboard (after admin login)
open http://localhost:3000/app/(admin)

# Access user dashboard (after user login)
open http://localhost:3000/dashboard
```
