// src/middleware/authMiddleware.ts (Express Backend)
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

// Extend Express Request type to include 'user' property
export interface AuthenticatedRequest extends Request {
  user?: {
    // This is the decoded JWT payload
    userId: string;
    role: string;
    // Add other properties you put in your JWT payload
  };
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error(
    "FATAL ERROR: JWT_SECRET is not defined in environment variables. Auth middleware will not work."
  );
  // You might want to throw an error here to stop the server from starting without a JWT_SECRET
  // throw new Error("JWT_SECRET is not defined. Application cannot start securely.");
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (!JWT_SECRET) {
    // Double check, though it's checked at module load
    console.error("Auth Middleware: JWT_SECRET is missing. Denying access.");
    return res
      .status(500)
      .json({ message: "Server authentication configuration error." });
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET) as {
        userId: string;
        role: string;
        iat: number;
        exp: number;
      };
      // `decoded` will be your JWT payload (e.g., { userId: '...', role: '...', iat: ..., exp: ... })

      // Attach user information to the request object
      // You can fetch the full user from DB here if needed, but often JWT payload is enough
      // For example: req.user = await User.findById(decoded.userId).select('-password');
      // For now, just attach the decoded payload.
      req.user = {
        userId: decoded.userId,
        role: decoded.role,
      };

      console.log(
        "Auth Middleware: User authenticated -",
        req.user.userId,
        "Role -",
        req.user.role
      );
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error("Auth Middleware: Token verification failed", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Optional: Middleware to authorize based on roles
export const authorize = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      console.warn(
        "Auth Middleware (authorize): req.user or req.user.role not found. Ensure 'protect' middleware runs first."
      );
      return res
        .status(403)
        .json({ message: "User role not available for authorization" });
    }
    if (!roles.includes(req.user.role)) {
      console.warn(
        `Auth Middleware (authorize): User role '${
          req.user.role
        }' not authorized for this route. Allowed: ${roles.join(", ")}`
      );
      return res
        .status(403)
        .json({
          message: `User role '${req.user.role}' is not authorized to access this route`,
        });
    }
    console.log(
      `Auth Middleware (authorize): User role '${req.user.role}' authorized.`
    );
    next(); // User has one of the allowed roles
  };
};
