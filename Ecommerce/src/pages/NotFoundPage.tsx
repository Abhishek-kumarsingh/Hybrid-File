import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container py-16 text-center" data-aos="fade-up">
      <div className="max-w-lg mx-auto">
        <h1 className="text-6xl font-display font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn-primary py-3">
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          <button 
            className="btn-outline py-3"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;