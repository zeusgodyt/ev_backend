import mongoose from 'mongoose';

const chargingStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  location: {
    type: {
      lat: {
        type: Number,
        required: [true, 'Latitude is required']
      },
      lng: {
        type: Number,
        required: [true, 'Longitude is required']
      }
    },
    required: [true, 'Location is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  powerOutput: {
    type: Number,
    required: [true, 'Power output is required'],
    min: [0, 'Power output must be a positive number']
  },
  connectorType: {
    type: String,
    enum: ['Type 1', 'Type 2', 'CCS', 'CHAdeMO', 'Tesla'],
    required: [true, 'Connector type is required']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// Add index for geo queries
chargingStationSchema.index({ 'location.lat': 1, 'location.lng': 1 });

const ChargingStation = mongoose.model('ChargingStation', chargingStationSchema);

export default ChargingStation;