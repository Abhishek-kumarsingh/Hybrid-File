"use client";

import { navItems } from "@/data";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheck } from "react-icons/fa";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

// Import our modern components
import ModernSection from "@/components/ui/design-system/ModernSection";
import ModernText from "@/components/ui/design-system/ModernText";
import ModernGrid from "@/components/ui/design-system/ModernGrid";
import AnimatedText from "@/components/ui/design-system/AnimatedText";

// Contact information
const contactInfo = [
  {
    icon: <FaMapMarkerAlt className="text-green-600 text-2xl" />,
    title: "Address",
    details: "Vikas Sadan, INA, New Delhi - 110023",
  },
  {
    icon: <FaPhone className="text-green-600 text-2xl" />,
    title: "Phone",
    details: "+91-11-24661599",
  },
  {
    icon: <FaEnvelope className="text-green-600 text-2xl" />,
    title: "Email",
    details: "parks@dda.org.in",
  },
  {
    icon: <FaClock className="text-green-600 text-2xl" />,
    title: "Office Hours",
    details: "Monday to Friday: 9:30 AM - 6:00 PM",
  },
];

// FAQ items
const faqItems = [
  {
    question: "How can I report an issue in a DDA park?",
    answer: "You can report issues through our helpline, email, or by using the feedback form on this website. Please provide specific details about the location and nature of the issue.",
  },
  {
    question: "Are dogs allowed in DDA parks?",
    answer: "Most DDA parks allow leashed dogs, but some parks may have restrictions. Please check the specific park's rules before visiting with your pet.",
  },
  {
    question: "Can I book a DDA park for an event?",
    answer: "Yes, certain areas in some DDA parks can be booked for events. Please contact our office with details of your event for booking information and fees.",
  },
  {
    question: "Are there any entry fees for DDA parks?",
    answer: "Most neighborhood parks are free to enter. Some larger parks or special facilities within parks may have nominal entry fees.",
  },
  {
    question: "What are the opening hours of DDA parks?",
    answer: "Most DDA parks are open from 5:00 AM to 8:00 PM daily. Hours may vary seasonally and for specific parks.",
  },
];

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const handleLocationClick = () => {
    console.log("Location clicked!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1000);
  };

  return (
    <main className="relative bg-background text-foreground flex justify-center items-center flex-col overflow-hidden mx-auto">
      {/* Fixed navigation */}
      <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />

      {/* Hero section */}
      <Hero />

      {/* Main content with container styling */}
      <div className="w-full">
        {/* Contact Introduction */}
        <ModernSection 
          id="contact-intro" 
          withPattern={true} 
          animationEffect="fade-up" 
          animationDelay={0}
          className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10"
        >
          <div className="text-center mb-10">
            <AnimatedText 
              text="Contact Us" 
              as="h2" 
              className="text-4xl font-bold mb-4" 
              animation="gradient"
              color="primary"
            />
            <ModernText as="p" size="lg" color="muted" className="mt-4 max-w-3xl mx-auto" animationDelay={2}>
              Get in touch with the Delhi Development Authority Parks Division. We're here to help with your inquiries and feedback.
            </ModernText>
          </div>
        </ModernSection>

        {/* Contact Information and Form */}
        <ModernSection 
          id="contact-details" 
          withGradient={false} 
          animationEffect="fade-up" 
          animationDelay={0}
          paddingY="xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div data-aos="fade-right">
              <ModernText as="h3" size="2xl" weight="bold" className="mb-6">
                Contact Information
              </ModernText>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div 
                    key={item.title} 
                    className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="mr-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <ModernText as="h4" size="lg" weight="semibold">
                        {item.title}
                      </ModernText>
                      <ModernText as="p" color="muted" className="mt-1">
                        {item.details}
                      </ModernText>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-100 dark:border-green-900/30" data-aos="fade-up">
                <ModernText as="h4" size="xl" weight="bold" className="mb-3">
                  Office Location
                </ModernText>
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  {/* Placeholder for map - in a real implementation, you would use Google Maps or similar */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <ModernText as="p" color="muted">
                      Map would be displayed here
                    </ModernText>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div data-aos="fade-left">
              <ModernText as="h3" size="2xl" weight="bold" className="mb-6">
                Send Us a Message
              </ModernText>
              
              {submitted ? (
                <div className="p-8 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center" data-aos="fade-up">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full mb-4">
                    <FaCheck className="text-green-600 dark:text-green-300 text-2xl" />
                  </div>
                  <ModernText as="h4" size="xl" weight="bold" className="mb-2">
                    Thank You!
                  </ModernText>
                  <ModernText as="p" size="lg" className="mb-4">
                    Your message has been sent successfully.
                  </ModernText>
                  <ModernText as="p" color="muted">
                    We'll get back to you as soon as possible.
                  </ModernText>
                  <button 
                    className="mt-6 py-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" data-aos="fade-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </ModernSection>

        {/* FAQ Section */}
        <ModernSection 
          id="faq" 
          withPattern={true} 
          animationEffect="fade-up" 
          animationDelay={0}
          className="bg-dot-pattern"
        >
          <ModernText as="h2" size="3xl" weight="bold" align="center" className="mb-10" animationDelay={1}>
            Frequently Asked Questions
          </ModernText>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <button
                  className="w-full p-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 flex justify-between items-center"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <ModernText as="h3" size="lg" weight="medium">
                    {item.question}
                  </ModernText>
                  <span className="text-green-600 dark:text-green-400 transition-transform duration-300 transform">
                    {expandedFaq === index ? "−" : "+"}
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                    <ModernText as="p" color="muted">
                      {item.answer}
                    </ModernText>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ModernSection>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default ContactPage;
