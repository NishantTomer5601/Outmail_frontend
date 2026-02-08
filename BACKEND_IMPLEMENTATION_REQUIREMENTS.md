# Backend Implementation Requirements for Role-Based OAuth

## Overview
This document outlines the complete backend changes required to support the role-based authentication system implemented in the frontend. The system supports two user roles: `STUDENT` (default) and `TPO_ADMIN`.

## 1. Database Schema Changes

### User Model/Table Updates
Add these fields to your User schema/model:

```javascript
{
  // Existing fields
  email: String,
  name: String, 
  googleId: String,
  profilePicture: String,
  
  // NEW REQUIRED FIELDS
  role: {
    type: String,
    enum: ['STUDENT', 'TPO_ADMIN'],
    default: 'STUDENT'  // Default role for new users
  },
  
  // OPTIONAL - for future Gmail integration
  googleRefreshToken: String, // Store for gmail.send scope
  
  createdAt: Date,
  updatedAt: Date
}
```

## 2. JWT Payload Structure

Update JWT creation to include role:

```javascript
// JWT payload MUST contain these exact fields
const jwtPayload = {
  userId: user._id,        // or user.id
  email: user.email,
  role: user.role          // 'STUDENT' or 'TPO_ADMIN'
};

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = '7d'; // 7 days expiry
```

## 3. HTTP-Only Cookie Configuration

Cookie name MUST be 'outmail_auth':

```javascript
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // true in production, false in development
  sameSite: 'lax',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

res.cookie('outmail_auth', jwtToken, cookieOptions);
```

## 4. Required API Endpoints

### A. Update User Profile Endpoint
```javascript
// Change from /api/auth/me to /api/me
GET /api/me
// Returns: { id, email, name, role, profilePicture, ... }
```

### B. OAuth Routes (Update existing)
```javascript
GET /auth/google
// Add gmail.send scope (optional but recommended)
// Scopes: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.send']

GET /auth/google/callback  
// Update to:
// 1. Set default role = 'STUDENT' for new users
// 2. Store refresh token if gmail.send scope granted
// 3. Create JWT with { userId, email, role }
// 4. Set 'outmail_auth' cookie
// 5. Redirect to frontend /auth/success
```

### C. Role-Based Protected Routes
```javascript
// STUDENT-only routes
GET/POST/PUT/DELETE /api/student/*
// Examples: 
// - /api/student/campaigns
// - /api/student/profile
// - /api/student/analytics

// TPO_ADMIN-only routes  
GET/POST/PUT/DELETE /api/admin/*
// Examples:
// - /api/admin/students
// - /api/admin/campaigns  
// - /api/admin/reports
// - /api/admin/settings
```

## 5. Authentication Middleware Update

### Enhanced Auth Middleware
```javascript
const authenticateToken = (req, res, next) => {
  // Read from 'outmail_auth' cookie (not Authorization header)
  const token = req.cookies.outmail_auth;
  
  if (!token) {
    return res.status(401).json({ message: 'No auth token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach full user object to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email, 
      role: decoded.role
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

### Role-Based Authorization Middleware
```javascript
const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Insufficient permissions',
        requiredRole: allowedRoles,
        userRole: req.user.role
      });
    }
    
    next();
  };
};

// Usage examples:
// app.use('/api/student', authenticateToken, requireRole(['STUDENT']));
// app.use('/api/admin', authenticateToken, requireRole(['TPO_ADMIN']));
```

## 6. OAuth Flow Implementation

### Google OAuth Setup
```javascript
// Add gmail.send scope
const GOOGLE_SCOPES = [
  'profile',
  'email', 
  'https://www.googleapis.com/auth/gmail.send' // Optional but recommended
];

