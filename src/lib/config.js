// Environment configuration utility
// This file centralizes all environment variable access

const config = {
  // API Configuration
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
  
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // API Endpoints
  endpoints: {
    auth: {
      me: '/api/me',
      logout: '/auth/logout',
      googleOAuth: '/api/auth/google',
    },
    student: {
      base: '/api/student',
      profile: '/api/student/profile',
      campaigns: '/api/student/campaigns',
      analytics: '/api/student/analytics',
    },
    admin: {
      base: '/api/admin',
      students: '/api/admin/students',
      campaigns: '/api/admin/campaigns',
      reports: '/api/admin/reports',
      settings: '/api/admin/settings',
    }
  },
  
  // Helper functions
  getApiUrl: (endpoint) => `${config.apiBaseUrl}${endpoint}`,
  getBackendUrl: (endpoint) => `${config.backendUrl}${endpoint}`,
};

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_API_BASE_URL',
  'NEXT_PUBLIC_BACKEND_URL'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0 && typeof window === 'undefined') {
  console.warn('⚠️ Missing environment variables:', missingEnvVars);
  console.warn('📝 Please check your .env.local file');
}

export default config;