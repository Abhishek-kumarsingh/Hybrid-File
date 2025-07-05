/**
 * API Utilities for Interview System
 */
import { log } from "console";
import { getSession } from "next-auth/react"; // Import getSession for client-side token retrieval

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

/**
 * Standard fetch wrapper with error handling and token injection
 */
async function fetchWithErrorHandling(
  endpoint: string, // Should start with '/' e.g., '/api/interviews'
  options: RequestInit = {}
): Promise<any> {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`API Request: ${options.method || "GET"} ${url}`);
  if (options.body && typeof options.body === "string") {
    try {
      const parsedBody = JSON.parse(options.body);
      console.log(`Request Body (parsed):`, parsedBody);
    } catch {
      console.log(`Request Body (raw): ${options.body}`);
    }
  }

  // --- START: Token Injection Logic ---
  const session = await getSession(); // Get current NextAuth session client-side
  let tokenToSend: string | null = null;

  if (session && (session as any).accessToken) {
    // Check for your custom accessToken property
    tokenToSend = (session as any).accessToken;
    console.log("Auth Token found in session, will be sent.");
  } else if (session) {
    // Fallback or alternative: If you are trying to send NextAuth's *own* session token
    // (this is less common for authenticating against a separate backend that doesn't share NextAuth's secret)
    // For this to work, your backend would need to be able to decode and verify NextAuth's JWTs.
    // This part is highly dependent on your specific integrated auth strategy.
    // Most commonly, you'd have a specific `backendAccessToken` from your Express login.
    // console.warn("No specific 'accessToken' found in session. If backend expects NextAuth JWT, this might work.");
    // If you stringify the whole session token: tokenToSend = JSON.stringify(session.jwt); // This is usually not what you send
  }
  // --- END: Token Injection Logic ---

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    // Add Authorization header if token exists
    if (tokenToSend) {
      headers["Authorization"] = `Bearer ${tokenToSend}`;
    }

    const response = await fetch(url, {
      ...options,
      headers, // Use the modified headers object
    });

    console.log(`API Response status: ${response.status} for ${url}`);

    if (response.status === 204) {
      return null;
    }

    let data;
    try {
      data = await response.json();
    } catch (e) {
      if (response.ok) {
        console.warn(
          `API Warning: Response from ${url} was not valid JSON, but status was ${response.status}.`
        );
        throw new Error(
          `Received non-JSON response from server (status ${response.status})`
        );
      }
      const errorMessage = `API request failed with status ${response.status}, and response was not valid JSON.`;
      console.error(
        "API Error Data (not JSON):",
        await response.text().catch(() => "Could not read error response text.")
      );
      console.error(`API Error for ${url}: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    if (!response.ok) {
      const errorMessage =
        data?.message ||
        data?.error ||
        `API request failed with status ${response.status}`;
      console.error("API Error Data (JSON parsed):", data);
      console.error(`API Error for ${url}: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    return data;
  } catch (error: any) {
    console.error(
      `Critical error in API call to ${url}: ${error.message}`,
      error
    );
    throw new Error(
      error.message ||
        `Network error or an unexpected issue occurred with the API call to ${url}`
    );
  }
}

/**
 * Interview API functions
 */