// In OAuth callback:
const handleGoogleCallback = async (req, res) => {
  try {
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);
    
    // Get user profile
    const userResponse = await oauth2Client.request({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo'
    });
    
    const { email, name, picture, id: googleId } = userResponse.data;
    
    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        email,
        name,
        googleId,
        profilePicture: picture,
        role: 'STUDENT', // DEFAULT ROLE
        googleRefreshToken: tokens.refresh_token // Store if gmail scope granted
      });
    } else {
      // Update existing user
      user.name = name;
      user.profilePicture = picture;
      if (tokens.refresh_token) {
        user.googleRefreshToken = tokens.refresh_token;
      }
      await user.save();
    }
    
    // Create JWT
    const jwtPayload = {
      userId: user._id,
      email: user.email,
      role: user.role
    };
    
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // Set cookie
    res.cookie('outmail_auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    // Redirect to frontend auth success
    res.redirect(`${process.env.FRONTEND_URL}/auth/success`);
    
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/?error=oauth_failed`);
  }
};
```

## 7. Updated /api/me Endpoint

```javascript
// GET /api/me - Protected route
app.get('/api/me', authenticateToken, async (req, res) => {
  try {
    // Fetch fresh user data from database
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return user data (exclude sensitive fields)
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      display_name: user.name, // Frontend expects this field
      profilePicture: user.profilePicture,
      role: user.role, // CRITICAL: Frontend needs this
      createdAt: user.createdAt
    });
    
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
```

## 8. Logout Endpoint Update

```javascript
// POST /auth/logout
app.post('/auth/logout', (req, res) => {
  // Clear the outmail_auth cookie
  res.clearCookie('outmail_auth', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });
  
  res.json({ message: 'Logged out successfully' });
});
```

## 9. Environment Variables Required

```bash
# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret  
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback

# JWT
JWT_SECRET=your_super_secure_random_string_here

# Frontend
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=your_database_connection_string

# Environment
NODE_ENV=development # or production
```

## 10. Route Structure Implementation

```javascript
// Public routes
app.get('/auth/google', ...);
app.get('/auth/google/callback', ...);
app.post('/auth/logout', ...);

// Protected user info
app.get('/api/me', authenticateToken, ...);

// Student-only routes
app.use('/api/student', authenticateToken, requireRole(['STUDENT']));
app.get('/api/student/campaigns', ...);
app.get('/api/student/profile', ...);

// Admin-only routes  
app.use('/api/admin', authenticateToken, requireRole(['TPO_ADMIN']));
app.get('/api/admin/students', ...);
app.get('/api/admin/campaigns', ...);
app.post('/api/admin/students/:id/role', ...); // Change user roles
```

## 11. CORS Configuration

```javascript
// Update CORS to handle cookies
app.use(cors({
  origin: process.env.FRONTEND_URL, // Your frontend URL
  credentials: true, // CRITICAL: Allow cookies
  optionsSuccessStatus: 200
}));
```

## 12. Required NPM Packages

```bash
npm install google-auth-library jsonwebtoken cookie-parser
```

## Key Technical Requirements

1. **Cookie Name**: Must be exactly `outmail_auth`
2. **API Endpoint**: Change `/api/auth/me` to `/api/me` 
3. **JWT Payload**: Must include `{ userId, email, role }`
4. **Default Role**: All new users get `STUDENT` role
5. **Response Format**: `/api/me` must return object with `role` field
6. **Cookie Security**: httpOnly, secure in production, sameSite: lax
7. **Role Values**: Exactly `STUDENT` and `TPO_ADMIN` (case-sensitive)
8. **Middleware Order**: Auth before role checking
9. **CORS**: Must allow credentials for cookie support
10. **Redirect**: OAuth success redirects to `/auth/success` on frontend

## Testing Checklist

- [ ] OAuth flow creates users with default `STUDENT` role
- [ ] JWT contains `userId`, `email`, and `role`
- [ ] Cookie named `outmail_auth` is set correctly
- [ ] `/api/me` endpoint returns user data with role
- [ ] Student routes reject TPO_ADMIN users
- [ ] Admin routes reject STUDENT users
- [ ] Logout clears the cookie properly
- [ ] CORS allows credentials for cookie handling

## Notes

- All new users default to `STUDENT` role
- TPO_ADMIN users must be manually assigned (create admin endpoint or database update)
- Frontend expects exact role values: `STUDENT` and `TPO_ADMIN`
- Gmail scope is optional but recommended for future email features
- Frontend automatically routes users based on their role after login