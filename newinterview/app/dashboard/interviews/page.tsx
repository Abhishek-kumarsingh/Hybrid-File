"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation"; // useRouter for navigation
import { useSession } from "next-auth/react"; // For role-based data fetching
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  // TableCaption, // Not used in your current UI
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress"; // Ensure this is your updated Progress component
import {
  Plus,
  Search,
  // Filter, // Filter button was removed in favor of direct select changes
  // ArrowUpDown, // Not used for sorting in this UI
  // Calendar, // Not used directly
  FileText,
  MoreHorizontal,
  Eye,
  Code,
  Database,
  BarChart3,
  Layers,
  Trash2,
  RefreshCw,
  ServerCrash, // For error icon
  Loader2,
  Brain, // For loading state
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { interviewApi, handleApiError, withRetry } from "@/lib/api-utils"; // Using your API utilities
import { useToast } from "@/hooks/use-toast"; // Assuming useToast is set up

// This Interview type should match what your `interviewApi.getAllInterviews()`
// and `interviewApi.getMyInterviews()` will return for each item in the array.
// Crucially, it should include populated candidate details if your UI relies on it.
interface Candidate {
  id: string;
  name: string;
  role?: string | null;
  avatarUrl?: string | null;
}
interface Interview {
  id: string;
  title: string; // From backend Interview model
  domain: string;
  subDomain?: string | null;
  level?: string | null;
  status: string;
  score?: number | null;
  createdAt: string; // From Mongoose timestamps
  updatedAt?: string; // From Mongoose timestamps
  type?: "ai_generated" | "technical" | "behavioral" | "mixed";
  candidateId?: string | null;
  candidate?: Candidate | null; // Populated candidate object
  userId?: string; // ID of the user who created/owns this interview
  date?: string | null; // Scheduled date of the interview
  duration?: number | null;
  // The 'questions' array is usually not needed for a list view,
  // but if your backend includes a count or some summary, you can add it.
  // questions?: Array<{ /* ... */ }>;
}

// Format date helper
const formatDate = (dateString?: string | null): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    // Simplified format for list view, adjust as needed
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (error) {
    return "Invalid Date";
  }
};

// Status badge component (keep as is or import if global)
const StatusBadge = ({ status }: { status: string }) => {
  let variant: "default" | "destructive" | "outline" | "secondary" = "outline";
  let className = "px-2 py-0.5 text-xs ";
  switch (status?.toLowerCase()) {
    case "completed":
      className +=
        "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400 border border-green-200 dark:border-green-600";
      break;
    case "in_progress":
      className +=
        "bg-blue-100 text-blue-700 dark:bg-blue-700/20 dark:text-blue-400 border border-blue-200 dark:border-blue-600";
      break;
    case "scheduled":
      className +=
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-600";
      break;
    case "pending_ai_generation":
      className +=
        "bg-purple-100 text-purple-700 dark:bg-purple-700/20 dark:text-purple-400 border border-purple-200 dark:border-purple-600";
      break;
    case "cancelled":
      className +=
        "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400 border border-red-200 dark:border-red-600";
      variant = "destructive";
      break;
    default:
      className +=
        "bg-gray-100 text-gray-700 dark:bg-gray-700/20 dark:text-gray-400 border border-gray-200 dark:border-gray-600";
  }
  return (
    <Badge variant={variant} className={className}>
      {status?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) ||
        "Unknown"}
    </Badge>
  );
};

// Domain icon component (keep as is or import if global)
const DomainIcon = ({ domain }: { domain: string }) => {
  switch (domain?.toLowerCase()) {
    case "frontend":
      return <Code className="h-5 w-5 text-blue-500" />;
    case "backend":
      return <Database className="h-5 w-5 text-green-500" />;
    case "fullstack":
      return <Layers className="h-5 w-5 text-purple-500" />;
    case "data_science":
    case "data_analytics":
      return <BarChart3 className="h-5 w-5 text-orange-500" />;
    default:
      return <Code className="h-5 w-5 text-gray-500" />;
  }
};

