"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaFilter, FaSearch, FaExclamationTriangle, FaLightbulb, FaBug, FaThumbsUp, FaUser, FaCalendarAlt, FaTag, FaCheck, FaTimes } from "react-icons/fa";
import ModernText from "@/components/ui/design-system/ModernText";
import ModernSection from "@/components/ui/design-system/ModernSection";
import LoadingSpinner from "@/components/ui/design-system/LoadingSpinner";
import UserTestingControls from "@/components/ui/design-system/UserTestingControls";

interface FeedbackItem {
  _id: string;
  type: 'usability' | 'feature' | 'bug' | 'suggestion' | 'general';
  rating?: number;
  message: string;
  page: string;
  email?: string;
  name?: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'resolved' | 'archived';
  metadata?: Record<string, any>;
}

const FeedbackDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<{
    type: string | null;
    status: string | null;
    search: string;
  }>({
    type: null,
    status: null,
    search: "",
  });

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const itemsPerPage = 20;

  // Fetch feedback data
  const fetchFeedback = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let url = `/api/feedback?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`;

      if (filter.type) url += `&type=${filter.type}`;
      if (filter.status) url += `&status=${filter.status}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }

      const data = await response.json();
      setFeedback(data.feedback);
      setTotalItems(data.pagination.total);
      setHasMore(data.pagination.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Update feedback status
  const updateFeedbackStatus = async (id: string, status: 'reviewed' | 'resolved' | 'archived') => {
    try {
      const response = await fetch(`/api/feedback/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update feedback status');
      }

      // Update local state
      setFeedback(prev =>
        prev.map(item =>
          item._id === id ? { ...item, status } : item
        )
      );
    } catch (err) {
      console.error('Error updating feedback status:', err);
    }
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({ ...prev, search: e.target.value }));
  };

  // Handle filter change
  const handleFilterChange = (filterType: 'type' | 'status', value: string | null) => {
    setFilter(prev => ({ ...prev, [filterType]: value }));
    setPage(1); // Reset to first page when filter changes
  };

  // Load data on mount and when filters change
  useEffect(() => {
    fetchFeedback();
  }, [page, filter.type, filter.status]);

  // Check authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin?callbackUrl=/feedback-dashboard');
    }
  }, [status, router]);

  // Filter feedback by search term
  const filteredFeedback = feedback.filter(item => {
    if (!filter.search) return true;

    const searchTerm = filter.search.toLowerCase();
    return (
      item.message.toLowerCase().includes(searchTerm) ||
      item.page.toLowerCase().includes(searchTerm) ||
      (item.name && item.name.toLowerCase().includes(searchTerm)) ||
      (item.email && item.email.toLowerCase().includes(searchTerm))
    );
  });

  // Get icon for feedback type
  const getTypeIcon = (type: FeedbackItem['type']) => {
    switch (type) {
      case 'bug':
        return <FaBug className="text-red-500" />;
      case 'feature':
        return <FaLightbulb className="text-yellow-500" />;
      case 'usability':
        return <FaUser className="text-blue-500" />;
      case 'suggestion':
        return <FaThumbsUp className="text-green-500" />;
      default:
        return <FaExclamationTriangle className="text-gray-500" />;
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect in useEffect
  }

  return (
    <main className="min-h-screen bg-background">
      <ModernSection
        id="feedback-dashboard"
        title="User Feedback Dashboard"
        subtitle="Review and manage user feedback and testing results"
        paddingY="lg"
      >
        {/* User Testing Controls */}
        <div className="mb-6">
          <UserTestingControls className="mb-6" />
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={filter.search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <select
                value={filter.type || ''}
                onChange={(e) => handleFilterChange('type', e.target.value || null)}
                className="appearance-none pl-4 pr-8 py-2 border border-border rounded-md bg-background"
              >
                <option value="">All Types</option>
                <option value="usability">Usability</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="suggestion">Suggestion</option>
                <option value="general">General</option>
              </select>
              <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={filter.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value || null)}
                className="appearance-none pl-4 pr-8 py-2 border border-border rounded-md bg-background"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="resolved">Resolved</option>
                <option value="archived">Archived</option>
              </select>
              <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Feedback List */}
        {isLoading ? (
          <div className="py-12 flex justify-center">
            <LoadingSpinner size="lg" text="Loading feedback..." />
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
            <ModernText as="p" size="lg" color="error">
              {error}
            </ModernText>
          </div>
        ) : filteredFeedback.length === 0 ? (
          <div className="py-12 text-center">
            <ModernText as="p" size="lg" color="muted">
              No feedback found matching your criteria.
            </ModernText>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFeedback.map((item) => (
              <div
                key={item._id}
                className="border border-border rounded-lg p-4 bg-card hover:bg-card/80 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <ModernText as="span" weight="semibold" className="capitalize">
                      {item.type}
                    </ModernText>
                    {item.rating && (
                      <div className="ml-2 px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded text-xs font-medium">
                        Rating: {item.rating}/5
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      item.status === 'new' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                      item.status === 'reviewed' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' :
                      item.status === 'resolved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                      'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <ModernText as="p" className="mb-3">
                  {item.message}
                </ModernText>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt size={12} />
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaTag size={12} />
                    <span>{item.page}</span>
                  </div>
                  {item.name && (
                    <div className="flex items-center gap-1">
                      <FaUser size={12} />
                      <span>{item.name}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-2">
                  {item.status === 'new' && (
                    <button
                      onClick={() => updateFeedbackStatus(item._id, 'reviewed')}
                      className="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800/30"
                    >
                      <FaCheck className="inline mr-1" /> Mark as Reviewed
                    </button>
                  )}
                  {(item.status === 'new' || item.status === 'reviewed') && (
                    <button
                      onClick={() => updateFeedbackStatus(item._id, 'resolved')}
                      className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-800/30"
                    >
                      <FaCheck className="inline mr-1" /> Mark as Resolved
                    </button>
                  )}
                  <button
                    onClick={() => updateFeedbackStatus(item._id, 'archived')}
                    className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <FaTimes className="inline mr-1" /> Archive
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalItems > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, totalItems)} of {totalItems} items
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border border-border rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={!hasMore}
                className="px-3 py-1 border border-border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </ModernSection>
    </main>
  );
};

export default FeedbackDashboard;
