import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChargingStation',
    required: true
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  duration: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Create compound index for checking availability
bookingSchema.index({ station: 1, startTime: 1, status: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking; 