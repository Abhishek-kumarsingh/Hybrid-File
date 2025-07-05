"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  BarChart3, // Use as primary BarChart icon
  ArrowLeft,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle as AlertIcon, // Renamed to avoid conflict
  Download,
  RefreshCw,
  Loader2,
  ThumbsUp, // For positive recommendations
  ThumbsDown, // For negative recommendations
  HelpCircle, // For neutral recommendations
  ServerCrash,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Ensure this is your updated Progress component
import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Not used in this layout
import { interviewApi, handleApiError, withRetry } from "@/lib/api-utils";
import { useToast } from "@/hooks/use-toast";

// Matches the Mongoose sub-document schema for analyzed skills
interface AnalyzedSkill {
  name: string;
  score: number;
  examples?: string[];
}

// Matches the Mongoose sub-document schema for analyzed themes
interface AnalyzedFeedbackTheme {
  theme: string;
  occurrences: number;
  sentimentScore: number; // Example: -1 to 1
  examples: string[];
}

// Matches the Mongoose sub-document schema for recommendations
interface AnalyzedRecommendation {
  type: "positive" | "negative" | "neutral";
  text: string;
}

// Updated Interview type to include backend-analyzed fields
interface Interview {
  id: string;
  title: string;
  description?: string | null;
  domain: string;
  subDomain?: string | null;
  difficulty?: string | null;
  date?: string;
  duration?: number | null;
  status: string;
  score?: number | null; // Overall score
  overallFeedback?: string | null; // Overall feedback text
  type: "ai_generated" | "technical" | "behavioral" | "mixed";
  candidateId?: string | null;
  // candidate?: { name: string; /* ... */ }; // If populated
  questions?: Array<{
    // Individual Q/A from AI interview
    question: string;
    answer: string;
    feedback: string;
    score?: number | null;
  }>;
  // Fields populated by backend analysis
  analyzedSkills?: AnalyzedSkill[];
  analyzedFeedbackThemes?: AnalyzedFeedbackTheme[];
  analyzedRecommendations?: AnalyzedRecommendation[];
  createdAt?: string; // For date display if interview.date is not set
  updatedAt?: string; // For date display
}

// Helper functions (getScoreBadgeVariant, getScoreLabel, getProgressColor, formatDomain, formatDifficulty)
// Keep these as they are useful for UI formatting based on scores/values.
const formatDate = (dateString?: string | null) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (e) {
    return "Invalid Date";
  }
};
function getScoreBadgeVariant(
  score: number | null | undefined
): "success" | "warning" | "destructive" | "outline" {
  if (score === null || score === undefined) return "outline";
  if (score >= 80) return "success"; // Success (green)
  if (score >= 60) return "warning"; // Warning (amber/yellow)
  return "destructive";
}
function getScoreLabel(score: number | null | undefined): string {
  if (score === null || score === undefined) return "Not Scored";
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 60) return "Satisfactory";
  if (score >= 50) return "Needs Improvement";
  return "Poor";
}
function getProgressColor(score: number | null | undefined): string {
  if (score === null || score === undefined) return "bg-muted";
  if (score >= 75) return "bg-green-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
}
const formatString = (str: string | null | undefined) =>
  str ? str.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "N/A";

