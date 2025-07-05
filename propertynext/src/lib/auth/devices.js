import prisma from '@/lib/prisma';

// Add a new user device
export const addUserDevice = async (userId, deviceId, deviceName, ipAddress) => {
    try {
        // Check if device already exists for this user
        const existingDevice = await prisma.userDevice.findFirst({
            where: {
                userId,
                deviceId,
            }
        });

        if (existingDevice) {
            // Update last active time
            return prisma.userDevice.update({
                where: { id: existingDevice.id },
                data: {
                    lastActive: new Date(),
                    isActive: true,
                    ipAddress
                }
            });
        }

        // Create new device record
        return prisma.userDevice.create({
            data: {
                userId,
                deviceId,
                deviceName,
                ipAddress,
                isActive: true
            }
        });
    } catch (error) {
        console.error('Error adding user device:', error);
        throw error;
    }
};

// Get all active devices for a user
export const getUserDevices = async (userId) => {
    try {
        return prisma.userDevice.findMany({
            where: {
                userId,
                isActive: true
            },
            orderBy: {
                lastActive: 'desc'
            }
        });
    } catch (error) {
        console.error('Error retrieving user devices:', error);
        throw error;
    }
};

// Remove a device
export const removeUserDevice = async (userId, deviceId) => {
    try {
        return prisma.userDevice.updateMany({
            where: {
                userId,
                deviceId,
            },
            data: {
                isActive: false
            }
        });
    } catch (error) {
        console.error('Error removing user device:', error);
        throw error;
    }
};

// Remove all devices except current
export const removeAllOtherDevices = async (userId, currentDeviceId) => {
    try {
        return prisma.userDevice.updateMany({
            where: {
                userId,
                deviceId: {
                    not: currentDeviceId
                }
            },
            data: {
                isActive: false
            }
        });
    } catch (error) {
        console.error('Error removing other user devices:', error);
        throw error;
    }
};