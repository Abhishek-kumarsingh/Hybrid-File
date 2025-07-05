"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic"; // For NotFound, if needed
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast"; // Assuming this is correctly set up
import {
  Loader2,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ServerCrash,
} from "lucide-react";
import { interviewApi, handleApiError, withRetry } from "@/lib/api-utils"; // Ensure these are implemented
import { Badge } from "@/components/ui/badge";

// Frontend type for a question being *displayed* during the interview
interface DisplayQuestion {
  id: string; // Original question ID if from DB, or an index/generated ID for embedded AI questions
  content: string;
  type: "text" | "coding" | "multiple-choice" | "ai_text"; // 'ai_text' for embedded AI questions
  options?: string[]; // Parsed options for multiple-choice
  // Fields below might not be available for AI questions during conduct, only for distinct questions
  domain?: string;
  subDomain?: string | null;
  difficulty?: string;
}

// Backend's Interview type (align with your src/types.ts)
interface BackendInterview {
  id: string;
  title: string;
  description?: string | null;
  domain: string; // Ensure this is always present from backend
  subDomain?: string | null;
  difficulty?: string | null;
  date?: string; // Could be interview creation date or scheduled date
  duration: number; // In minutes
  status: string;
  type: "ai_generated" | "technical" | "behavioral" | "mixed"; // Important for logic
  // For AI interviews, questions are embedded
  questions?: Array<{
    question: string;
    answer: string; // Candidate's answer
    feedback: string; // AI feedback on answer
    score?: number | null; // AI score for answer
  }>;
  // For non-AI, questions are fetched separately
}

