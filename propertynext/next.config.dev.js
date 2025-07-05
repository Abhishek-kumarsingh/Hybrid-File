/** @type {import('next').NextConfig} */
const nextConfig = {
  // Development-specific configurations
  experimental: {
    // Disable some experimental features that might conflict with extensions
    optimizePackageImports: ['react-bootstrap', 'react-icons'],
  },
  
  // Webpack configuration for development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Add source maps for better debugging
      config.devtool = 'eval-source-map';
      
      // Ignore extension-related modules
      config.externals = config.externals || [];
      config.externals.push({
        'chrome-extension': 'chrome-extension'
      });
    }
    
    return config;
  },
  
  // Headers to prevent extension interference
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; img-src 'self' data: blob: https:; font-src 'self' data: https:;"
            },
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN'
            }
          ],
        },
      ];
    }
    return [];
  },
  
  // Image configuration
  images: {
    domains: ['localhost'],
    unoptimized: true, // For development
  },
  
  // Disable x-powered-by header
  poweredByHeader: false,
  
  // React strict mode
  reactStrictMode: true,
  
  // SWC minification
  swcMinify: true,
};

module.exports = nextConfig;
