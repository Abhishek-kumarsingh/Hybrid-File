"use client";

import { navItems } from "@/data";
import { useState } from "react";
import { FaLeaf, FaTree, FaQuestion, FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaShieldAlt, FaAccessibleIcon } from "react-icons/fa";
import { cn } from "@/lib/utils"; // Import the cn utility function

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

// Import our modern components
import ModernSection from "@/components/ui/design-system/ModernSection";
import ModernText from "@/components/ui/design-system/ModernText";
import AnimatedText from "@/components/ui/design-system/AnimatedText";
import Accordion from "@/components/ui/design-system/Accordion";

// FAQ categories
const categories = [
  { id: "general", name: "General Information", icon: <FaQuestion className="text-blue-500" /> },
  { id: "visiting", name: "Visiting Parks", icon: <FaMapMarkerAlt className="text-green-500" /> },
  { id: "events", name: "Events & Activities", icon: <FaCalendarAlt className="text-amber-500" /> },
  { id: "rules", name: "Rules & Regulations", icon: <FaShieldAlt className="text-red-500" /> },
  { id: "accessibility", name: "Accessibility", icon: <FaAccessibleIcon className="text-purple-500" /> },
];

// FAQ items by category
const faqItems = {
  general: [
    {
      id: "g1",
      title: "How many parks does DDA manage?",
      content: "The Delhi Development Authority (DDA) manages approximately 800 parks and gardens across Delhi, ranging from small neighborhood parks to large district parks and biodiversity zones.",
      category: "General",
    },
    {
      id: "g2",
      title: "What is the difference between a district park and a neighborhood park?",
      content: "District parks are larger parks (typically 25 acres or more) that serve multiple neighborhoods and offer a wider range of facilities including sports areas, water bodies, and specialized gardens. Neighborhood parks are smaller (typically 1-5 acres) and primarily serve the immediate residential area with basic recreational facilities.",
      category: "General",
    },
    {
      id: "g3",
      title: "How can I contact DDA about park-related issues?",
      content: "You can contact DDA's Parks Division through our helpline at +91-11-24661599, via email at parks@dda.org.in, or by visiting our office at Vikas Sadan, INA, New Delhi. You can also use the contact form on our website.",
      category: "General",
    },
    {
      id: "g4",
      title: "Does DDA offer employment opportunities in park maintenance?",
      content: "Yes, DDA regularly hires for various positions related to park development and maintenance. All job openings are posted on our official website and advertised in national newspapers. Applications must be submitted through our official recruitment portal.",
      category: "General",
    },
  ],
  visiting: [
    {
      id: "v1",
      title: "What are the typical opening hours of DDA parks?",
      content: "Most DDA parks are open from 5:00 AM to 8:00 PM daily. However, hours may vary seasonally and for specific parks. Some specialized parks or facilities within parks may have different operating hours.",
      category: "Visiting",
    },
    {
      id: "v2",
      title: "Are there entry fees for DDA parks?",
      content: "Most neighborhood parks are free to enter. Some larger parks or special facilities within parks may have nominal entry fees. District parks typically charge Rs. 10-20 per person, while specialized gardens or facilities may have separate fee structures.",
      category: "Visiting",
    },
    {
      id: "v3",
      title: "Are dogs allowed in DDA parks?",
      content: "Most DDA parks allow leashed dogs, but some parks may have restrictions or designated dog-friendly areas. Please check the specific park's rules before visiting with your pet. All pet owners are required to clean up after their pets.",
      category: "Visiting",
    },
    {
      id: "v4",
      title: "Are there parking facilities at DDA parks?",
      content: "Larger district parks typically have designated parking areas, though capacity may be limited during peak hours and weekends. Neighborhood parks generally do not have dedicated parking facilities. We encourage visitors to use public transportation when possible.",
      category: "Visiting",
    },
  ],
  events: [
    {
      id: "e1",
      title: "Can I book a DDA park for a private event?",
      content: "Yes, certain areas in some DDA parks can be booked for events such as community gatherings, cultural programs, or small private functions. Bookings must be made at least 15 days in advance through our office. Fees vary based on the park, area size, and event type.",
      category: "Events",
    },
    {
      id: "e2",
      title: "Does DDA organize events in parks?",
      content: "Yes, DDA regularly organizes various events in parks including cultural programs, environmental awareness campaigns, tree plantation drives, and seasonal festivals. These events are announced on our website and social media channels.",
      category: "Events",
    },
    {
      id: "e3",
      title: "Can I conduct yoga or fitness classes in DDA parks?",
      content: "Informal, small group activities like yoga or fitness classes are generally permitted in designated areas without prior permission. However, regular commercial classes or large groups require permission from the park administration.",
      category: "Events",
    },
    {
      id: "e4",
      title: "Are there any restrictions on photography in DDA parks?",
      content: "Personal and casual photography is allowed in all parks. Professional photography, commercial shoots, or filming requires prior permission and may involve a fee. Please contact our office for permission at least 7 days in advance.",
      category: "Events",
    },
  ],
  rules: [
    {
      id: "r1",
      title: "What activities are prohibited in DDA parks?",
      content: "Prohibited activities include: littering, damaging plants or park property, unauthorized vending, consuming alcohol, playing loud music, lighting fires (except in designated barbecue areas), and using plastic bags. Violators may face fines or be asked to leave the premises.",
      category: "Rules",
    },
    {
      id: "r2",
      title: "Can I cycle in DDA parks?",
      content: "Cycling is allowed in most larger parks on designated paths. Some parks have specific cycling tracks. However, cycling may be restricted in certain areas such as specialized gardens or during peak visitor hours for safety reasons.",
      category: "Rules",
    },
    {
      id: "r3",
      title: "Are picnics allowed in DDA parks?",
      content: "Yes, picnics are allowed in designated areas of most parks. However, visitors must clean up after themselves and follow all park rules. Some parks have specific picnic spots with facilities like tables and benches.",
      category: "Rules",
    },
    {
      id: "r4",
      title: "Can I fly drones in DDA parks?",
      content: "Flying drones in DDA parks requires prior permission from both DDA and relevant aviation authorities. Unauthorized drone usage is strictly prohibited for safety and privacy reasons.",
      category: "Rules",
    },
  ],
  accessibility: [
    {
      id: "a1",
      title: "Are DDA parks accessible to people with disabilities?",
      content: "Many DDA parks, especially newer ones and those that have been recently renovated, have accessible features including ramps, accessible pathways, and adapted facilities. We are continuously working to improve accessibility across all our parks.",
      category: "Accessibility",
    },
    {
      id: "a2",
      title: "Are there wheelchair-accessible toilets in DDA parks?",
      content: "Larger district parks and recently developed parks typically have wheelchair-accessible toilets. We are in the process of upgrading facilities in older parks to ensure better accessibility.",
      category: "Accessibility",
    },
    {
      id: "a3",
      title: "Are there sensory gardens in any DDA parks?",
      content: "Yes, some of our specialized parks feature sensory gardens designed to engage all five senses. These include fragrant plants, textured surfaces, sound elements, and plants with interesting visual characteristics.",
      category: "Accessibility",
    },
    {
      id: "a4",
      title: "How can I request accessibility accommodations for an event in a DDA park?",
      content: "When booking a park for an event, please specify any accessibility requirements. Our team will work with you to accommodate these needs to the best of our ability. Please make such requests at least 15 days in advance.",
      category: "Accessibility",
    },
  ],
};

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("general");

  const handleLocationClick = () => {
    console.log("Location clicked!");
  };

  // Get FAQ items for the active category
  const activeFaqItems = faqItems[activeCategory as keyof typeof faqItems].map(item => ({
    ...item,
    icon: categories.find(cat => cat.id === activeCategory)?.icon,
  }));

  return (
    <main className="relative bg-background text-foreground flex justify-center items-center flex-col overflow-hidden mx-auto">
      {/* Fixed navigation */}
      <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />

      {/* Hero section */}
      <Hero />

      {/* Main content with container styling */}
      <div className="w-full">
        {/* FAQ Introduction */}
        <ModernSection
          id="faq-intro"
          withPattern={true}
          animationEffect="fade-up"
          animationDelay={0}
          className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10"
        >
          <div className="text-center mb-10">
            <AnimatedText
              text="Frequently Asked Questions"
              as="h2"
              className="text-4xl font-bold mb-4"
              animation="gradient"
              color="primary"
            />
            <ModernText as="p" size="lg" color="muted" className="mt-4 max-w-3xl mx-auto" animationDelay={2}>
              Find answers to common questions about DDA parks, facilities, rules, and services.
            </ModernText>
          </div>
        </ModernSection>

        {/* FAQ Categories */}
        <ModernSection
          id="faq-categories"
          withGradient={false}
          animationEffect="fade-up"
          animationDelay={0}
          paddingY="md"
          className="bg-white dark:bg-gray-900 shadow-sm sticky top-16 z-10"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-colors",
                  activeCategory === category.id
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 font-medium"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </ModernSection>

        {/* FAQ Content */}
        <ModernSection
          id="faq-content"
          withPattern={false}
          animationEffect="fade-up"
          animationDelay={0}
          paddingY="xl"
        >
          <div className="max-w-3xl mx-auto">
            <ModernText as="h2" size="2xl" weight="bold" className="mb-6" animationDelay={1}>
              {categories.find(cat => cat.id === activeCategory)?.name}
            </ModernText>

            <Accordion
              items={activeFaqItems}
              variant="separated"
              allowMultiple={true}
              iconPosition="left"
            />

            <div className="mt-10 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800" data-aos="fade-up">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-800 rounded-full mr-4">
                  <FaQuestion className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <ModernText as="h3" size="lg" weight="bold" className="mb-2">
                    Didn't find what you're looking for?
                  </ModernText>
                  <ModernText as="p" className="mb-4">
                    If you couldn't find the answer to your question, please feel free to contact us directly.
                  </ModernText>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="/contact"
                      className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      Contact Us
                    </a>
                    <a
                      href="tel:+911124661599"
                      className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-lg transition-colors"
                    >
                      Call Helpline
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModernSection>

        {/* Community Support */}
        <ModernSection
          id="community-support"
          withGradient={true}
          animationEffect="fade-up"
          animationDelay={0}
          className="glassmorphism my-8"
        >
          <ModernText as="h2" size="2xl" weight="bold" align="center" className="mb-8" animationDelay={1}>
            Community Support
          </ModernText>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/30 dark:bg-black/30 rounded-xl p-6 backdrop-blur-sm" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mr-4">
                  <FaUserFriends className="text-green-600 text-xl" />
                </div>
                <ModernText as="h3" size="xl" weight="semibold">
                  Volunteer
                </ModernText>
              </div>
              <ModernText as="p" className="mb-4">
                Join our volunteer programs to help maintain and improve parks. Participate in tree planting, clean-up drives, and community events.
              </ModernText>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Join as Volunteer
              </a>
            </div>

            <div className="bg-white/30 dark:bg-black/30 rounded-xl p-6 backdrop-blur-sm" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                  <FaTree className="text-blue-600 text-xl" />
                </div>
                <ModernText as="h3" size="xl" weight="semibold">
                  Adopt a Park
                </ModernText>
              </div>
              <ModernText as="p" className="mb-4">
                Organizations and community groups can adopt a park or a section of a park for maintenance and development through our partnership program.
              </ModernText>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Learn More
              </a>
            </div>

            <div className="bg-white/30 dark:bg-black/30 rounded-xl p-6 backdrop-blur-sm" data-aos="fade-up" data-aos-delay="300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-4">
                  <FaLeaf className="text-amber-600 text-xl" />
                </div>
                <ModernText as="h3" size="xl" weight="semibold">
                  Donate
                </ModernText>
              </div>
              <ModernText as="p" className="mb-4">
                Support our conservation and development efforts through donations. Your contribution helps create and maintain green spaces for everyone.
              </ModernText>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
              >
                Make a Donation
              </a>
            </div>
          </div>
        </ModernSection>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default FAQPage;
