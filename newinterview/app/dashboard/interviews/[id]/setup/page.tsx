"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Code,
  MessageSquare,
  FileText,
  Layers,
  ServerCrash,
  RefreshCw,
} from "lucide-react";
// Assuming InterviewShareLink is correctly implemented
// import { InterviewShareLink } from '@/components/interview-share-link';
// For now, I'll stub it if not provided in current context
const InterviewShareLink = ({
  interviewId,
  candidateEmail,
}: {
  interviewId: string;
  candidateEmail?: string | null;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Share Interview</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">
        Share link component placeholder for ID: {interviewId}
      </p>
    </CardContent>
  </Card>
);

import { interviewApi, handleApiError, withRetry } from "@/lib/api-utils";
import { Badge } from "@/components/ui/badge";

// This Question type is for distinct questions, not the embedded AI ones initially
// but can be used to display the generated questions if they have similar fields.
interface DisplayableQuestion {
  id?: string; // Might not have a DB ID if just generated and shown
  question: string; // For AI, this is the core content
  // AI questions typically won't have type/options/correctAnswer defined *before* candidate interaction
  type?: string;
  answer?: string;
  feedback?: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role?: string | null; // Role candidate is applying for
  // ... other candidate fields
}

// Aligned with BackendInterview from TakeInterviewPage
interface Interview {
  id: string;
  title: string;
  description?: string | null;
  domain: string;
  subDomain?: string | null;
  difficulty?: string | null;
  date?: string; // Creation or scheduled date
  duration: number;
  status: string;
  type: "ai_generated" | "technical" | "behavioral" | "mixed";
  candidateId?: string | null; // Changed to optional
  candidate?: Candidate | null;
  // For AI interviews, questions are embedded after generation
  questions?: Array<{
    question: string;
    answer: string; // Will be empty initially
    feedback: string; // Will be empty initially
    score?: number | null;
  }>;
}

export default function InterviewSetupPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [interview, setInterview] = useState<Interview | null>(null);
  // This state will hold questions from interview.questions after generation for display
  const [displayableQuestions, setDisplayableQuestions] = useState<
    DisplayableQuestion[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

  const fetchInterviewData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Fetching interview (setup) with ID: ${params.id}`);

      const interviewData: Interview = await withRetry(() =>
        interviewApi.getInterview(params.id)
      );
      console.log(`Interview data (setup) received:`, interviewData);
      setInterview(interviewData);

      // If interview is AI-generated and already has questions, display them
      if (
        interviewData.type === "ai_generated" &&
        interviewData.questions &&
        interviewData.questions.length > 0
      ) {
        setDisplayableQuestions(
          interviewData.questions.map((q) => ({
            question: q.question,
            answer: q.answer,
            feedback: q.feedback,
          }))
        );
        toast({
          title: "Questions Loaded",
          description: `Loaded ${interviewData.questions.length} existing questions for this AI interview.`,
        });
      } else if (interviewData.type !== "ai_generated") {
        // For non-AI, fetch distinct questions
        try {
          console.log(
            `Fetching distinct questions for non-AI interview ID: ${params.id}`
          );
          // Assuming getQuestions returns [{id, content, type, ...}]
          type BackendQuestion = { id: string; content: string; type: string };
          const questionsData: BackendQuestion[] =
            await interviewApi.getQuestions(params.id);
          console.log(
            `Distinct questions data received: ${questionsData.length} questions`
          );
          setDisplayableQuestions(
            questionsData.map((q) => ({
              id: q.id,
              question: q.content,
              type: q.type,
            }))
          );
        } catch (qError: any) {
          console.warn(
            "No distinct questions found or error fetching them:",
            qError.message
          );
          setDisplayableQuestions([]); // Ensure it's an empty array
        }
      }
    } catch (err: any) {
      console.error("Error fetching interview (setup):", err);
      const errorMessage = handleApiError(err, () => {}); // Don't set global error yet
      setError(errorMessage || "Failed to load interview details.");
    } finally {
      setLoading(false);
    }
  }, [params.id, API_BASE_URL, toast]); // Added toast to useCallback dependencies

  useEffect(() => {
    fetchInterviewData();
  }, [fetchInterviewData]);

  const handleGenerateAiQuestions = async () => {
    if (!interview || interview.type !== "ai_generated") {
      toast({
        title: "Invalid Action",
        description: "Question generation is for AI interviews.",
        variant: "destructive",
      });
      return;
    }
    try {
      setGenerating(true);
      setError(null);
      console.log(`Generating AI questions for interview ID: ${params.id}`);

      // This API call should return the updated interview object with embedded questions
      const responseData = await interviewApi.generateAiQuestions(params.id);
      console.log(`Generate AI questions API response (raw):`, responseData);

      // Check if responseData has the 'interview' property
      if (!responseData) {
        console.error(
          "Invalid response format from generateAiQuestions: 'interview' object not found or not an object.",
          responseData
        );
        throw new Error(
          "Question generation failed: Server response did not contain the expected interview data."
        );
      }

      const updatedInterview: Interview = responseData as Interview;

      console.log(
        `Generate AI questions API response (extracted interview):`,
        updatedInterview
      );

      // Now the rest of your checks should work
      if (
        !updatedInterview.questions ||
        !Array.isArray(updatedInterview.questions)
      ) {
        console.error(
          "Invalid response format: updatedInterview.questions array not found or not an array"
        );
        throw new Error(
          "Question generation failed: Server response was not in the expected format (missing questions array in interview object)."
        );
      }

      setInterview(updatedInterview); // Update the main interview state
      setDisplayableQuestions(
        updatedInterview.questions.map((q) => ({
          question: q.question,
          answer: q.answer,
          feedback: q.feedback,
        }))
      );

      toast({
        title: "AI Questions Generated",
        description: `Successfully generated ${updatedInterview.questions.length} questions.`,
      });
    } catch (err: any) {
      console.error("Error generating AI questions:", err);
      const errorMessage = handleApiError(err, () => {});
      setError(errorMessage || "Failed to generate AI questions.");
      toast({
        title: "Generation Error",
        description:
          errorMessage ||
          "Could not generate questions. Please check interview settings or try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleStartInterview = async () => {
    if (!interview) return;

    if (
      interview.type === "ai_generated" &&
      (!interview.questions || interview.questions.length === 0)
    ) {
      toast({
        title: "No AI Questions",
        description:
          "Please generate AI questions before starting this type of interview.",
        variant: "destructive",
      });
      return;
    }
    if (
      interview.type !== "ai_generated" &&
      displayableQuestions.length === 0
    ) {
      toast({
        title: "No Questions",
        description:
          "This interview has no questions assigned. Please add questions or ensure they are correctly set up.",
        variant: "destructive",
      });
      return;
    }

    try {
      setGenerating(true); // Use 'generating' as a general loading state for this action
      // Update interview status to 'in_progress' (or 'scheduled' if candidate takes it via link)
      // For AI interviews, status might already be 'in_progress' after question generation.
      // If it's 'scheduled' and admin is starting it, then update.
      if (
        interview.status === "scheduled" ||
        interview.status === "pending_ai_generation"
      ) {
        await interviewApi.updateInterview(params.id, {
          status: "in_progress",
        });
      }

      toast({
        title: "Interview Ready",
        description: "Redirecting to conduct the interview...",
      });
      // Navigate to the actual interview taking page
      router.push(`/dashboard/interviews/${params.id}/take`); // Changed from /take to /take
    } catch (err: any) {
      console.error("Error starting interview:", err);
      const errorMessage = handleApiError(err, () => {});
      toast({
        title: "Start Error",
        description:
          errorMessage || "Failed to update interview status to start.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">
          Loading Interview Setup...
        </p>
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="container mx-auto py-10 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
        <ServerCrash className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-2xl font-semibold text-destructive mb-3">
          Failed to Load Interview Setup
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          {error ||
            "The interview data could not be retrieved. It might have been deleted or an error occurred."}
        </p>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/interviews")}
          >
            Back to Interviews
          </Button>
          <Button onClick={fetchInterviewData} disabled={loading}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />{" "}
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const isAiInterview = interview.type === "ai_generated";
  const questionsAvailable = isAiInterview
    ? interview.questions && interview.questions.length > 0
    : displayableQuestions.length > 0;

  return (
    <div className="container mx-auto py-6 px-4 md:px-0">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-1">
          {interview.title || `Setup Interview`}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Prepare and configure the interview for{" "}
          <span className="font-semibold">
            {interview.candidate?.name || "the candidate"}
          </span>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Interview Questions</CardTitle>
              <CardDescription>
                {isAiInterview
                  ? "Generate AI-powered technical questions based on the interview settings."
                  : "Review assigned questions for this manual/technical interview."}
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[300px] flex flex-col">
              {" "}
              {/* Ensure min height */}
              {displayableQuestions.length > 0 ? (
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-md border border-green-200 dark:border-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <p className="font-medium text-sm">
                      {displayableQuestions.length} questions are ready for this
                      interview.
                    </p>
                  </div>

                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 -mr-2 simple-scrollbar">
                    {" "}
                    {/* Custom scrollbar class if needed */}
                    {displayableQuestions.map((q, index) => (
                      <div
                        key={q.id || `q-${index}`}
                        className="border dark:border-slate-700 rounded-lg p-3 text-sm"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                            {index + 1}
                          </div>
                          <p className="font-medium flex-grow">{q.question}</p>
                        </div>
                        {q.type &&
                          !isAiInterview && ( // Show type for non-AI questions
                            <Badge variant="outline" className="mt-2 text-xs">
                              {q.type}
                            </Badge>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 flex flex-col items-center justify-center flex-grow">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {isAiInterview
                      ? "No AI questions generated yet"
                      : "No questions assigned"}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                    {isAiInterview
                      ? "Click the button below to generate questions using AI."
                      : "Please assign questions to this interview through the question bank or edit functionality."}
                  </p>
                  {isAiInterview && (
                    <Button
                      onClick={handleGenerateAiQuestions}
                      disabled={generating}
                      className="mx-auto"
                    >
                      {generating ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Layers className="h-4 w-4 mr-2" />
                      )}
                      Generate AI Questions
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t">
              {isAiInterview && displayableQuestions.length > 0 && (
                <Button
                  variant="outline"
                  onClick={handleGenerateAiQuestions} // This becomes "Regenerate"
                  disabled={generating}
                >
                  {generating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Regenerate AI Questions
                </Button>
              )}
              <Button
                onClick={handleStartInterview}
                disabled={!questionsAvailable || generating}
                className="ml-auto w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
                size="lg"
              >
                {generating && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Start Interview
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Interview Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <DetailItem label="Domain" value={interview.domain} />
              <DetailItem label="Sub-Domain" value={interview.subDomain} />
              <DetailItem
                label="Difficulty"
                value={interview.difficulty}
                className="capitalize"
              />
              <DetailItem
                label="Type"
                value={interview.type?.replace("_", " ")}
                className="capitalize"
              />
              <Separator className="my-2" />
              <DetailItem
                label="Candidate"
                value={interview.candidate?.name || "Not Assigned"}
              />
              {interview.candidate?.email && (
                <p className="text-xs text-muted-foreground -mt-2">
                  {interview.candidate.email}
                </p>
              )}
              <Separator className="my-2" />
              <DetailItem
                label="Scheduled Date"
                value={
                  interview.date
                    ? new Date(interview.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Not set"
                }
              />
              <DetailItem
                label="Duration"
                value={`${interview.duration} minutes`}
              />
              <DetailItem
                label="Status"
                value={<StatusBadge status={interview.status} />}
              />
            </CardContent>
          </Card>

          <InterviewShareLink
            interviewId={interview.id}
            candidateEmail={interview.candidate?.email}
          />
        </div>
      </div>
    </div>
  );
}

// Helper component for detail items
const DetailItem = ({
  label,
  value,
  className,
}: {
  label: string;
  value?: string | React.ReactNode | null;
  className?: string;
}) => {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div>
      <h3 className="text-xs font-medium text-muted-foreground">{label}</h3>
      {typeof value === "string" ? (
        <p className={`font-semibold ${className || ""}`}>{value}</p>
      ) : (
        <div className={`font-semibold ${className || ""}`}>{value}</div>
      )}
    </div>
  );
};

// StatusBadge and other helper components if not imported globally
const StatusBadge = ({ status }: { status: string }) => {
  // ... (implementation from previous example or your global components)
  let variant: "default" | "destructive" | "outline" | "secondary" = "outline";
  let className = "";
  switch (status?.toLowerCase()) {
    case "completed":
      className =
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-700";
      break;
    case "in_progress":
      className =
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-700";
      break;
    case "scheduled":
      className =
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700";
      break;
    case "pending_ai_generation":
      className =
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-700";
      break;
    case "cancelled":
      className =
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-700";
      variant = "destructive";
      break;
    default:
      className =
        "bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400 border-gray-200 dark:border-gray-600";
  }
  return (
    <Badge variant={variant} className={`px-2 py-0.5 text-xs ${className}`}>
      {status?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) ||
        "Unknown"}
    </Badge>
  );
};
