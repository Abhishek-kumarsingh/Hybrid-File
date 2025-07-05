import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';
const JWT_EXPIRY = '1d'; // 1 day

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export const generateResetToken = (email) => {
    return jwt.sign({ email, purpose: 'password-reset' }, JWT_SECRET, { expiresIn: '1h' });
};

export const generateEmailVerificationToken = (email) => {
    return jwt.sign({ email, purpose: 'email-verification' }, JWT_SECRET, { expiresIn: '24h' });
};
