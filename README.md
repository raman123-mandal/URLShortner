# URL Shortener

A full-featured URL shortening application built with Node.js, Express, MongoDB, and EJS. Create short, shareable links with built-in user authentication, visit tracking, and analytics.

## Features

- 🔐 **User Authentication** - Secure signup and login with JWT tokens and cookie-based sessions
- 🔗 **URL Shortening** - Convert long URLs into compact short links with unique IDs
- 📊 **Analytics** - Track visit history with timestamps for each short URL
- 👥 **User Management** - Role-based access control (Admin/Normal user)
- 📱 **Responsive UI** - Simple and intuitive web interface
- 👮 **Admin Panel** - View all URLs in the system (Admin-only)

## Tech Stack

- **Backend**: Node.js, Express.js v5.2.1
- **Database**: MongoDB with Mongoose ODM v9.7.0
- **Frontend**: EJS template engine v6.0.1
- **Authentication**: JWT (jsonwebtoken v9.0.3)
- **Development**: Nodemon for hot-reloading
- **Other**: 
  - ShortID v2.2.17 for unique short URL generation
  - nanoid v5.1.11 for additional ID generation
  - Cookie Parser v1.4.7 for session management
  - dotenv v17.4.2 for environment configuration

## Project Structure

```
.
├── index.js                 # Main application entry point
├── connect.js               # MongoDB connection setup
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Locked dependency versions
│
├── model/
│   ├── url.js              # URL schema with visit history tracking
│   └── user.js             # User schema with authentication fields
│
├── controller/
│   ├── url.js              # URL creation, redirect, analytics logic
│   └── user.js             # User signup and login handlers
│
├── routes/
│   ├── url.js              # URL shortening and analytics endpoints
│   ├── user.js             # Authentication endpoints
│   └── staticRouter.js      # Static page routes (home, login, signup, admin)
│
├── middleware/
│   └── auth.js             # Authentication and authorization middleware
│
├── service/
│   └── auth.js             # JWT token generation and verification
│
├── view/
│   ├── home.ejs            # Dashboard with URL management interface
│   ├── signup.ejs          # User registration form
│   └── login.ejs           # User login form
│
└── .gitignore              # Git ignore rules
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or remote connection string)

### Step 1: Clone the Repository
```bash
git clone https://github.com/raman123-mandal/URLShortner.git
cd URLShortner
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/urlshortener
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

For MongoDB Atlas (cloud):
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/urlshortener?retryWrites=true&w=majority
```

### Step 4: Start the Server

**Development mode** (with hot-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Routes

### Static Routes
| Method | Route | Description | Auth Required |
|--------|-------|-------------|---|
| GET | `/` | Home page - user's URL dashboard | Yes (NORMAL/Admin) |
| GET | `/signup` | Signup form | No |
| GET | `/login` | Login form | No |
| GET | `/admin/urls` | Admin panel - view all URLs | Yes (Admin only) |

### User Routes
| Method | Route | Description | Auth Required |
|--------|-------|-------------|---|
| POST | `/user` | User signup | No |
| POST | `/user/login` | User login | No |

### URL Routes
| Method | Route | Description | Auth Required |
|--------|-------|-------------|---|
| POST | `/url` | Create a short URL | Yes |
| GET | `/url/:shortId` | Redirect to original URL | No |
| GET | `/url/analytics/:shortId` | Get click analytics | No |

## Usage Guide

### 1. Sign Up
- Navigate to `/signup`
- Enter your name, email, and password
- Click "Sign Up" to create an account

### 2. Create Short URL
- Log in to your account
- Enter a long URL in the "Enter your Original URL" field
- Click "Generate"
- Your short URL will be displayed and added to your dashboard

### 3. Share Short URL
- Copy the generated short URL from your dashboard
- Share it anywhere - clicking it will redirect to your original URL

### 4. View Analytics
- Access `/url/analytics/:shortId` to see:
  - Total number of clicks
  - Complete visit history with timestamps

### 5. Admin Panel (Admin Users Only)
- Navigate to `/admin/urls`
- View all URLs created by all users in the system
- See statistics for each URL

## Authentication & Authorization

### User Roles
- **NORMAL**: Standard user - can create URLs and view their own analytics
- **Admin**: Can view all URLs and access the admin panel

### Session Management
- Users are authenticated via JWT stored in cookies
- Sessions persist across page reloads
- Automatic redirect to login page for expired or missing tokens

## Database Schema

### URL Schema
```javascript
{
  shortId: String (unique),           // e.g., "abc123"
  redirectURL: String,                // Original long URL
  visitHistory: [{
    timestamp: Date                   // When the link was clicked
  }],
  createdBy: ObjectId (ref: User),   // User who created the URL
  timestamps: true                    // createdAt, updatedAt
}
```

### User Schema
```javascript
{
  name: String,                       // User's full name
  email: String (unique),             // User's email
  password: String,                   // Hashed password (currently plain text - needs improvement)
  role: String (default: "NORMAL"),  // User role (NORMAL/Admin)
  timestamps: true                    // createdAt, updatedAt
}
```

## Key Features Explained

### URL Shortening
- Uses the `shortid` library to generate unique, compact short identifiers
- Each short ID is unique and stored in MongoDB for quick lookups
- When accessing a short URL, the system increments its visit counter

### Visit Tracking
- Every time a short URL is accessed, a new timestamp is added to the `visitHistory` array
- Analytics endpoint returns all timestamps and total click count
- No personal user information is tracked for analytics

### Admin Features
- Admin users can view all URLs created by any user via `/admin/urls`
- Helps monitor system usage and popular URLs

## Security Notes

⚠️ **Current Implementation Issues**:
1. **Passwords stored in plain text** - Should be hashed using bcrypt
2. **No rate limiting** - Could allow abuse
3. **No input validation** - URLs should be validated before storing
4. **Cookie not httpOnly** - Makes sessions vulnerable to XSS attacks
5. **CORS not configured** - Could be exploited for cross-origin attacks

## Future Enhancements

- [ ] Password hashing with bcrypt
- [ ] Input validation and sanitization
- [ ] Custom short URL aliases
- [ ] QR code generation for short URLs
- [ ] URL expiration/TTL functionality
- [ ] Rate limiting and abuse prevention
- [ ] Advanced analytics (geographic location, device type)
- [ ] URL deletion and expiration
- [ ] Email notifications for URL usage
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Docker containerization

## Troubleshooting

### MongoDB Connection Error
```
Failed to connect to MongoDB
```
**Solution**: Ensure MongoDB is running and the `MONGO_URL` in `.env` is correct.

### Port Already in Use
```
EADDRINUSE: address already in use :::3000
```
**Solution**: Change the `PORT` in `.env` or kill the process using port 3000.

### JWT Secret Error
```
Error: Cannot read property 'verify' of undefined
```
**Solution**: Ensure `JWT_SECRET` is set in the `.env` file.

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

## License

ISC License - See package.json for details

## Support

For issues or questions:
- Open an issue on GitHub
- Check existing issues for similar problems
- Review the code comments for implementation details

## Author

Created by [raman123-mandal](https://github.com/raman123-mandal)

---

**Last Updated**: June 2026
