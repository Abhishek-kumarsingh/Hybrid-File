# Property Management Application - Migration Guide

## Database Schema Updates

The application has been enhanced with a comprehensive admin approval workflow for property listings. Here are the key changes:

### New Database Fields

#### Property Model Updates:
- `approvalStatus` - Tracks approval status (PENDING, APPROVED, REJECTED, UNDER_REVIEW)
- `rejectionReason` - Stores reason for rejection (optional)
- `approvedBy` - References the admin who approved/rejected the property
- `approvedAt` - Timestamp of approval/rejection

#### New Models:
- `PropertySubmission` - Tracks submission history and review process
- `Notification` - User notification system for approval status updates

### Migration Steps

1. **Update Prisma Schema**
   ```bash
   # The schema has been updated in src/lib/prisma/schema.prisma
   # Generate new Prisma client
   npx prisma generate
   ```

2. **Create and Run Migration**
   ```bash
   # Create migration for the new schema
   npx prisma migrate dev --name add-approval-workflow
   
   # Or if using db push for development
   npx prisma db push
   ```

3. **Seed Database (Optional)**
   ```bash
   # Run seed script to create sample data
   npm run db:seed
   ```

### API Endpoints Added

#### Admin Endpoints:
- `POST /api/properties/[id]/approve` - Approve/reject properties
- `GET /api/admin/properties/pending` - Get pending properties
- `GET /api/admin/dashboard/stats` - Admin dashboard statistics

#### User Endpoints:
- `GET /api/user/properties` - Get user's own properties (all statuses)
- `GET /api/user/properties/stats` - User property statistics
- `GET /api/user/notifications` - User notifications
- `PUT /api/user/notifications` - Mark notifications as read

### Frontend Components Added

#### Admin Dashboard:
- `PropertyApprovalDashboard` - Main approval interface
- `/app/(admin)/property/approvals` - Dedicated approval page

#### User Dashboard:
- `UserPropertyDashboard` - Enhanced user dashboard
- Updated `/dashboard` page with property tracking

### Key Features Implemented

1. **Admin Approval Workflow**
   - Admins can approve, reject, or mark properties under review
   - Rejection requires a reason
   - Automatic notifications to property owners
   - Comprehensive approval statistics

2. **User Property Tracking**
   - Users can track submission status
   - Real-time notifications for status changes
   - Property performance metrics
   - Approval rate tracking

3. **Public Property Filtering**
   - Only approved properties show in public listings
   - Maintains existing search and filter functionality
   - Backward compatible with existing frontend

### Environment Variables

Make sure these environment variables are set:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# NextAuth
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Email service for notifications
SMTP_HOST="your_smtp_host"
SMTP_PORT="587"
SMTP_USER="your_smtp_user"
SMTP_PASS="your_smtp_password"
```

### Testing the Implementation

1. **Create a test user account**
2. **Submit a property** - Should create pending status
3. **Login as admin** - Access `/app/(admin)/property/approvals`
4. **Approve/reject properties** - Test notification system
5. **Check user dashboard** - Verify status updates

### Deployment Checklist

- [ ] Database migration completed
- [ ] Environment variables configured
- [ ] Admin user account created
- [ ] Email service configured (optional)
- [ ] Frontend build successful
- [ ] API endpoints tested

### Rollback Plan

If issues occur, you can rollback by:

1. Reverting the database migration
2. Restoring the previous Prisma schema
3. Deploying the previous version

### Support

For issues or questions about the implementation, check:
- API error logs in the console
- Database connection status
- Prisma client generation
- Environment variable configuration
