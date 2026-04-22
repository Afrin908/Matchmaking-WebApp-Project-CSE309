# Matchmaking Platform

A modern, secure, and user-friendly matchmaking web application built with the **MERN Stack** (MongoDB, Express, React, Node.js). Find your perfect life partner in a structured, verified, and secure environment.

## About This Project

**Matchmaking** is a professional matchmaking platform designed for people looking for meaningful relationships. It combines a beautiful user interface with powerful matching algorithms and security features to help users connect with compatible partners.

This project is perfect for learning full-stack web development using modern technologies. It includes authentication, real-time messaging, profile management, and admin controls.

---

## Features

### User Features
- **User Registration & Login** - Secure authentication with JWT tokens
- **Complete Profile Management** - Add photos, education, location, religion, preferences
- **Smart Search & Filters** - Find compatible partners by age, location, education, religion
- **Compatibility Scoring** - View compatibility ratings based on shared values
- **Match Requests** - Send and manage match requests
- **Connections** - View all accepted matches
- **Real-time Messaging** - Private chat with accepted matches
- **Profile Verification** - Verified badge for trusted members

### Security Features
- **Password Encryption** - bcryptjs for secure password storage
- **JWT Authentication** - Token-based secure sessions
- **Protected Routes** - Authorization checks on all endpoints
- **Data Privacy** - Profile visibility only to matched users

### Admin Features
- **User Management** - View and manage all registered users
- **User Suspension** - Suspend inappropriate profiles
- **Admin Dashboard** - Statistics and user monitoring
- **Admin Badge** - Identify admin users

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React.js, React Router v7, Axios | Interactive user interface |
| **Backend** | Node.js, Express.js | Server & API endpoints |
| **Database** | MongoDB Atlas (Cloud) | Data storage |
| **Authentication** | JWT, bcryptjs | Secure login & tokens |
| **Styling** | Custom CSS | Beautiful UI with theme color #6AAEB4 |

---

## Project Structure

```
matchmaking/
├── 📂 client/                      # React Frontend Application
│   ├── 📂 public/
│   │   └── index.html              # Main HTML file
│   ├── 📂 src/
│   │   ├── 📂 components/          # Reusable React components
│   │   │   ├── Navbar.jsx          # Top navigation bar
│   │   │   ├── ProfileCard.jsx     # User profile card display
│   │   │   └── ProtectedRoute.jsx  # Route protection component
│   │   ├── 📂 context/             # React Context for state management
│   │   │   └── AuthContext.jsx     # Authentication state
│   │   ├── 📂 pages/               # Full page components
│   │   │   ├── Home.jsx            # Landing page with features
│   │   │   ├── Login.jsx           # User login page
│   │   │   ├── Signup.jsx          # User registration page
│   │   │   ├── Profile.jsx         # User profile editor
│   │   │   ├── Search.jsx          # Browse & filter profiles
│   │   │   ├── UserDetail.jsx      # View individual profile
│   │   │   ├── Requests.jsx        # Match requests inbox
│   │   │   ├── Connections.jsx     # Accepted matches list
│   │   │   ├── Chat.jsx            # Messaging interface
│   │   │   └── Admin.jsx           # Admin dashboard
│   │   ├── 📂 utils/               # Utility functions
│   │   │   └── axios.js            # API request configuration
│   │   ├── 📂 assets/              # Images and static files
│   │   │   └── logo.png            # Brand logo
│   │   ├── App.jsx                 # Main app component
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Global styles
│   ├── package.json                # Frontend dependencies
│   └── .env                        # Environment variables (create this)
│
└── 📂 server/                      # Express Backend API
    ├── 📂 config/
    │   └── db.js                   # MongoDB connection
    ├── 📂 controllers/             # Business logic handlers
    │   ├── authController.js       # Login & registration logic
    │   ├── userController.js       # User profile management
    │   ├── matchController.js      # Match request logic
    │   └── messageController.js    # Messaging logic
    ├── 📂 middleware/              # Express middleware
    │   └── authMiddleware.js       # JWT verification
    ├── 📂 models/                  # MongoDB data schemas
    │   ├── User.js                 # User data model
    │   ├── Match.js                # Match requests model
    │   └── Message.js              # Messages model
    ├── 📂 routes/                  # API endpoints
    │   ├── authRoutes.js           # /api/auth endpoints
    │   ├── userRoutes.js           # /api/users endpoints
    │   ├── matchRoutes.js          # /api/match endpoints
    │   └── messageRoutes.js        # /api/messages endpoints
    ├── server.js                   # Express server entry point
    ├── package.json                # Backend dependencies
    ├── .env                        # Environment variables (create this)
    └── seed.js                     # Optional: seed test data

README.md                           # This file
package.json                        # Root package.json (optional)
```