export default function TakeInterviewPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [interview, setInterview] = useState<BackendInterview | null>(null);
  const [displayQuestions, setDisplayQuestions] = useState<DisplayQuestion[]>(
    []
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // Keyed by DisplayQuestion.id
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

  const fetchInterviewData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Fetching interview with ID: ${params.id}`);

      const interviewData: BackendInterview = await withRetry(() =>
        // Assuming getInterview can fetch both sample and regular by ID
        interviewApi.getInterview(params.id)
      );
      console.log("Interview data:", interviewData);
      setInterview(interviewData);

      if (interviewData.duration > 0) {
        setTimeLeft(interviewData.duration * 60);
      } else {
        setTimeLeft(null); // No timer if duration is 0 or not set
      }

      let fetchedQuestions: DisplayQuestion[] = [];
      const initialAnswers: Record<string, string> = {};

      if (
        interviewData.type === "ai_generated" &&
        interviewData.questions &&
        interviewData.questions.length > 0
      ) {
        fetchedQuestions = interviewData.questions.map((q, index) => {
          const qId = `ai-q-${index}`;
          initialAnswers[qId] = q.answer || ""; // Pre-fill if answers exist (e.g., resuming)
          return {
            id: qId,
            content: q.question,
            type: "ai_text", // Simplified type for AI interaction
          };
        });
      } else if (interviewData.type !== "ai_generated") {
        console.log(
          `Fetching distinct questions for interview ID: ${params.id}`
        );
        // Your backend Question type
        type BackendQuestion = {
          id: string;
          content: string;
          type: string;
          options: string | null /* ...other fields */;
        };
        const questionsData: BackendQuestion[] = await withRetry(() =>
          interviewApi.getQuestions(params.id)
        );
        console.log("Distinct questions data:", questionsData);

        if (!Array.isArray(questionsData) || questionsData.length === 0) {
          throw new Error(
            "No questions found for this interview. Please ensure questions are set up."
          );
        }
        fetchedQuestions = questionsData.map((q) => {
          initialAnswers[q.id] = ""; // Initialize empty answer
          return {
            id: q.id,
            content: q.content,
            type: q.type as DisplayQuestion["type"],
            options: q.options ? JSON.parse(q.options) : undefined,
          };
        });
      } else {
        throw new Error(
          "AI interview selected, but no questions are embedded. Please set up questions."
        );
      }

      setDisplayQuestions(fetchedQuestions);
      setAnswers(initialAnswers);
    } catch (err: any) {
      console.error("Error fetching interview data:", err);
      const apiErrorMsg = handleApiError(err, () => {}); // Don't set global error yet
      setError(apiErrorMsg || err.message || "Failed to load interview data.");
    } finally {
      setLoading(false);
    }
  }, [params.id, API_BASE_URL]); // API_BASE_URL not strictly needed but for consistency

  useEffect(() => {
    fetchInterviewData();
  }, [fetchInterviewData]);

  // Timer effect
  useEffect(() => {
    if (timeLeft === null) return; // No timer if timeLeft is null
    if (timeLeft <= 0) {
      if (!submitting && interview && interview.status !== "completed") {
        // Avoid auto-submit if already submitting or completed
        toast({
          title: "Time's up!",
          description: "The interview will be submitted automatically.",
          variant: "destructive",
          duration: 5000,
        });
        handleSubmitInterview(true); // Auto-submit when time is up
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitting, interview]); // Added submitting and interview to dependencies

  const formatTime = (seconds: number | null): string => {
    if (seconds === null) return "--:--";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < displayQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitInterview = useCallback(
    async (autoSubmit: boolean = false) => {
      if (!interview) return;

      if (!autoSubmit) {
        const unansweredQuestions = displayQuestions.filter(
          (q) => !answers[q.id]?.trim()
        );
        if (unansweredQuestions.length > 0) {
          const isConfirmed = window.confirm(
            `You have ${unansweredQuestions.length} unanswered questions. Are you sure you want to submit?`
          );
          if (!isConfirmed) return;
        }
      }

      try {
        setSubmitting(true);
        setError(null);
        console.log("Starting interview submission process...");

        // Submit answers and get feedback for AI interviews
        if (interview.type === "ai_generated") {
          for (let i = 0; i < displayQuestions.length; i++) {
            const q = displayQuestions[i];
            const answerContent = answers[q.id] || ""; // Send empty string if no answer
            if (answerContent.trim() || autoSubmit) {
              // Submit if there's content or if it's an auto-submit
              try {
                console.log(
                  `Submitting answer for AI question index ${i}: ${q.content.substring(
                    0,
                    20
                  )}...`
                );
                // This API should store answer, get feedback, and update the embedded question in Interview doc
                await interviewApi.submitAiAnswer(
                  interview.id,
                  i,
                  answerContent
                );
              } catch (err) {
                console.warn(
                  `Error submitting AI answer for question index ${i}:`,
                  err
                );
                toast({
                  title: `Error saving answer for Q${i + 1}`,
                  variant: "destructive",
                  duration: 3000,
                });
                // Decide if you want to stop or continue
              }
            }
          }
        } else {
          // For non-AI interviews, submit responses
          for (const [questionId, content] of Object.entries(answers)) {
            if (content.trim() || autoSubmit) {
              try {
                await interviewApi.submitResponse(
                  interview.id,
                  questionId,
                  content
                );
              } catch (err) {
                console.warn(
                  `Error saving response for question ${questionId}:`,
                  err
                );
                // Continue
              }
            }
          }
        }

        console.log("Finalizing interview status and overall feedback...");
        // This endpoint should handle setting status to 'completed' AND generating overall feedback
        await interviewApi.finalizeInterview(interview.id);

        toast({
          title: "Interview Completed!",
          description: "Your responses have been submitted successfully.",
          variant: "default", // 'success' if you have one
          className: "bg-green-500 text-white",
        });
        router.push(`/dashboard/interviews/${interview.id}/results`);
      } catch (error: any) {
        console.error("Error submitting interview:", error);
        const errorMessage = handleApiError(error, () => {});
        setError(
          errorMessage || "An critical error occurred during submission."
        );
        toast({
          title: "Submission Error",
          description:
            errorMessage ||
            "Failed to submit the interview. Please try again or contact support.",
          variant: "destructive",
          duration: 7000,
        });
      } finally {
        setSubmitting(false);
      }
    },
    [interview, displayQuestions, answers, router, toast]
  );

  if (loading) {
    return (
      <div className="container py-6 flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl text-muted-foreground">Loading Interview...</p>
      </div>
    );
  }

  if (error || !interview || displayQuestions.length === 0) {
    return (
      <div className="container py-6 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
        <ServerCrash className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-2xl font-semibold text-destructive mb-3">
          Could Not Load Interview
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          {error ||
            "No questions were found for this interview, or the interview data is unavailable. Please check the interview setup or try again later."}
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/interviews")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Interviews
        </Button>
        {error && (
          <Button
            className="mt-4"
            onClick={fetchInterviewData}
            disabled={loading}
          >
            <Loader2
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : "hidden"}`}
            />{" "}
            Try Again
          </Button>
        )}
      </div>
    );
  }

  const currentDisplayQuestion = displayQuestions[currentQuestionIndex];

  return (
    <div className="container mx-auto py-6 px-4 md:px-0">
      <div className="flex flex-col mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
          <h1 className="text-xl md:text-2xl font-bold leading-tight">
            {interview.title || `Interview: ${interview.domain}`}
          </h1>
          {timeLeft !== null && (
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${
                timeLeft <= 300
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {interview.description ||
            "Answer each question to the best of your ability within the time limit."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="lg:col-span-3">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`bg-primary text-primary-foreground font-semibold rounded-full w-8 h-8 flex items-center justify-center text-sm`}
                  >
                    {currentQuestionIndex + 1}
                  </div>
                  <CardTitle className="text-lg md:text-xl">
                    Question {currentQuestionIndex + 1}{" "}
                    <span className="font-normal text-muted-foreground">
                      of {displayQuestions.length}
                    </span>
                  </CardTitle>
                </div>
                <Badge variant="outline" className="text-xs capitalize">
                  {currentDisplayQuestion.type.replace("_", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <p className="text-base md:text-lg mb-6 leading-relaxed">
                {currentDisplayQuestion.content}
              </p>

              {currentDisplayQuestion.type === "multiple-choice" &&
                currentDisplayQuestion.options && (
                  <RadioGroup
                    value={answers[currentDisplayQuestion.id] || ""}
                    onValueChange={(value) =>
                      handleAnswerChange(currentDisplayQuestion.id, value)
                    }
                    className="space-y-3"
                  >
                    {currentDisplayQuestion.options.map(
                      (option: string, index: number) => (
                        <Label
                          key={index}
                          htmlFor={`option-${currentDisplayQuestion.id}-${index}`}
                          className="flex items-start space-x-3 p-3 border rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`option-${currentDisplayQuestion.id}-${index}`}
                            className="mt-1 border-muted-foreground"
                          />
                          <span className="font-normal text-sm md:text-base">
                            {option}
                          </span>
                        </Label>
                      )
                    )}
                  </RadioGroup>
                )}

              {(currentDisplayQuestion.type === "text" ||
                currentDisplayQuestion.type === "coding" ||
                currentDisplayQuestion.type === "ai_text") && (
                <Textarea
                  value={answers[currentDisplayQuestion.id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(
                      currentDisplayQuestion.id,
                      e.target.value
                    )
                  }
                  placeholder={
                    currentDisplayQuestion.type === "coding"
                      ? "// Write your code here..."
                      : currentDisplayQuestion.type === "ai_text"
                      ? "Describe your approach and solution..."
                      : "Type your answer here..."
                  }
                  className={`min-h-[150px] md:min-h-[200px] text-sm md:text-base ${
                    currentDisplayQuestion.type === "coding"
                      ? "font-mono bg-muted/50"
                      : ""
                  }`}
                  rows={currentDisplayQuestion.type === "coding" ? 10 : 6}
                />
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0 || submitting}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentQuestionIndex < displayQuestions.length - 1 ? (
                <Button
                  onClick={handleNextQuestion}
                  disabled={submitting}
                  className="w-full sm:w-auto"
                >
                  Next Question
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => handleSubmitInterview(false)}
                  disabled={submitting}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                  )}
                  Submit Interview
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="lg:sticky lg:top-24">
          {" "}
          {/* Make navigator sticky on larger screens */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">
                Question Navigator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-5 gap-1.5 md:gap-2 mb-4">
                {displayQuestions.map((q, index) => (
                  <Button
                    key={q.id}
                    variant={
                      index === currentQuestionIndex
                        ? "default"
                        : answers[q.id]?.trim()
                        ? "outline"
                        : "secondary"
                    }
                    size="icon"
                    className={`h-9 w-9 md:h-10 md:w-10 p-0 text-xs md:text-sm rounded-md 
                                ${
                                  index === currentQuestionIndex
                                    ? "ring-2 ring-primary ring-offset-2"
                                    : ""
                                }
                                ${
                                  answers[q.id]?.trim()
                                    ? "border-green-500 text-green-600"
                                    : ""
                                }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                    disabled={submitting}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>

              <Separator className="my-3 md:my-4" />

              <div className="space-y-1.5 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full border border-green-500 bg-green-500/20"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                  <span>Unanswered</span>
                </div>
              </div>

              {currentQuestionIndex === displayQuestions.length - 1 && (
                <>
                  <Separator className="my-3 md:my-4" />
                  <p className="text-xs text-muted-foreground mb-2 text-center">
                    You are on the last question.
                  </p>
                </>
              )}

              <Button
                className="w-full mt-4 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
                onClick={() => handleSubmitInterview(false)}
                disabled={submitting}
                size="lg"
              >
                {submitting ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                )}
                Submit All & Finish
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
