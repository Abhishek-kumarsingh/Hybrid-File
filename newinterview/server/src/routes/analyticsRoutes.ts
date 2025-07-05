import { Router, Request, Response } from "express";
import Interview from "../models/Interview"; // Your Mongoose Interview model
import Candidate from "../models/Candidate"; // If needed for candidate stats
import User from "../models/User"; // If needed for interviewer stats
import mongoose from "mongoose";

const router = Router();

// Helper function to build a date range filter for Mongoose queries
const getDateRangeFilter = (timeframe?: string): Record<string, any> => {
  if (!timeframe) return {};

  const endDate = new Date();
  let startDate = new Date();

  switch (timeframe) {
    case "7d":
      startDate.setDate(endDate.getDate() - 7);
      break;
    case "30d":
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case "90d":
      startDate.setMonth(endDate.getMonth() - 3);
      break;
    case "365d":
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    default:
      return {}; // No date filter for 'all' or unknown
  }
  // Use 'updatedAt' for completed interviews, or 'createdAt'/'date' for others
  // For simplicity, let's assume we filter based on when the interview was last updated (often completion time)
  return { updatedAt: { $gte: startDate, $lte: endDate } };
};

// --- Endpoint: GET /api/analytics/overview ---
router.get("/overview", async (req: Request, res: Response) => {
  const { domain, timeframe } = req.query as {
    domain?: string;
    timeframe?: string;
  };

  try {
    const matchFilter: any = { status: "completed" }; // Usually, overview is for completed interviews
    if (domain) {
      matchFilter.domain = domain;
    }
    const dateFilter = getDateRangeFilter(timeframe);
    if (Object.keys(dateFilter).length > 0) {
      matchFilter.$and = matchFilter.$and
        ? [...matchFilter.$and, dateFilter]
        : [dateFilter];
    }

    const totalInterviewsCount = await Interview.countDocuments(
      domain || timeframe
        ? {
            ...(domain && { domain }),
            ...dateFilter,
          }
        : {} // Count all interviews if no domain/timeframe for total, or filter if provided
    );
    const completedInterviews = await Interview.find(matchFilter);

    const completedInterviewsCount = completedInterviews.length;

    let overallScoreSum = 0;
    let totalDurationSum = 0;
    completedInterviews.forEach((interview) => {
      if (typeof interview.score === "number") {
        overallScoreSum += interview.score;
      }
      if (typeof interview.duration === "number") {
        totalDurationSum += interview.duration;
      }
    });

    const overallAvgScore =
      completedInterviewsCount > 0
        ? Math.round(overallScoreSum / completedInterviewsCount)
        : 0;
    const avgDuration =
      completedInterviewsCount > 0
        ? Math.round(totalDurationSum / completedInterviewsCount)
        : 0;

    res.json({
      overallScore: overallAvgScore,
      totalInterviews: totalInterviewsCount, // Or adjust to only count 'completed' based on filters if preferred
      completedInterviews: completedInterviewsCount,
      avgDuration: avgDuration,
      // Add more stats like scheduledInterviews, activeInterviews etc.
    });
  } catch (error: any) {
    console.error("Error fetching analytics overview:", error);
    res
      .status(500)
      .json({
        message: "Failed to fetch analytics overview",
        error: error.message,
      });
  }
});

