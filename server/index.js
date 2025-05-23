require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();




// 1. Critical Middlewares - MUST come first
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// 2. Debug Middleware - Verify body parsing
// app.use((req, res, next) => {
//   console.log(`\n--- Incoming ${req.method} ${req.path} ---`);
//   console.log('Headers:', {
//     'content-type': req.headers['content-type'],
//     'content-length': req.headers['content-length']
//   });
//   next();
// });

// 3. Other Middlewares
app.use(cors({
  origin: 'https://flipkart-webapp-964d9.web.app', // Your Vite frontend origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// CORS configuration
// const allowedOrigins = ["http://localhost:5173", "http://localhost:3000", "http://localhost:7000", "https://flipkart-webapp-964d9.web.app"];
// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.includes(origin) || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     credentials: true,
// };
// app.use(cors(corsOptions));

app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes')); // Fixed typo: tartRoutes → cartRoutes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));