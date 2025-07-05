// Example: src/routes/aiRoutes.ts (or a dedicated service file)
import express, { Request, Response, NextFunction } from "express";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const router = express.Router();

// Middleware to parse JSON bodies (if not already globally applied in your app)
// router.use(express.json()); // Apply only if this router is self-contained

const GEMINI_MODEL_NAME =
  process.env.GEMINI_MODEL_FOR_DIRECT_CALL || "gemini-1.5-flash-latest"; // Or your gemini-2.0-flash

router.post(
  "/generate-content",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { prompt } = req.body;
      console.log("Express: Received prompt:", prompt);

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      // Logging API key details (be careful with logging sensitive parts in production)
      console.log("Gemini API Key check (Express):");
      console.log("  - Key Exists:", apiKey ? "Yes" : "No");
      if (apiKey) {
        console.log("  - Key Length:", apiKey.length);
        console.log("  - Key Start:", apiKey.substring(0, 4) + "...");
        console.log("  - Key End: ..." + apiKey.substring(apiKey.length - 4));
      }

      if (!apiKey) {
        console.error(
          "Express: Gemini API key not found in environment variables."
        );
        return res.status(500).json({
          error: "API key not configured",
          message:
            "The AI service is not properly configured. Please contact support.", // User-friendly message
          // Internal detail: "Please add your Gemini API key to the .env file. Get your key from: https://makersuite.google.com/app/apikey",
        });
      }

      console.log(
        "Express: Sending prompt to Gemini API:",
        prompt.substring(0, 100) + "..."
      );
      console.log(
        `Express: Using model: ${GEMINI_MODEL_NAME} with API version v1beta`
      );

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_NAME}:generateContent?key=${apiKey}`;
      console.log(`Express: Using API URL: ${apiUrl}`);

      const geminiResponse = await axios.post(
        apiUrl,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            // These are good defaults
            temperature: 0.7,
            topK: 40, // Default is often 1 for gemini-flash, but 40 is also common
            topP: 0.95, // Default is often 1 for gemini-flash
            maxOutputTokens: 2048,
          },
          // safetySettings: [ // You can add safety settings if needed
          //   { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          //   // ... other settings
          // ]
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 45000, // 45 seconds timeout
        }
      );

      // Axios throws for non-2xx statuses by default, so response.ok check isn't strictly needed here
      // if it gets here, geminiResponse.status is 2xx

      const responseData = geminiResponse.data;
      const text = responseData.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        console.error(
          "Express: Unexpected Gemini API response format:",
          responseData
        );
        return res.status(500).json({
          error: "Unexpected response format from AI service",
          message:
            "The AI service returned data in an unexpected format. Please try again later.",
          details: responseData, // For debugging, maybe remove in production
        });
      }

      console.log("Express: Gemini API response received successfully.");

      return res.status(200).json({
        text, // The generated text
        model: GEMINI_MODEL_NAME,
        // originalResponse: responseData, // Optional: if client needs full original response
      });
    } catch (error: any) {
      console.error("Express: Error in Gemini API route:", error.message);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        console.error("Axios Error Details:", {
          message: axiosError.message,
          code: axiosError.code,
          status: axiosError.response?.status,
          data: axiosError.response?.data,
        });

        const status = axiosError.response?.status || 500;
        const errorData = axiosError.response?.data;
        const errorMessage =
          errorData?.error?.message || // Gemini specific error structure
          errorData?.message || // General message key
          axiosError.message || // Axios's own message
          "Failed to communicate with the AI service.";

        return res.status(status).json({
          error: "AI Service Error",
          message: errorMessage,
          details: errorData, // For debugging, maybe remove for production client
        });
      }

      // Fallback for non-Axios errors
      return res.status(500).json({
        error: "Internal server error",
        message: error.message || "An unexpected error occurred.",
      });
    }
  }
);

export default router; // Export the router
