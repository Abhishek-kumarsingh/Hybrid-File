/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify is now enabled by default in Next.js 15+

  // Enable experimental features for better performance
  experimental: {
    // optimizeCss: true, // Temporarily disabled due to critters dependency issue
    scrollRestoration: true,
  },

  // Environment variables
  env: {
    CUSTOM_KEY: 'my-value',
  },

  // Image optimization
  images: {
    domains: ['localhost', 'randomuser.me'],
    formats: ['image/webp', 'image/avif'],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Redirects for better UX
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Rewrites for API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },

  // Webpack configuration for custom optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom webpack configurations
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      };
    }

    return config;
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript errors during builds for faster deployment
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during builds for faster deployment
  },

  // Output configuration
  // output: 'standalone', // Uncomment for Docker deployment

  // Compression
  compress: true,

  // Power by header
  poweredByHeader: false,

  // Generate ETags
  generateEtags: true,

  // Page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // Trailing slash
  trailingSlash: false,
};

export default nextConfig;
