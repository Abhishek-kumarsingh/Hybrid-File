"use client";

import { useState, useEffect, useCallback } from "react"; // Added useCallback
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // For role-based fetching
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress"; // Assuming this is your updated one with indicatorClassName
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart, // As per your original component
  UserCheck,
  Users,
  Calendar,
  MessageSquare,
  Plus,
  ArrowUpRight,
  Clock,
  Globe,
  Server,
  // Layers, // Only if 'fullstack' was in your original domains for quick start
  // BarChart3, // Only if 'data_science' was in your original domains for quick start
  Brain,
  Play,
  List as ListIcon, // As per your original component
  Loader2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { interviewApi, handleApiError, withRetry } from "@/lib/api-utils";
// Removed Badge and Separator if not used in the exact UI you want to keep
// import { Badge } from "@/components/ui/badge";
// import { Separator } from '@/components/ui/separator';
// import { cn } from '@/lib/utils'; // Not used if no dynamic class changes

// --- Domain and Level constants (matching your original component's usage) ---
const domains = [
  { id: "frontend", name: "Frontend Development", icon: Globe },
  { id: "backend", name: "Backend Development", icon: Server },
  // Add other domains ONLY if they were in your original quick start UI
];

const difficultyLevels = [
  { id: "basic", name: "Basic" },
  { id: "intermediate", name: "Intermediate" },
  { id: "advanced", name: "Advanced" },
];
// --- End Constants ---

// Frontend Interview data type (EXACTLY AS IN YOUR ORIGINAL COMPONENT)
interface Interview {
  id: string;
  candidate: string; // Candidate's Name
  role: string; // Candidate's Role
  date: string; // Interview Date (or creation/update date)
  score?: number;
  status: string;
  avatar?: string; // URL for candidate's avatar
}

// This type should match what your backend's /api/interviews (or /user/:userId) actually returns for EACH interview object
// including populated candidate details if applicable.
interface BackendInterviewObject {
  id: string;
  title: string;
  domain: string; // Keep this, might be useful for filtering later if UI evolves
  status: string;
  score?: number | null;
  date?: string | null; // Scheduled date
  createdAt: string;
  updatedAt: string;
  candidateId?: string | null;
  candidate?: {
    id: string;
    name: string;
    role?: string | null; // Role candidate is applying for
    avatarUrl?: string | null;
  } | null;
  // Add other fields your backend might return that are relevant for the dashboard
  // e.g., level, type, if you decide to display them later without UI change now
}

