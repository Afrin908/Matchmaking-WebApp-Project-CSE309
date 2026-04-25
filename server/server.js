const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/match', require('./routes/matchRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Matchmaking API is running',
    mongo: 'connected'
  });
});

// Health check
app.get('/', (req, res) => res.json({ message: 'Matchmaking API Running' }));

// 404 handler - must be after all routes
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});
// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(`Health check: http://localhost:${PORT}/api/health`);
