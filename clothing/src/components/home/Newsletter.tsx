import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real application, this would send the email to a server
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-primary-50">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center" data-aos="fade-up">
          <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-3">Stay Connected</h2>
          <p className="text-dark-600 mb-8">
            Subscribe to our newsletter for exclusive previews, styling insights, and early access to new collections.
          </p>

          {submitted ? (
            <div className="bg-white p-6 rounded-sm border border-primary-100 shadow-sm animate-fade-in">
              <p className="text-primary-800">Thank you for subscribing to our newsletter!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="group">
              <div className="relative flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="bg-dark-950 text-white px-6 py-3 text-sm uppercase tracking-wider font-medium hover:bg-primary-800 transition-colors flex-shrink-0"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-dark-500 text-xs mt-3 text-left">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;