### Key Files Explained:
- **client/src/context/AuthContext.jsx** - Manages user login state globally
- **server/middleware/authMiddleware.js** - Checks JWT token on protected routes
- **server/models/*.js** - Define how data is stored in MongoDB
- **server/routes/*.js** - List of all API endpoints

---

## Installation Guide (Step-by-Step for Beginners)

### Prerequisites (Install These First)

#### 1. **Node.js & npm**
- Download from: https://nodejs.org/ (LTS version recommended)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

#### 2. **MongoDB Atlas Account** (Free Cloud Database)
- Go to: https://cloud.mongodb.com
- Click "Sign Up" and create account
- Create a FREE cluster (M0 tier)
- This is where all your data will be stored online

#### 3. **Git** (Optional but recommended)
- Download from: https://git-scm.com/
- Used to clone/manage code

#### 4. **VS Code** (Recommended Editor)
- Download from: https://code.visualstudio.com/

---

## Step-by-Step Setup Instructions

### **Step 1: Download/Clone the Project**

```bash
# Option A: Using Git (recommended)
git clone <repository-url>
cd matchmaking

# Option B: Download as ZIP
# Extract the ZIP file and open in VS Code
```

---

### **Step 2: Setup MongoDB Atlas** (5 minutes)

1. **Create Account**: Go to https://cloud.mongodb.com
2. **Create Organization** (if needed)
3. **Create a Project**
4. **Create a Cluster**:
   - Choose "FREE" tier (M0)
   - Select region closest to you
   - Click "Create Cluster" (wait 2-3 minutes)

5. **Create Database User**:
   - Go to "Database Access" → "Add New Database User"
   - Username: `admin` (or any name)
   - Password: Choose a strong password and **SAVE IT**
   - Click "Add User"

6. **Allow Network Access**:
   - Go to "Network Access" → "Add IP Address"
   - Add IP: `0.0.0.0/0` (allows all IPs - OK for development)
   - Click "Confirm"

7. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Drivers" → "Node.js"
   - Copy the connection string:
     ```
     mongodb+srv://admin:PASSWORD@cluster.mongodb.net/matchmaking?retryWrites=true&w=majority
     ```
   - Replace `PASSWORD` with your actual password
   - Replace `matchmaking` with your database name

---

### **Step 3: Backend Setup**

```bash
# 1. Navigate to server folder
cd server

# 2. Install dependencies
npm install

# 3. Create .env file (create new file named ".env")
```

**Create `.server/.env` file with:**
```env
PORT=5000
MONGO_URI=mongodb+srv://admin:YourPassword@cluster.mongodb.net/matchmaking?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_12345_make_it_long_and_random
NODE_ENV=development
```

**Replace**:
- `YourPassword` - your MongoDB password
- `jwt_secret_key` - any random string (e.g., `mysecretkey123!@#`)

```bash
# 4. Start the server
npm start
```

**Expected output:**
```
✓ Server running on http://localhost:5000
✓ Connected to MongoDB Atlas
```

---

### **Step 4: Frontend Setup**

**Open a NEW terminal** (keep server running in old terminal)

```bash
# 1. Navigate to client folder
cd client

# 2. Install dependencies
npm install

# 3. Create .env file
```

**Create `client/.env` file with:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

```bash
# 4. Start the frontend
npm start
```

**Your browser should automatically open**:
```
http://localhost:3000
```

---

## Verify Everything Works

1. **Frontend loads** at http://localhost:3000 - You see the homepage
2. **Sign Up** - Create a test account
3. **Login** - Login with your credentials
4. **Browse Profiles** - You should see some test profiles
5. **Check Console** - No red errors in browser console

If you see errors, check:
- MongoDB connection string is correct
- Both servers are running
- Port 5000 and 3000 are not blocked

---

## How to Use the Application

### **For Regular Users:**

1. **Sign Up** (`/signup`)
   - Create account with email and password
   - Fill in your profile (name, age, gender, location)

2. **Complete Your Profile** (`/profile`)
   - Add a profile photo
   - Add education and religion
   - Add preferences for matches

3. **Browse Profiles** (`/search`)
   - Use filters (age, location, education, religion)
   - View compatibility scores
   - Click on profiles to see details

4. **Send Match Requests**
   - On profile page, click "Send Match Request"
   - Wait for them to accept

5. **View Requests** (`/requests`)
   - See who sent you requests
   - Accept or reject requests

6. **Chat** (`/chat`)
   - Message accepted matches
   - Private conversations only

### **For Admins:**

1. Go to `/admin` page
2. View all registered users
3. See statistics (total, active, suspended)
4. Suspend inappropriate users

---

## Making Yourself an Admin

To give admin access to a user:

**Option 1: MongoDB Atlas UI (Easy)**
1. Go to https://cloud.mongodb.com
2. Click "Database" → "Collections"
3. Find "users" collection
4. Click your user document
5. Edit and set: `isAdmin: true`
6. Save changes

**Option 2: MongoDB Shell (Advanced)**
```bash
mongosh "mongodb+srv://admin:PASSWORD@cluster.mongodb.net/matchmaking"
db.users.updateOne(
  { email: "your@email.com" }, 
  { $set: { isAdmin: true } }
)
```

---

## 🔗 API Reference

**Base URL**: `http://localhost:5000/api`

All protected endpoints require this header:
```
Authorization: Bearer <your_jwt_token>
```

### Auth Routes (no token required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and get JWT |

### User Routes (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users/me | Get my profile |
| PUT | /api/users/me | Update my profile |
| GET | /api/users/search | Search users with filters |
| GET | /api/users/:id | View a user's profile |
| GET | /api/users/all | (Admin) Get all users |
| PUT | /api/users/:id/suspend | (Admin) Suspend user |

### Match Routes (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/match/request | Send match request |
| GET | /api/match/requests | Incoming requests |
| GET | /api/match/sent | My sent requests |
| PUT | /api/match/:id/respond | Accept or reject |
| GET | /api/match/connections | All accepted matches |
| DELETE | /api/match/:id | Remove a match |

### Message Routes (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/messages/send | Send a message |
| GET | /api/messages/:userId | Get chat history |

---

## Creating an Admin User

After registering normally, connect to MongoDB Atlas and manually set `isAdmin: true` on your user document, or run in MongoDB shell:

```js
db.users.updateOne({ email: "your@email.com" }, { $set: { isAdmin: true } })
```

---

## 🌐 App Routes & Pages

| Route | Access Level | Description |
|-------|--------|-------------|
| `/` | Public | Landing page with features |
| `/login` | Public | User login |
| `/signup` | Public | Create new account |
| `/search` | Protected | Browse & filter profiles |
| `/user/:id` | Protected | View detailed profile |
| `/requests` | Protected | Match requests inbox |
| `/connections` | Protected | Your accepted matches |
| `/chat` | Protected | Messaging with matches |
| `/profile` | Protected | Edit your profile |
| `/admin` | Admin Only | User management panel |

---

## Deployment Guide

### **Backend Deployment** (Render.com)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Deploy on Render**:
   - Go to https://render.com
   - Create account and connect GitHub
   - Click "New +" → "Web Service"
   - Select your repository
   - **Name**: matchmaking-api
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your secret key
     - `PORT`: 5000
   - Click "Deploy"

3. **Get Backend URL** (e.g., `https://matchmaking-api.onrender.com`)

### **Frontend Deployment** (Vercel)

1. **Update API URL in `client/.env`**:
   ```env
   REACT_APP_API_URL=https://matchmaking-api.onrender.com/api
   ```

2. **Deploy on Vercel**:
   - Go to https://vercel.com
   - Click "Import Project" → Select GitHub repo
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Environment Variables**:
     - `REACT_APP_API_URL`: Your Render backend URL
   - Click "Deploy"

3. Your app is live! 🎉

---

## Troubleshooting

### **"Cannot connect to MongoDB"**
- Check MongoDB Atlas connection string is correct
- Verify username and password
- Ensure IP `0.0.0.0/0` is added in Network Access
- Check if database is still running

### **"Cannot POST /api/auth/register"**
- Ensure backend server is running (`npm start` in server folder)
- Check backend is running on port 5000
- Verify API URL in frontend `.env` file

### **"Login fails but no error"**
- Open Browser DevTools (F12) → Console
- Check for error messages
- Verify JWT_SECRET in backend `.env`
- Try creating a new account instead

### **"Cannot find logo.png"**
- Ensure `client/src/assets/logo.png` exists
- Check spelling of file name
- Restart frontend server

### **Page shows "Not Authenticated"**
- Clear browser cookies/local storage
- Try logging out and logging back in
- Check browser console for errors

---

## Useful Resources for Learning

- **React**: https://react.dev
- **Express.js**: https://expressjs.com
- **MongoDB**: https://docs.mongodb.com
- **React Router**: https://reactrouter.com
- **JWT Auth**: https://jwt.io

---

## Project Pages Explained

### **Home Page** (`/`)
- Shows features and benefits
- Call-to-action buttons for signup
- Statistics about platform
- Testimonials and FAQs

### **Login & Signup** (`/login`, `/signup`)
- Beautiful two-column design
- Animated logo and decorative elements
- Form validation

### **Search** (`/search`)
- Filter profiles by age, location, education, religion
- View compatibility scores
- Pagination for browsing

### **User Detail** (`/user/:id`)
- Full profile with photos
- Compatibility rating
- Background information
- Action buttons (Send Request, Message, etc.)

### **Requests** (`/requests`)
- View incoming match requests
- Accept or reject
- See sender's profile summary

### **Connections** (`/connections`)
- List of all accepted matches
- View mutual connections
- Quick access to chat

### **Chat** (`/chat`)
- Sidebar with recent conversations
- Message history with selected user
- Real-time message input
- Timestamps on messages

### **Profile** (`/profile`)
- Edit your name, age, location, etc.
- Upload profile photo
- Set preferences
- Save changes to database

### **Admin Dashboard** (`/admin`)
- View all users in table format
- Search users
- View user statistics
- Suspend inappropriate users

---

## Key Concepts for Beginners

### **JWT (JSON Web Tokens)**
- Used for secure authentication
- Token proves you're logged in
- Sent with every request to protected routes
- Expires after certain time period

### **MongoDB**
- Cloud database that stores all data
- Document-based (like JSON)
- Collections = Tables
- Documents = Rows

### **React Context**
- Shares data across components
- Used for user login state
- Avoids "prop drilling"
- See `AuthContext.jsx` in code

### **Protected Routes**
- Routes that require login
- Redirect to login if not authenticated
- See `ProtectedRoute.jsx` component

### **CORS**
- Allows frontend to talk to backend
- Both must be on same local network
- Set up in backend `server.js`

---

## Design & Styling

- **Color Scheme**: Teal (#6AAEB4) and White
- **Animations**: Floating elements, smooth transitions
- **Logo**: Custom Matchmaking logo
- **Responsive**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean cards, intuitive navigation

---

## License

This project is open source. Feel free to use, modify, and distribute.

---

## Contributing

Found a bug? Have suggestions?
1. Report issues on GitHub
2. Submit pull requests with improvements
3. Help other beginners understand the code

---

**Created by Afrin Mahmud Tisha :)**
