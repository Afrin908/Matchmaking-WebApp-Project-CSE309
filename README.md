# M21 Matchmaking Web Application

A secure MERN stack matchmaking platform — find your perfect life partner.

## Tech Stack
- **Frontend**: React.js, React Router v7, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (cloud)
- **Auth**: JWT + bcryptjs

---

## Project Structure

```
matchmaking/
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProfileCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── UserDetail.jsx
│   │   │   ├── Requests.jsx
│   │   │   ├── Connections.jsx
│   │   │   ├── Chat.jsx
│   │   │   └── Admin.jsx
│   │   ├── utils/
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── server/                  # Express backend
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── userController.js
    │   ├── matchController.js
    │   └── messageController.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   ├── User.js
    │   ├── Match.js
    │   └── Message.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── userRoutes.js
    │   ├── matchRoutes.js
    │   └── messageRoutes.js
    ├── .env
    └── server.js
```

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- A free MongoDB Atlas account at https://cloud.mongodb.com
- VS Code (recommended)

---

### Step 1 — MongoDB Atlas Setup
1. Go to https://cloud.mongodb.com and create a free account
2. Create a new **Cluster** (free tier M0)
3. Under **Database Access** → Add a user with username + password
4. Under **Network Access** → Add IP `0.0.0.0/0` (allow all)
5. Click **Connect** → **Drivers** → Copy the connection string
6. Replace `<password>` in the string with your actual password

---

### Step 2 — Backend Setup

```bash
cd server
npm install
```

Create a `.env` file (copy from `.env.example`):
```
PORT=5000
MONGO_URI=your_atlas_connection_string_here
JWT_SECRET=any_long_random_string_here
NODE_ENV=development
```

Start the server:
```bash
npm run dev      # with nodemon (install: npm i -g nodemon)
# or
npm start        # without nodemon
```

Server runs on: http://localhost:5000

---

### Step 3 — Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file (copy from `.env.example`):
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start the client:
```bash
npm start
```

Client runs on: http://localhost:3000

---

## API Reference

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

## Deployment

### Backend → Render.com
1. Push code to GitHub
2. Create new **Web Service** on Render
3. Root directory: `server`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables (MONGO_URI, JWT_SECRET)

### Frontend → Vercel
1. Push code to GitHub
2. Import project on Vercel
3. Root directory: `client`
4. Add environment variable: `REACT_APP_API_URL=https://your-render-url.onrender.com/api`

---

## Pages

| Route | Access | Description |
|-------|--------|-------------|
| / | Public | Landing page with features |
| /login | Public | Login form |
| /signup | Public | Registration form |
| /search | Auth | Browse & filter profiles |
| /user/:id | Auth | View a user's full profile |
| /requests | Auth | Manage match requests |
| /connections | Auth | Your accepted matches |
| /chat | Auth | Messaging with connections |
| /profile | Auth | Edit your own profile |
| /admin | Admin | User management panel |

---

*Prepared by Afrin Mahmud Tisha — CSE 309, IUB*