// Available domains and statuses for filters (keep as is)
const availableDomains = [
  {
    value: "frontend",
    label: "Frontend",
    icon: Code,
    color: "text-blue-500",
    description: "React, Vue, Angular, CSS, HTML, JavaScript",
  },
  {
    value: "backend",
    label: "Backend",
    icon: Database,
    color: "text-green-500",
    description: "Node.js, Python, Java, Databases, APIs",
  },
  {
    value: "fullstack",
    label: "Full Stack",
    icon: Layers,
    color: "text-purple-500",
    description: "End-to-end development, Architecture",
  },
  {
    value: "data_science",
    label: "Data Science",
    icon: BarChart3,
    color: "text-orange-500",
    description: "SQL, Python, ML, Stats, Visualization",
  },
];
const availableStatuses = [
  { value: "all", label: "All Statuses" },
  { value: "scheduled", label: "Scheduled" },
  { value: "pending_ai_generation", label: "Pending AI" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function InterviewsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status: sessionStatus } = useSession();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [domainFilter, setDomainFilter] = useState("all");
  const [interviews, setInterviews] = useState<Interview[]>([]); // State holds the mapped Interview type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api"; // Not needed if using interviewApi

  const fetchInterviews = useCallback(async () => {
    if (sessionStatus !== "authenticated" || !session?.user) {
      setLoading(false); // Stop loading if no user to fetch for
      return;
    }

    setLoading(true);
    setError(null);
    try {
      let fetchedData: Interview[]; // This will be of the more detailed Interview type from backend

      if (session.user.role === "admin") {
        console.log("Fetching all interviews for admin...");
        fetchedData = await withRetry(() => interviewApi.getAllInterviews());
      } else {
        // Non-admin user, fetch only their interviews
        if (!session.user.id) {
          throw new Error("User ID not found in session.");
        }
        console.log(`Fetching interviews for user ID: ${session.user.id}`);
        fetchedData = await withRetry(() =>
          interviewApi.getMyInterviews(session.user.id!)
        );
      }

      console.log("Fetched interviews from API:", fetchedData);
      setInterviews(fetchedData || []); // Ensure it's an array, backend should return array
    } catch (err: any) {
      console.error("Error fetching interviews:", err);
      const errorMessage = handleApiError(err, () => {}); // Don't set page error directly for now
      setError(
        errorMessage ||
          "An unexpected error occurred while fetching interviews."
      );
      toast({
        title: "Fetch Error",
        description: errorMessage || "Could not load interviews.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [session, sessionStatus, toast]); // Add session and sessionStatus to dependencies

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      fetchInterviews();
    } else if (sessionStatus === "unauthenticated") {
      router.push("/auth/login"); // Redirect if not authenticated
    }
  }, [sessionStatus, fetchInterviews, router]); // fetchInterviews and router added

  const handleDeleteInterview = async (interviewId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this interview? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      // Use interviewApi for deletion
      await withRetry(() => interviewApi.deleteInterview(interviewId));

      setInterviews((prevInterviews) =>
        prevInterviews.filter((interview) => interview.id !== interviewId)
      );
      toast({
        // Use toast for success message
        title: "Interview Deleted",
        description: "The interview has been successfully deleted.",
        className: "bg-green-500 text-white dark:bg-green-700",
      });
    } catch (err: any) {
      console.error("Error deleting interview:", err);
      const errorMessage = handleApiError(err, () => {});
      toast({
        // Use toast for error message
        title: "Deletion Error",
        description: errorMessage || "Failed to delete the interview.",
        variant: "destructive",
      });
    }
  };

  const filteredInterviews = interviews.filter((interview) => {
    const searchLower = searchTerm.toLowerCase();
    // Ensure properties exist before calling toLowerCase on them
    const titleMatch =
      interview.title && interview.title.toLowerCase().includes(searchLower);
    const domainMatch =
      interview.domain && interview.domain.toLowerCase().includes(searchLower);
    const subDomainMatch =
      interview.subDomain &&
      interview.subDomain.toLowerCase().includes(searchLower);
    const levelMatch =
      interview.level && interview.level.toLowerCase().includes(searchLower);
    const candidateMatch =
      interview.candidate?.name &&
      interview.candidate.name.toLowerCase().includes(searchLower);

    const matchesSearch =
      titleMatch ||
      domainMatch ||
      subDomainMatch ||
      levelMatch ||
      candidateMatch;
    const matchesStatus =
      statusFilter === "all" || interview.status === statusFilter;
    const matchesDomain =
      domainFilter === "all" || interview.domain === domainFilter;

    return matchesSearch && matchesStatus && matchesDomain;
  });

  if (
    sessionStatus === "loading" ||
    (sessionStatus === "authenticated" && loading)
  ) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading interviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
        <ServerCrash className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold text-destructive mb-2">
          Failed to Load Interviews
        </h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchInterviews} disabled={loading}>
          <RefreshCw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Try Again
        </Button>
      </div>
    );
  }

  function getProgressIndicatorColor(score: number): string | undefined {
    if (score >= 80) {
      return "bg-green-500";
    } else if (score >= 50) {
      return "bg-yellow-500";
    } else {
      return "bg-red-500";
    }
  }
  // ----- JSX UI (Your original UI structure, data now comes from `interviews` state) -----
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
            {session?.user?.role === "admin"
              ? "All Interviews"
              : "My Interviews"}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage and review AI-powered and manual technical interviews.
          </p>
        </div>
        <Link href="/dashboard/interviews/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" /> New Interview
          </Button>
        </Link>
      </div>

      {/* Domain Cards (UI remains the same) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {availableDomains.map((domain) => {
          const IconComponent = domain.icon;
          return (
            <Card
              key={domain.value}
              className="hover:shadow-md transition-shadow cursor-pointer dark:bg-slate-850 dark:border-slate-700"
              onClick={() => setDomainFilter(domain.value)}
            >
              <CardHeader className="pb-2 flex-row items-center space-x-3">
                <IconComponent className={`h-6 w-6 ${domain.color}`} />
                <CardTitle className="text-lg font-semibold">
                  {domain.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">
                  {domain.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters (UI remains the same) */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by title, domain, candidate, level..."
            className="pl-10 w-full h-10 dark:bg-slate-800 dark:border-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 md:flex-none">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] h-10 dark:bg-slate-800 dark:border-slate-700">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-800">
              {availableStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={domainFilter} onValueChange={setDomainFilter}>
            <SelectTrigger className="w-full sm:w-[180px] h-10 dark:bg-slate-800 dark:border-slate-700">
              <SelectValue placeholder="Filter by Domain" />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-800">
              <SelectItem value="all">All Domains</SelectItem>
              {availableDomains.map((domain) => (
                <SelectItem key={domain.value} value={domain.value}>
                  {domain.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Interviews Table (Data now from `filteredInterviews` which uses `interviews` state) */}
      <Card className="dark:bg-slate-850 dark:border-slate-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="dark:border-slate-700">
                <TableHead className="w-[150px]">Domain</TableHead>
                <TableHead>Title / Candidate</TableHead>{" "}
                {/* Updated to show candidate too */}
                <TableHead className="hidden md:table-cell">Level</TableHead>
                <TableHead className="hidden lg:table-cell">
                  Date
                </TableHead>{" "}
                {/* Changed from Created */}
                <TableHead>Status</TableHead>
                <TableHead className="w-[120px]">Score</TableHead>
                <TableHead className="text-right w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterviews.length > 0 ? (
                filteredInterviews.map((interview) => (
                  <TableRow
                    key={interview.id}
                    className="dark:border-slate-700"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DomainIcon domain={interview.domain} />
                        <span className="font-medium capitalize">
                          {interview.domain.replace("_", " ")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>{interview.title || "Untitled Interview"}</div>
                      {interview.candidate?.name && (
                        <div className="text-xs text-muted-foreground">
                          Candidate: {interview.candidate.name}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="capitalize hidden md:table-cell">
                      {interview.level || "N/A"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {formatDate(
                        interview.date ||
                          interview.updatedAt ||
                          interview.createdAt
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={interview.status} />
                    </TableCell>
                    <TableCell>
                      {interview.status === "completed" &&
                      typeof interview.score === "number" ? (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {interview.score}
                          </span>
                          <Progress
                            value={interview.score}
                            className="h-2 w-16 bg-muted/20"
                            indicatorClassName={getProgressIndicatorColor(
                              interview.score
                            )}
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {interview.status === "completed" ? "N/S" : "Pending"}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            aria-label="Open menu"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-56 dark:bg-slate-800 dark:border-slate-700"
                        >
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="dark:bg-slate-700" />
                          {interview.status !== "completed" &&
                            interview.status !== "cancelled" && (
                              <Link
                                href={`/dashboard/interviews/${interview.id}/${
                                  interview.type === "ai_generated"
                                    ? "setup"
                                    : "conduct"
                                }`}
                              >
                                <DropdownMenuItem className="cursor-pointer">
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>
                                    {interview.status === "scheduled" ||
                                    interview.status === "pending_ai_generation"
                                      ? "Setup / Start"
                                      : "Continue"}
                                  </span>
                                </DropdownMenuItem>
                              </Link>
                            )}
                          {interview.status === "completed" && (
                            <Link
                              href={`/dashboard/interviews/${interview.id}/results`}
                            >
                              <DropdownMenuItem className="cursor-pointer">
                                <BarChart3 className="mr-2 h-4 w-4" />
                                <span>View Results</span>
                              </DropdownMenuItem>
                            </Link>
                          )}
                          {interview.status === "completed" && ( // Analysis link
                            <Link
                              href={`/dashboard/interviews/${interview.id}/analysis`}
                            >
                              <DropdownMenuItem className="cursor-pointer">
                                <Brain className="mr-2 h-4 w-4" />
                                <span>View Analysis</span>
                              </DropdownMenuItem>
                            </Link>
                          )}
                          {/* Add Edit Link if applicable */}
                          {/* <Link href={`/dashboard/interviews/${interview.id}/edit`}>
                            <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" />Edit Details</DropdownMenuItem>
                          </Link> */}
                          <DropdownMenuSeparator className="dark:bg-slate-700" />
                          <DropdownMenuItem
                            className="text-red-600 hover:!bg-red-100 dark:hover:!bg-red-900/50 hover:!text-red-700 dark:hover:!text-red-500 cursor-pointer"
                            onClick={() => handleDeleteInterview(interview.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Interview</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Layers className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="mb-2 font-semibold">No interviews found.</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your filters or create a new interview.
                      </p>
                      <Button className="mt-6" size="sm" asChild>
                        <Link href="/dashboard/interviews/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Start a New Interview
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {filteredInterviews.length > 0 && (
          <CardFooter className="py-4 text-xs text-muted-foreground dark:border-slate-700">
            Showing {filteredInterviews.length} of {interviews.length}{" "}
            interviews.
            {session?.user?.role !== "admin" &&
              " (Only showing interviews created by you)"}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