// --- Endpoint: GET /api/analytics/skills ---
// This is highly dependent on how you store/derive skill information.
// Placeholder: Assumes skills are somehow tagged or derived from feedback.
router.get("/skills", async (req: Request, res: Response) => {
  const { domain, timeframe } = req.query as {
    domain?: string;
    timeframe?: string;
  };
  try {
    // **COMPLEX LOGIC REQUIRED HERE**
    // 1. Define how skills are identified (e.g., keywords in feedback, predefined tags, question categories).
    // 2. Filter interviews by domain and timeframe.
    // 3. Aggregate data to calculate average scores per identified skill.
    //
    // This is a simplified placeholder.
    // Example: If questions had a 'skills' array tag:
    // const interviews = await Interview.find({
    //     status: 'completed',
    //     ...(domain && { domain }),
    //     ...getDateRangeFilter(timeframe),
    // }).populate('questions'); // Assuming your embedded questions have skill tags
    //
    // Then, iterate through interviews and their questions, aggregate scores by skill.

    // Mocked response for now:
    const skillsData = [
      { name: "JavaScript Proficiency", score: 78 },
      { name: "React Fundamentals", score: 82 },
      { name: "Node.js/Express", score: 70 },
      { name: "Database Management (SQL)", score: 75 },
      { name: "API Design Principles", score: 68 },
      { name: "Problem Solving", score: 85 },
      { name: "Communication", score: 90 },
    ];
    // Apply domain filter to mock data if domain is present (very basic mock filtering)
    const filteredSkills = domain
      ? skillsData
          .filter(
            (skill) =>
              skill.name.toLowerCase().includes(domain.toLowerCase()) ||
              Math.random() > 0.5
          )
          .slice(0, 3)
      : skillsData;

    res.json(filteredSkills);
  } catch (error: any) {
    console.error("Error fetching skills analysis:", error);
    res
      .status(500)
      .json({
        message: "Failed to fetch skills analysis",
        error: error.message,
      });
  }
});

// --- Endpoint: GET /api/analytics/domains ---
router.get("/domains", async (req: Request, res: Response) => {
  const { timeframe } = req.query as { timeframe?: string }; // Domain filter here would mean only that domain's data
  // So typically not used if you want performance *across* domains.

  try {
    const matchStage: any = {
      status: "completed", // Only completed interviews
      score: { $ne: null }, // Only interviews that have a score
    };
    const dateFilter = getDateRangeFilter(timeframe);
    if (Object.keys(dateFilter).length > 0) {
      matchStage.$and = matchStage.$and
        ? [...matchStage.$and, dateFilter]
        : [dateFilter];
    }

    const domainPerformance = await Interview.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$domain", // Group by the domain field
          count: { $sum: 1 },
          avgScore: { $avg: "$score" },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field from MongoDB aggregation
          name: "$_id", // Rename _id to name
          count: 1,
          avgScore: { $round: ["$avgScore", 0] }, // Round average score to whole number
        },
      },
      { $sort: { avgScore: -1 } }, // Optional: sort by highest average score
    ]);

    res.json(domainPerformance);
  } catch (error: any) {
    console.error("Error fetching domain performance:", error);
    res
      .status(500)
      .json({
        message: "Failed to fetch domain performance",
        error: error.message,
      });
  }
});

// --- Endpoint: GET /api/interviews?status=completed&sort=-updatedAt... ---
// This endpoint is already part of your `interviewRoutes.ts`.
// Your `interviewApi.getRecentCompletedInterviews` calls the existing
// `GET /api/interviews` endpoint but adds query parameters like `status=completed`.
// You need to ensure your main `GET /api/interviews` handler in `interviewRoutes.ts`
// can process these query parameters (`status`, `sort`, `domain`, `limit`, and timeframe if you add it).

// Example modification to your existing GET /api/interviews in interviewRoutes.ts:
/*
router.get("/", async (req: Request, res: Response) => {
    try {
        const { status, sort, domain, limit, timeframe } = req.query;
        const queryFilter: any = {};
        const sortOptions: any = {};

        if (status) queryFilter.status = status as string;
        if (domain) queryFilter.domain = domain as string;
        
        const dateFilter = getDateRangeFilter(timeframe as string | undefined);
        if (Object.keys(dateFilter).length > 0) {
            queryFilter.$and = queryFilter.$and ? [...queryFilter.$and, dateFilter] : [dateFilter];
        }

        if (sort) {
            const sortField = (sort as string).startsWith('-') ? (sort as string).substring(1) : sort as string;
            const sortOrder = (sort as string).startsWith('-') ? -1 : 1;
            sortOptions[sortField] = sortOrder;
        } else {
            sortOptions.createdAt = -1; // Default sort
        }

        let query = Interview.find(queryFilter)
            .populate("userId", "name email role")
            .populate("candidateId", "name email role avatarUrl") // Ensure avatarUrl is populated
            .sort(sortOptions);

        if (limit && !isNaN(parseInt(limit as string))) {
            query = query.limit(parseInt(limit as string));
        }

        const interviews = await query.exec();
        res.json(interviews);
    } catch (error: any) {
        res.status(500).json({ message: "Error fetching interviews", error: error.message });
    }
});
*/

export default router;
