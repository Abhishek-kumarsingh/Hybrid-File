import bcrypt from 'bcryptjs';

// Hash a password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
};

// Verify a password
export const verifyPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

// Generate a random password (useful for initial setup)
export const generateRandomPassword = (length = 12) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';

    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
};