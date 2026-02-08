# Environment Configuration Guide

## Overview
This project uses environment variables to manage different configurations for development, testing, and production environments.

## Environment Files

### Development (`.env.local`)
Used for local development:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Production (`.env.production`)
Template for production deployment:
```env
NEXT_PUBLIC_API_BASE_URL=https://outmail-backend-using-upstash-redis.onrender.com
NEXT_PUBLIC_BACKEND_URL=https://outmail-backend-using-upstash-redis.onrender.com
NEXT_PUBLIC_FRONTEND_URL=https://your-frontend-domain.com
NODE_ENV=production
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL for API calls | `http://localhost:8000` |
| `NEXT_PUBLIC_BACKEND_URL` | Backend URL for OAuth redirects | `http://localhost:8000` |
| `NEXT_PUBLIC_FRONTEND_URL` | Frontend URL for OAuth callbacks | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## Usage

### Local Development
1. Copy `.env.example` to `.env.local`
2. Update values for your local setup
3. Start development server: `npm run dev`

### Production Deployment

#### Option 1: Using .env.production
1. Copy `.env.production` to `.env.local`
2. Update `NEXT_PUBLIC_FRONTEND_URL` with your domain
3. Deploy to your hosting platform

#### Option 2: Platform Environment Variables
Set these variables in your hosting platform (Vercel, Netlify, etc.):
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_BACKEND_URL` 
- `NEXT_PUBLIC_FRONTEND_URL`

## Quick Switch Commands

### Switch to Local Development
```bash
cp .env.example .env.local
# Edit .env.local with local URLs
```

### Switch to Production
```bash
cp .env.production .env.local
# Edit NEXT_PUBLIC_FRONTEND_URL in .env.local
```

## Configuration Validation
The app includes automatic validation for required environment variables. Check browser console for warnings about missing variables.

## Security Notes
- Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the client
- Never put sensitive secrets in `NEXT_PUBLIC_` variables
- `.env.local` is ignored by git for security
- Always verify environment variables before deployment