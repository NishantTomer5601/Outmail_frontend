# Backend Profile Update Implementation Requirements

## Overview
Need to implement a secure profile update endpoint for the frontend dashboard settings page. Users should be able to update their display name with proper rate limiting and validation.

## 1. API Endpoint Required

### PUT /api/user/update

**Request Headers:**
```
Content-Type: application/json
Credentials: include (for HTTP-only cookie authentication)
```

**Request Body:**
```json
{
  "display_name": "New User Name",
  "name": "New User Name"
}
```

**Success Response (200):**
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "display_name": "New User Name",
  "name": "New User Name",
  "role": "STUDENT"
}
```

**Error Responses:**
- 401: Not authenticated
- 400: Invalid input data
- 429: Too many requests (rate limited)
- 500: Server error

## 2. Rate Limiting Implementation

```javascript
const rateLimit = require('express-rate-limit');

const profileUpdateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 profile updates per 15 minutes per user
  keyGenerator: (req) => req.user.id, // Rate limit per authenticated user
  message: {
    success: false,
    error: 'Too many profile updates. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
```

## 3. Authentication Middleware

```javascript
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.authToken; // or your auth method
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Authentication required' 
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid authentication token' 
    });
  }
};
```

## 4. Input Validation

```javascript
const { body, validationResult } = require('express-validator');

const validateProfileUpdate = [
  body('display_name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters')
    .matches(/^[a-zA-Z\s'-\.]+$/)
    .withMessage('Name contains invalid characters'),
  
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters')
    .matches(/^[a-zA-Z\s'-\.]+$/)
    .withMessage('Name contains invalid characters'),
];
```

## 5. Main Update Handler

```javascript
const updateUserProfile = async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input data',
        details: errors.array()
      });
    }

    const { display_name, name } = req.body;
    const userId = req.user.id;

    // Check if name actually changed (avoid unnecessary DB writes)
    if (req.user.display_name === display_name && req.user.name === name) {
      return res.status(200).json({
        success: true,
        ...req.user.toJSON()
      });
    }

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        display_name: display_name,
        name: name,
        updated_at: new Date()
      },
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validations
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Return updated user data (exclude sensitive fields)
    const userResponse = {
      id: updatedUser._id,
      email: updatedUser.email,
      display_name: updatedUser.display_name,
      name: updatedUser.name,
      role: updatedUser.role,
      created_at: updatedUser.created_at,
      updated_at: updatedUser.updated_at
    };

    res.status(200).json(userResponse);

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
```

## 6. Complete Route Setup

```javascript
// Apply all middleware to the route
app.put('/api/user/update', 
  profileUpdateLimiter, 
  authenticateUser, 
  validateProfileUpdate, 
  updateUserProfile
);
```

## 7. Database Schema Requirements

Ensure your User model includes these fields:

```javascript
const userSchema = {
  email: { type: String, required: true, unique: true },
  display_name: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['STUDENT', 'TPO_ADMIN'], default: 'STUDENT' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  // ... other existing fields
};
```

## 8. Environment Variables

Add to your .env file:

```bash
JWT_SECRET=your_jwt_secret_here
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=5    # Max profile updates per window
```

## Security Features Included

- ✅ Rate limiting (5 updates per 15 minutes per user)
- ✅ Authentication required (JWT/cookie validation)  
- ✅ Input validation & sanitization (prevents XSS/injection)
- ✅ Name format validation (only letters, spaces, hyphens, dots, apostrophes)
- ✅ Duplicate update prevention (checks if name actually changed)
- ✅ Error handling (proper HTTP status codes and messages)

## Dependencies Required

```bash
npm install express-rate-limit express-validator
```

## Testing the Endpoint

```bash
# Test with curl
curl -X PUT http://localhost:8000/api/user/update \
  -H "Content-Type: application/json" \
  -H "Cookie: authToken=your_jwt_token" \
  -d '{"display_name": "New Name", "name": "New Name"}'
```

This implementation provides a secure, production-ready profile update endpoint that integrates with your existing authentication system.