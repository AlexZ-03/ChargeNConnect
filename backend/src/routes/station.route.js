import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import {
  getAllStations,
  getStationById,
  searchStations,
  updateStationStatus,
  getProviderStations,
  createStation
} from '../controllers/station.controller.js';
import ChargingStation from '../models/ChargingStation.js';

const router = express.Router();

// Debug middleware for station routes
router.use((req, res, next) => {
  console.log('Station Route:', req.method, req.url);
  next();
});

// Get all stations (no auth required for viewing)
router.get('/', async (req, res) => {
  try {
    const stations = await ChargingStation.find()
      .populate('provider', 'name email')
      .sort({ createdAt: -1 });
    
    console.log('Found stations:', stations.length);
    res.json(stations);
  } catch (error) {
    console.error('Error fetching stations:', error);
    res.status(500).json({ message: 'Error fetching stations' });
  }
});

// Create a new station
router.post('/', protectRoute, createStation);

// Search stations with filters
router.get('/search', searchStations);

// Get provider's stations
router.get('/provider', protectRoute, async (req, res) => {
  try {
    const stations = await ChargingStation.find({ provider: req.user._id })
      .sort({ createdAt: -1 });
    
    console.log('Found provider stations:', stations.length);
    res.json(stations);
  } catch (error) {
    console.error('Error fetching provider stations:', error);
    res.status(500).json({ message: 'Error fetching stations' });
  }
});

// Get station by ID
router.get('/:id', getStationById);

// Protected routes
router.patch('/:id/status', protectRoute, updateStationStatus);

export default router; 