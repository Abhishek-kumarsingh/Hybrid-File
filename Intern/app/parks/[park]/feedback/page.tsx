"use client";

import { navItems } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Footer from "@/components/Footer";
import ParkRating from "@/components/ParkRating";
import { useEffect, useState } from "react";
import { Park } from "@/types/types";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface FeedbackPageProps {
  params: {
    park: string;
  };
}

const FeedbackPage = ({ params }: FeedbackPageProps) => {
  const [parkData, setParkData] = useState<Park | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLocationClick = () => {
    console.log("Location clicked!");
  };

  useEffect(() => {
    const fetchParkData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/parks/park?url=${params.park}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Error fetching park data');
        }

        const data = await res.json();
        setParkData(data);
      } catch (error) {
        console.error('Error fetching park data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.park) {
      fetchParkData();
    }
  }, [params.park]);

  const handleSubmitRating = (rating: number, review: string) => {
    console.log("Rating submitted:", rating, review);
    // Here you would typically send this data to your API
  };

  const handleSubmitFeedback = (feedback: string, isPositive: boolean) => {
    console.log("Feedback submitted:", feedback, isPositive ? "Positive" : "Negative");
    // Here you would typically send this data to your API
  };

  return (
    <main className="relative bg-background text-foreground flex justify-center items-center flex-col overflow-hidden mx-auto">
      {/* Fixed navigation */}
      <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />

      {/* Page header */}
      <div className="w-full bg-green-500/5 dark:bg-gray-800/30 py-16 mt-16">
        <div className="container-section">
          <Link
            href={`/parks/${params.park}`}
            className="inline-flex items-center gap-2 text-green-500 hover:underline mb-4"
          >
            <FaArrowLeft size={14} />
            <span>Back to Park Details</span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold">Rate & Feedback</h1>
          <p className="text-muted-foreground mt-2">
            Share your experience and help us improve
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full py-8">
        {isLoading ? (
          <div className="container-section">
            <div className="animate-pulse space-y-4">
              <div className="h-32 bg-muted rounded-lg w-full"></div>
              <div className="h-64 bg-muted rounded-lg w-full"></div>
            </div>
          </div>
        ) : parkData ? (
          <ParkRating
            park={parkData}
            onSubmitRating={handleSubmitRating}
            onSubmitFeedback={handleSubmitFeedback}
          />
        ) : (
          <ScrollReveal>
            <div className="container-section">
              <div className="card-modern p-8 text-center">
                <h2 className="text-xl font-semibold mb-4">Park Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't find the park you're looking for. It may have been removed or the URL might be incorrect.
                </p>
                <Link href="/">
                  <button className="btn-primary">
                    Explore Other Parks
                  </button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Additional information */}
      <ScrollReveal>
        <div className="container-section py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-modern p-6">
              <h3 className="text-lg font-semibold mb-3">Why Your Feedback Matters</h3>
              <p className="text-muted-foreground">
                Your feedback helps the Delhi Development Authority improve park facilities and services.
                We use this information to prioritize maintenance and development projects.
              </p>
            </div>

            <div className="card-modern p-6">
              <h3 className="text-lg font-semibold mb-3">What Happens Next</h3>
              <p className="text-muted-foreground">
                All feedback is reviewed by our park management team. Issues are addressed based on
                priority, and suggestions are considered for future improvements.
              </p>
            </div>

            <div className="card-modern p-6">
              <h3 className="text-lg font-semibold mb-3">Contact Directly</h3>
              <p className="text-muted-foreground mb-4">
                For urgent matters or specific inquiries, you can contact our park management team directly.
              </p>
              <Link href="/contact">
                <button className="btn-outline w-full">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default FeedbackPage;
