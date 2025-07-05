import { hashPassword } from '@/lib/auth/password';
import prisma from '@/lib/prisma';

export async function seedUsers() {
    console.log('🌱 Seeding users...');

    try {
        // Check if users already exist
        const existingAdmin = await prisma.user.findUnique({
            where: { email: 'admin@example.com' }
        });

        if (existingAdmin) {
            console.log('✅ Users already exist, skipping seed');
            return;
        }

        // Hash the default password
        const hashedPassword = await hashPassword('Test@1234');

        // Create default users
        const users = [
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'ADMIN',
                emailVerified: new Date()
            },
            {
                name: 'Test Agent',
                email: 'agent@example.com',
                password: hashedPassword,
                role: 'AGENT',
                emailVerified: new Date()
            },
            {
                name: 'Test Customer',
                email: 'user@example.com',
                password: hashedPassword,
                role: 'CUSTOMER',
                emailVerified: new Date()
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword,
                role: 'CUSTOMER',
                emailVerified: new Date()
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: hashedPassword,
                role: 'AGENT',
                emailVerified: new Date()
            }
        ];

        // Create users in database
        for (const userData of users) {
            await prisma.user.create({
                data: userData
            });
            console.log(`✅ Created user: ${userData.email} (${userData.role})`);
        }

        console.log('🎉 Users seeded successfully!');
        console.log('\n📋 Default Login Credentials:');
        console.log('Admin: admin@example.com / Test@1234');
        console.log('Agent: agent@example.com / Test@1234');
        console.log('Customer: user@example.com / Test@1234');

    } catch (error) {
        console.error('❌ Error seeding users:', error);
        throw error;
    }
}

// Run seeder if called directly
if (require.main === module) {
    seedUsers()
        .then(() => {
            console.log('✅ Seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Seeding failed:', error);
            process.exit(1);
        });
}