// Format date helper (as in your original component)
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    return "Invalid Date";
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const { toast } = useToast();

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isQuickStartLoading, setIsQuickStartLoading] = useState(false);

  const [recentInterviews, setRecentInterviews] = useState<Interview[]>([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState<Interview[]>([]);

  const [selectedDomain, setSelectedDomain] = useState(""); // Keep as in original
  const [selectedDifficulty, setSelectedDifficulty] = useState(""); // Keep as in original (or levels[1].id)

  const [stats, setStats] = useState({
    totalInterviews: 0,
    completedInterviews: 0,
    scheduledInterviews: 0,
    totalCandidates: 0, // Kept this as per your original for the stats card
  });
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    // Ensure session and user ID are available for non-admin roles
    if (
      sessionStatus === "authenticated" &&
      !session?.user?.id &&
      session?.user?.role !== "admin"
    ) {
      setError("User information is missing. Cannot fetch interviews.");
      setIsPageLoading(false);
      return;
    }
    if (!session?.user) {
      // Also handles case where session is null
      setIsPageLoading(false);
      return;
    }

    setIsPageLoading(true);
    setError(null);
    try {
      let allBackendInterviews: BackendInterviewObject[];

      if (session.user.role === "admin") {
        console.log("Fetching all interviews for admin...");
        allBackendInterviews = await withRetry(() =>
          interviewApi.getAllInterviews()
        );
      } else {
        console.log(`Fetching interviews for user ID: ${session.user.id}`);
        allBackendInterviews = await withRetry(() =>
          interviewApi.getMyInterviews(session.user.id!)
        );
      }
      console.log("Fetched backend interviews:", allBackendInterviews);

      // --- Data Mapping from BackendInterviewObject to your frontend Interview type ---
      const mappedInterviews: Interview[] = allBackendInterviews.map(
        (beInterview) => ({
          id: beInterview.id,
          candidate: beInterview.candidate?.name || "Unknown Candidate",
          role: beInterview.candidate?.role || beInterview.title || "N/A", // Use candidate's role if available
          date: formatDate(
            beInterview.date ||
              (beInterview.status === "completed"
                ? beInterview.updatedAt
                : beInterview.createdAt)
          ), // Format date here
          score: beInterview.score ?? undefined,
          status: beInterview.status,
          avatar: beInterview.candidate?.avatarUrl || undefined,
        })
      );
      // --- End Data Mapping ---

      const recent = mappedInterviews
        .filter((interview) => interview.status === "completed")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Date is already formatted, but original Date object would be better for sort
        .slice(0, 5);

      const upcoming = mappedInterviews
        .filter((interview) =>
          ["scheduled", "pending_ai_generation", "in_progress"].includes(
            interview.status
          )
        )
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5);

      setRecentInterviews(recent);
      setUpcomingInterviews(upcoming);

      const completedCount = allBackendInterviews.filter(
        (i) => i.status === "completed"
      ).length;

      setStats({
        totalInterviews: allBackendInterviews.length,
        completedInterviews: completedCount,
        scheduledInterviews: allBackendInterviews.filter(
          (i) =>
            i.status === "scheduled" || i.status === "pending_ai_generation"
        ).length,
        totalCandidates: [
          ...Array.from(
            new Set(
              allBackendInterviews.map((i) => i.candidateId).filter(Boolean)
            )
          ),
        ].length,
        // avgScore: avgScore, // Removed if not used in your exact original UI for stats cards
      });
    } catch (err: any) {
      console.error("Error fetching dashboard data:", err);
      const errorMessage = handleApiError(err, () => {});
      setError(errorMessage || "Failed to load dashboard data.");
      toast({
        title: "Data Load Error",
        description: errorMessage || "Could not fetch interview data.",
        variant: "destructive",
      });
    } finally {
      setIsPageLoading(false);
    }
  }, [session, sessionStatus, toast]); // Add sessionStatus to dependencies

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      fetchDashboardData();
    } else if (sessionStatus === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [sessionStatus, fetchDashboardData, router]);

  const handleStartInterview = async () => {
    if (!selectedDomain || !selectedDifficulty) {
      toast({
        title: "Missing information",
        description: "Please select both domain and difficulty level",
        variant: "destructive",
      });
      return;
    }

    setIsQuickStartLoading(true);
    try {
      const domainInfo = domains.find((d) => d.id === selectedDomain);
      const difficultyInfo = difficultyLevels.find(
        (l) => l.id === selectedDifficulty
      );
      toast({
        title: "Starting interview",
        description: `Domain: ${
          domainInfo?.name || selectedDomain
        }, Difficulty: ${difficultyInfo?.name || selectedDifficulty}`,
      });
      router.push(
        `/dashboard/interviews/new?domain=${selectedDomain}&level=${selectedDifficulty}`
      );
    } catch (error) {
      console.error("Error starting interview:", error);
      toast({
        title: "Error",
        description: "Failed to start interview",
        variant: "destructive",
      });
      setIsQuickStartLoading(false);
    }
  };

  // ----- Loading and Error State UI (as per your original component's style if it had them, or simple ones) -----
  if (
    sessionStatus === "loading" ||
    (sessionStatus === "authenticated" && isPageLoading)
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="flex space-x-2 mb-4 justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-4">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-destructive mb-2">
            Could Not Load Dashboard
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">{error}</p>
          <Button onClick={fetchDashboardData} disabled={isPageLoading}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isPageLoading ? "animate-spin" : ""}`}
            />{" "}
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // ----- JSX UI (Copied directly from your provided component, with data now coming from state) -----
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {session?.user?.name?.split(" ")[0] || "User"}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your interview activities
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Interviews
                </p>
                <p className="text-3xl font-bold">{stats.totalInterviews}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">12%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed
                </p>
                <p className="text-3xl font-bold">
                  {stats.completedInterviews}
                </p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-full">
                <UserCheck className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">8%</span>
              <span>more than previous</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Scheduled
                </p>
                <p className="text-3xl font-bold">
                  {stats.scheduledInterviews}
                </p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Upcoming this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Candidates
                </p>{" "}
                {/* Kept as per original UI */}
                <p className="text-3xl font-bold">{stats.totalCandidates}</p>
              </div>
              <div className="p-2 bg-purple-500/10 rounded-full">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">18%</span>
              <span>increase in pool</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Interview Start */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Interview Start</CardTitle>
          <CardDescription>
            Start a new interview by selecting domain and difficulty
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="domain" className="mb-2 block">
                Select Domain
              </Label>
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger>
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((domain) => (
                    <SelectItem key={domain.id} value={domain.id}>
                      <div className="flex items-center gap-2">
                        <domain.icon className="h-4 w-4" />
                        <span>{domain.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Select Difficulty</Label>
              <RadioGroup
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
                className="flex gap-4"
              >
                {difficultyLevels.map((level) => (
                  <div key={level.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={level.id} id={level.id} />
                    <Label htmlFor={level.id} className="font-normal">
                      {level.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleStartInterview}
                disabled={
                  isQuickStartLoading || !selectedDomain || !selectedDifficulty
                }
                className="w-full"
              >
                {isQuickStartLoading && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                <Play className="h-4 w-4 mr-2" />
                Start Interview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interview Activity */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Interview Activity</CardTitle>
                <CardDescription>
                  Track your recent and upcoming interviews
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Link href="/dashboard/interviews">
                  {" "}
                  {/* Changed from /routes as per your original */}
                  <Button variant="outline">
                    <ListIcon className="h-4 w-4 mr-1" /> All Interviews{" "}
                    {/* Using your original ListIcon alias */}
                  </Button>
                </Link>
                <Link href="/dashboard/interviews/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-1" /> New Interview
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recent">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                </TabsList>

                <TabsContent value="recent" className="space-y-4">
                  {recentInterviews.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No recent interviews found
                    </div>
                  ) : (
                    recentInterviews.map((interview) => (
                      <Link
                        key={interview.id}
                        href={`/dashboard/interviews/${interview.id}/results`}
                        className="block"
                      >
                        <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage
                                src={interview.avatar}
                                alt={interview.candidate}
                              />
                              <AvatarFallback>
                                {interview.candidate
                                  ?.charAt(0)
                                  ?.toUpperCase() || "C"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {interview.candidate}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {interview.role}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {interview.date}{" "}
                                {/* Date is already formatted from mapping */}
                              </p>
                            </div>
                          </div>
                          {interview.status === "completed" &&
                          typeof interview.score === "number" ? (
                            <div className="text-right">
                              <p className="text-sm font-medium mb-1">
                                Score: {interview.score}/100
                              </p>
                              <Progress
                                value={interview.score}
                                className="w-24 h-2"
                                // Assuming your Progress component handles indicator color or you add a prop
                                indicatorClassName={
                                  interview.score >= 70
                                    ? "bg-green-500"
                                    : interview.score >= 40
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                                }
                              />
                            </div>
                          ) : (
                            <div className="text-right">
                              {" "}
                              {/* Added this div for consistent layout */}
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {interview.status
                                  .replace("_", " ")
                                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="upcoming" className="space-y-4">
                  {upcomingInterviews.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No upcoming interviews scheduled
                    </div>
                  ) : (
                    upcomingInterviews.map((interview) => (
                      <Link
                        key={interview.id}
                        href={`/dashboard/interviews/${interview.id}/setup`} // Or /${interview.id} for a detail view
                        className="block"
                      >
                        <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage
                                src={interview.avatar}
                                alt={interview.candidate}
                              />
                              <AvatarFallback>
                                {interview.candidate
                                  ?.charAt(0)
                                  ?.toUpperCase() || "C"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {interview.candidate}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {interview.role}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {interview.date}{" "}
                                {/* Date is already formatted */}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              {interview.status
                                .replace("_", " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Overview Analytics Card */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>
                Interview performance metrics (using current page stats)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats.completedInterviews > 0 ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-medium">Average Score</p>
                      <p className="text-sm font-bold">{stats.avgScore}/100</p>
                    </div>
                    <Progress
                      value={stats.avgScore}
                      className="h-2"
                      indicatorClassName={
                        stats.avgScore >= 70
                          ? "bg-green-500"
                          : stats.avgScore >= 40
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }
                    />
                  </div>
                  {/* The following are still "mocked" in the sense that they are not from a separate analytics API call */}
                  {/* You'd replace these with data from a dedicated analytics endpoint or calculation if needed */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-medium">
                        Communication Skills (Sample)
                      </p>
                      <p className="text-sm font-bold">82/100</p>
                    </div>
                    <Progress
                      value={82}
                      className="h-2"
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-medium">
                        Technical Knowledge (Sample)
                      </p>
                      <p className="text-sm font-bold">75/100</p>
                    </div>
                    <Progress
                      value={75}
                      className="h-2"
                      indicatorClassName="bg-sky-500"
                    />
                  </div>
                  {/* You could add more stats here if your `stats` object contained them */}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No analytics available
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Complete some interviews to see performance analytics.
                  </p>
                  <Button
                    onClick={handleStartInterview}
                    disabled={
                      isQuickStartLoading ||
                      !selectedDomain ||
                      !selectedDifficulty
                    }
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Your First Interview
                  </Button>
                </div>
              )}
            </CardContent>
            {stats.completedInterviews > 0 && (
              <CardFooter>
                <Link href="/dashboard/analytics" className="w-full">
                  <Button variant="outline" className="w-full">
                    <BarChart className="h-4 w-4 mr-2" />
                    View Detailed Analytics Page
                  </Button>
                </Link>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