export const interviewApi = {
  // GET /api/interviews
  getAllInterviews: () => {
    console.log("Fetching all interviews");
    return fetchWithErrorHandling(`/api/interviews`);
  },

  // GET /api/interviews/:id
  getInterview: (id: string) => {
    return fetchWithErrorHandling(`/api/interviews/${id}`);
  },
  getMyInterviews: (userId: string) => {
    return fetchWithErrorHandling(`/api/interviews/user/${userId}`);
  },
  getSampleInterview: (id: string) => {
    return fetchWithErrorHandling(`/api/interviews/${id}?sample=true`);
  },

  // POST /api/interviews
  createInterview: (data: Record<string, any>) => {
    return fetchWithErrorHandling(`/api/interviews`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // PUT /api/interviews/:id
  updateInterview: (id: string, data: Record<string, any>) => {
    return fetchWithErrorHandling(`/api/interviews/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // DELETE /api/interviews/:id
  deleteInterview: (id: string) => {
    return fetchWithErrorHandling(`/api/interviews/${id}`, {
      method: "DELETE",
    });
  },

  // GET /api/interviews/:id/questions (for non-AI interviews with distinct questions)
  getQuestions: (interviewId: string) => {
    return fetchWithErrorHandling(`/api/interviews/${interviewId}/questions`);
  },

  // POST /api/interviews/:id/generate-ai-questions (for AI interview setup)
  generateAiQuestions: async (interviewId: string, numQuestions?: number) => {
    const responseData = await fetchWithErrorHandling(
      `/api/interviews/${interviewId}/generate-ai-questions`,
      {
        method: "POST",
        body: JSON.stringify({ numQuestions }),
      }
    );
    if (
      responseData &&
      typeof responseData === "object" &&
      responseData.interview
    ) {
      return responseData.interview;
    }
    console.warn(
      "generateAiQuestions: Response structure unexpected, returning raw.",
      responseData
    );
    return responseData;
  },

  // POST /api/interviews/:interviewId/responses (for non-AI interviews, distinct responses)
  submitResponse: (
    interviewId: string,
    questionId: string,
    content: string
  ) => {
    return fetchWithErrorHandling(`/api/interviews/${interviewId}/responses`, {
      method: "POST",
      body: JSON.stringify({ questionId, content }),
    });
  },

  // POST /api/interviews/:interviewId/ai-answer/:questionIndex (for AI interviews)
  submitAiAnswer: (
    interviewId: string,
    questionIndex: number,
    answerContent: string
  ) => {
    return fetchWithErrorHandling(
      `/api/interviews/${interviewId}/ai-answer/${questionIndex}`,
      {
        method: "POST",
        body: JSON.stringify({ answer: answerContent }),
      }
    );
  },

  getResponses: (interviewId: string) => {
    return fetchWithErrorHandling(`/api/interviews/${interviewId}/responses`);
  },

  // POST /api/interviews/:id/finalize (to complete interview & get overall feedback)
  // NOTE: The route in your provided file was /finalize-ai-interview, I changed it to /finalize to match a previous suggestion.
  // If your backend is /finalize-ai-interview, change it here.
  finalizeInterview: (interviewId: string) => {
    return fetchWithErrorHandling(`/api/interviews/${interviewId}/finalize`, {
      method: "POST",
    });
  },

  // For regenerating overall feedback
  generateFeedback: async (interviewId: string) => {
    const responseData = await fetchWithErrorHandling(
      `/api/interviews/${interviewId}/generate-overall-feedback`,
      { method: "POST" }
    );
    // Assuming this also returns the full interview object, or an object containing it.
    if (
      responseData &&
      typeof responseData === "object" &&
      responseData.interview
    ) {
      return responseData.interview;
    }
    // If your backend returns the interview directly for this specific endpoint:
    // return responseData;
    console.warn(
      "generateFeedback: Response structure unexpected, returning raw.",
      responseData
    );
    return responseData;
  },

  getAiResponse: (interviewId: string, userMessage: string) => {
    return fetchWithErrorHandling(
      `/api/interviews/${interviewId}/ai-response`,
      { method: "POST", body: JSON.stringify({ userMessage }) }
    );
  },

  getMessages: (interviewId: string) => {
    return fetchWithErrorHandling(`/api/interviews/${interviewId}/messages`);
  },

  addMessage: (interviewId: string, content: string, role: string) => {
    return fetchWithErrorHandling(`/api/interviews/${interviewId}/messages`, {
      method: "POST",
      body: JSON.stringify({ content, role }),
    });
  },

  // Analytics Endpoints
  getAnalyticsOverview: (filters?: { domain?: string; timeframe?: string }) => {
    const queryParams = new URLSearchParams(
      filters as Record<string, string>
    ).toString();
    return fetchWithErrorHandling(
      `/api/analytics/overview${queryParams ? `?${queryParams}` : ""}`
    );
  },
  getSkillsAnalysis: (filters?: { domain?: string; timeframe?: string }) => {
    const queryParams = new URLSearchParams(
      filters as Record<string, string>
    ).toString();
    return fetchWithErrorHandling(
      `/api/analytics/skills${queryParams ? `?${queryParams}` : ""}`
    );
  },
  getDomainPerformance: (filters?: { domain?: string; timeframe?: string }) => {
    const queryParams = new URLSearchParams(
      filters as Record<string, string>
    ).toString();
    return fetchWithErrorHandling(
      `/api/analytics/domains${queryParams ? `?${queryParams}` : ""}`
    );
  },
  getRecentCompletedInterviews: (filters?: {
    domain?: string;
    timeframe?: string;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams(
      filters as Record<string, string>
    ).toString();
    return fetchWithErrorHandling(
      `/api/interviews?status=completed&sort=-updatedAt${
        queryParams ? `&${queryParams}` : ""
      }`
    );
  },
  getAllCandidates: () => {
    return fetchWithErrorHandling(`/api/candidates`);
  },
};

// handleApiError and withRetry functions remain the same as your provided code
export function handleApiError(
  error: any,
  setError?: (errorMsg: string | null) => void
): string {
  console.error("API Error caught by handleApiError:", error);
  let errorMessage = "An unknown error occurred. Please try again.";

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else if (error && typeof error.message === "string") {
    errorMessage = error.message;
  }

  if (setError) {
    setError(errorMessage);
  }
  return errorMessage;
}

export async function withRetry<T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 2,
  retryDelay: number = 1000
): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      attempt++;
      if (attempt > 1)
        console.log(`API Call: Attempt ${attempt} of ${maxRetries + 1}`);
      return await apiCall();
    } catch (err: any) {
      console.warn(`API Call Attempt ${attempt} failed: ${err.message}`);
      if (attempt > maxRetries) {
        console.error("Max retries reached. Throwing last error for API call.");
        throw err;
      }
      const delay = retryDelay * Math.pow(2, attempt - 1);
      console.log(`Waiting ${Math.min(delay, 5000)}ms before next retry...`);
      await new Promise((resolve) =>
        setTimeout(resolve, Math.min(delay, 5000))
      );
    }
  }
}
