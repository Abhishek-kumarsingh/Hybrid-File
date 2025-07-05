// src/routes/userRoutes.ts
import express, { Router, Request, Response } from "express";
import User, { IUser } from "../models/User"; // Assuming IUser is your Mongoose document interface
import jwt, { Secret, SignOptions } from "jsonwebtoken"; // Import Secret and SignOptions
import bcrypt from "bcryptjs"; // bcrypt is used in your User model's comparePassword, ensure it's there
import { authorize } from "../middleware/authMiddleware";

const router = Router();

// GET all users
router.get("/", authorize("admin"), async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// GET user by ID
router.get("/:id", authorize("admin"), async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    // Check if the error is due to an invalid ObjectId format
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

// POST create new user (Registration)
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields: name, email, password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // Password will be hashed by pre-save hook in User model
    const newUser = new User({ name, email, password, role: role || "user" });
    await newUser.save();

    // Convert to plain object and remove password for the response
    const userObject = newUser.toObject({ virtuals: true }); // Ensure virtuals like 'id' are included
    // delete (userObject as any).password; // The select('-password') is better done on queries
    // For new objects, if password field exists after toObject(), delete it.
    // Or better, structure the response manually if password persists.

    res.status(201).json({
      id: userObject.id,
      name: userObject.name,
      email: userObject.email,
      role: userObject.role,
      image: userObject.image,
      createdAt: (newUser as any).createdAt, // Cast to any if not directly on userObject type
      updatedAt: (newUser as any).updatedAt,
    });
  } catch (error: any) {
    // Handle Mongoose validation errors specifically if desired
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

// PUT update user
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, image, role } = req.body;
    const updateData: Partial<Pick<IUser, "name" | "image" | "role">> = {}; // Use Partial for type safety
    if (name !== undefined) updateData.name = name;
    if (image !== undefined) updateData.image = image;
    if (role !== undefined) updateData.role = role;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No update data provided." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData }, // Use $set for targeted updates
      { new: true, runValidators: true } // Return the modified document and run schema validators
    ).select("-password"); // Exclude password from the returned document

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
});

// DELETE user
router.delete(
  "/:id",
  authorize("admin"),
  async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Example: Prevent deleting a specific admin user by email
      if (user.email === process.env.ADMIN_EMAIL_TO_PROTECT) {
        // Use an env var for protected email
        return res.status(403).json({
          message: "This administrative user account cannot be deleted.",
        });
      }

      await User.findByIdAndDelete(req.params.id);
      // TODO: Implement cascading logic for related data (e.g., interviews, candidates created by this user)
      // Option 1: Delete related data.
      // Option 2: Set userId fields to null on related data.
      // Option 3: Prevent deletion if user has critical related data.
      res.status(204).send();
    } catch (error: any) {
      if (error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
      res
        .status(500)
        .json({ message: "Error deleting user", error: error.message });
    }
  }
);

// POST login user
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email }).select("+password"); // Explicitly select password if it's excluded by default in schema
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials - user not found" });
    }

    // comparePassword method should be defined on your User model
    // It should use bcrypt.compare(plainPassword, hashedPassword)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials - password mismatch" });
    }

    // User authenticated, create JWT
    const payload = {
      userId: user.id, // Uses the virtual 'id' (string representation of _id)
      role: user.role,
      // Add other non-sensitive, useful claims if needed
    };

    const jwtSecretFromEnv = process.env.JWT_SECRET;
    if (!jwtSecretFromEnv) {
      console.error(
        "JWT_SECRET is not defined in environment variables! Cannot sign token."
      );
      return res
        .status(500)
        .json({ message: "Server configuration error: JWT secret missing." });
    }

    const secretKey: Secret = jwtSecretFromEnv; // Explicitly type as Secret
    const expiresInValue = (process.env.JWT_EXPIRES_IN || "1d") as any;

    const signOptions: SignOptions = {
      expiresIn: expiresInValue,
    };

    const token = jwt.sign(payload, secretKey, signOptions);

    // Return user info (without password) and the token
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        // Ensure this structure matches what NextAuth's authorize function expects
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        // Include other fields like createdAt, updatedAt if NextAuth needs them for the user object
      },
    });
  } catch (error: any) {
    console.error("Login route error:", error);
    res.status(500).json({
      message: "Server error during login process",
      error: error.message,
    });
  }
});

export default router;
