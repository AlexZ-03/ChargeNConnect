import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import customerRoutes from './routes/customer.route.js';
import providerRoutes from './routes/provider.route.js';
import stationRoutes from './routes/station.route.js';
import bookingRoutes from './routes/booking.route.js';
import morgan from 'morgan';

const app = express();

// Increase event listener limit to prevent warning
process.setMaxListeners(20);

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Configure morgan for development logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app; 