export default function InterviewAnalysisPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [regenerating, setRegenerating] = useState(false);

  const fetchInterviewData = useCallback(async () => {
    if (!params.id) {
      setError("Interview ID is missing.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      console.log(`Fetching analyzed interview data for ID: ${params.id}`);
      // getInterview should now return the interview with analyzedSkills, analyzedFeedbackThemes, etc.
      const interviewData: Interview = await withRetry(() =>
        interviewApi.getInterview(params.id as string)
      );
      setInterview(interviewData);
      console.log("Analyzed interview data received:", interviewData);
    } catch (err: any) {
      console.error("Error fetching analyzed interview data:", err);
      const errorMessage = handleApiError(err, () => {});
      setError(errorMessage || "Failed to load interview analysis.");
      toast({
        title: "Load Error",
        description: errorMessage || "Could not load interview analysis.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [params.id, toast]);

  useEffect(() => {
    fetchInterviewData();
  }, [fetchInterviewData]);

  const handleRegenerateAnalysis = async () => {
    // Renamed function
    if (!interview) return;
    try {
      setRegenerating(true);
      setError(null);
      console.log(`Regenerating analysis for interview ID: ${interview.id}`);
      // This API call should trigger backend to re-run all analyses and return the updated interview
      const updatedInterviewData: Interview =
        await interviewApi.generateFeedback(interview.id); // generateFeedback now means regenerate all analysis

      setInterview(updatedInterviewData); // Update state with newly analyzed data

      toast({
        title: "Analysis Regenerated",
        description: "Interview analysis has been successfully updated.",
        className: "bg-green-600 text-white dark:bg-green-700",
      });
    } catch (err: any) {
      console.error("Error regenerating analysis:", err);
      const errorMessage = handleApiError(err, () => {});
      setError(errorMessage);
      toast({
        title: "Regeneration Error",
        description: errorMessage || "Could not regenerate analysis.",
        variant: "destructive",
      });
    } finally {
      setRegenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/30 dark:bg-slate-900">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-3 text-lg text-muted-foreground">
          Loading Interview Analysis...
        </span>
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-muted/30 dark:bg-slate-900 text-center">
        <ServerCrash className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-destructive mb-2">
          Error Loading Analysis
        </h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          {error ||
            "The requested interview analysis could not be found or loaded."}
        </p>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/interviews")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Interviews
          </Button>
          {error && (
            <Button onClick={fetchInterviewData} disabled={loading}>
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />{" "}
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  const {
    title,
    score,
    overallFeedback,
    domain,
    subDomain,
    difficulty,
    duration,
    questions,
    analyzedSkills = [], // Default to empty array if not present
    analyzedFeedbackThemes = [],
    analyzedRecommendations = [],
    date, // Assuming this is the interview conduct/completion date
  } = interview;

  return (
    <div className="container mx-auto py-6 px-4 md:px-0 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              router.push(`/dashboard/interviews/${interview.id}/results`)
            }
            className="-ml-3 mb-1 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Results Overview
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">
            {title || "Interview Analysis"}
          </h1>
          <p className="text-md text-muted-foreground">
            Detailed performance analysis and feedback insights.
          </p>
        </div>
        <div className="flex gap-2 self-start sm:self-center">
          <Button
            variant="default"
            size="sm"
            onClick={handleRegenerateAnalysis}
            disabled={regenerating}
            className="h-9"
          >
            {regenerating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            <RefreshCw
              className={`h-4 w-4 mr-2 ${regenerating ? "hidden" : ""}`}
            />
            {regenerating ? "Processing..." : "Regenerate Full Analysis"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => alert("Export PDF/Report (Not Implemented)")}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left column - Overview and Skills */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <Card className="shadow-lg border dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl">Performance Overview</CardTitle>
              <CardDescription className="text-sm">
                Overall assessment and key metrics from the interview.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex flex-col items-center justify-center p-6 bg-muted/30 dark:bg-slate-800/50 rounded-lg border dark:border-slate-700 w-full md:w-auto">
                  <span className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                    Overall Score
                  </span>
                  <div className="text-5xl font-bold mb-1 text-primary">
                    {score !== null && score !== undefined ? `${score}` : "N/A"}
                    {score !== null && score !== undefined && (
                      <span className="text-3xl text-muted-foreground">
                        /100
                      </span>
                    )}
                  </div>
                  <Badge
                    variant={getScoreBadgeVariant(score)}
                    className="text-xs px-2.5 py-1"
                  >
                    {getScoreLabel(score)}
                  </Badge>
                </div>
                <div className="flex-1 space-y-2 text-sm w-full">
                  <DetailItem label="Domain" value={formatString(domain)} />
                  <DetailItem
                    label="Sub-domain"
                    value={formatString(subDomain)}
                  />
                  <DetailItem
                    label="Difficulty"
                    value={formatString(difficulty)}
                  />
                  <DetailItem
                    label="Duration"
                    value={duration ? `${duration} min` : "N/A"}
                  />
                  <DetailItem
                    label="Questions Answered"
                    value={`${questions?.length || 0}`}
                  />
                  <DetailItem
                    label="Interview Date"
                    value={formatDate(
                      date || interview.updatedAt || interview.createdAt
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl">Skills Analysis</CardTitle>
              <CardDescription className="text-sm">
                Assessed performance across key technical and soft skills.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analyzedSkills && analyzedSkills.length > 0 ? (
                <div className="space-y-4">
                  {analyzedSkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <p className="font-medium">{skill.name}</p>
                        <p className="font-semibold text-muted-foreground">
                          {skill.score}/100
                        </p>
                      </div>
                      <Progress
                        value={skill.score}
                        className="h-2"
                        indicatorClassName={getProgressColor(skill.score)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <NoDataPlaceholder
                  section="Skills Analysis"
                  details="Skills analysis data is not yet available for this interview."
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column - Feedback Themes & Recommendations */}
        <div className="space-y-6 md:space-y-8 lg:sticky lg:top-24">
          <Card className="shadow-lg border dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl">Feedback Themes</CardTitle>
              <CardDescription className="text-sm">
                Common themes identified from the interview feedback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analyzedFeedbackThemes && analyzedFeedbackThemes.length > 0 ? (
                <div className="space-y-5">
                  {analyzedFeedbackThemes.map((themeData) => (
                    <div key={themeData.theme}>
                      <div className="flex justify-between items-center mb-1.5">
                        <h3 className="font-semibold text-sm">
                          {themeData.theme}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {themeData.occurrences} mentions
                        </Badge>
                      </div>
                      {themeData.examples && themeData.examples.length > 0 && (
                        <ul className="space-y-1 pl-4 list-disc list-outside marker:text-muted-foreground">
                          {themeData.examples.map((example, index) => (
                            <li
                              key={index}
                              className="text-xs text-muted-foreground italic"
                            >
                              &quot;{example}&quot;
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <NoDataPlaceholder
                  section="Feedback Themes"
                  details="Feedback theme analysis is not yet available."
                />
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg border dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl">AI Recommendations</CardTitle>
              <CardDescription className="text-sm">
                Suggested next steps based on the overall analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analyzedRecommendations && analyzedRecommendations.length > 0 ? (
                <div className="space-y-3">
                  {analyzedRecommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 p-2.5 bg-muted/30 dark:bg-slate-800/50 rounded-md"
                    >
                      <div
                        className={`mt-0.5 flex-shrink-0 ${
                          rec.type === "positive"
                            ? "text-green-500"
                            : rec.type === "negative"
                            ? "text-red-500"
                            : "text-amber-500"
                        }`}
                      >
                        {rec.type === "positive" ? (
                          <ThumbsUp className="h-4 w-4" />
                        ) : rec.type === "negative" ? (
                          <ThumbsDown className="h-4 w-4" />
                        ) : (
                          <HelpCircle className="h-4 w-4" />
                        )}
                      </div>
                      <p className="text-xs leading-relaxed">{rec.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <NoDataPlaceholder
                  section="AI Recommendations"
                  details="Recommendations are not yet available."
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Overall Feedback Text */}
      <Card className="shadow-lg border dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl">Full Detailed Feedback</CardTitle>
          <CardDescription className="text-sm">
            The complete AI-generated feedback summary for this interview.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {overallFeedback ? (
            <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed whitespace-pre-line">
              {overallFeedback}
            </div>
          ) : (
            <NoDataPlaceholder
              section="Detailed Feedback"
              details="The full feedback text is not available."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Helper components (StatCard, NoDataPlaceholder, DetailItem were removed as they are not in this file's scope, but DetailItem is used)
// DetailItem (if not global)
const DetailItem = ({
  label,
  value,
  className,
}: {
  label: string;
  value?: string | React.ReactNode | null;
  className?: string;
}) => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  )
    return null;
  return (
    <div className="flex justify-between items-center border-b dark:border-slate-700/50 pb-1.5 last:border-b-0 last:pb-0">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </h3>
      {typeof value === "string" ? (
        <p className={`font-medium text-right ${className || ""}`}>{value}</p>
      ) : (
        <div className={`font-medium text-right ${className || ""}`}>
          {value}
        </div>
      )}
    </div>
  );
};

const NoDataPlaceholder = ({
  section,
  details,
}: {
  section: string;
  details?: string;
}) => (
  <div className="text-center py-8 text-muted-foreground min-h-[100px] flex flex-col justify-center items-center">
    <FileText className="h-8 w-8 mb-2 opacity-50" />
    <p className="font-semibold text-sm">No Data for {section}</p>
    {details && <p className="text-xs mt-1">{details}</p>}
  </div>
);
