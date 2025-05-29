import ChargingStation from '../models/ChargingStation.js';

// @desc    Create a new charging station
// @route   POST /api/stations
// @access  Private
export const createChargingStation = async (req, res) => {
  try {
    const { name, location, address, status, powerOutput, connectorType } = req.body;

    // Create new charging station
    const station = await ChargingStation.create({
      name,
      location,
      address,
      status,
      powerOutput,
      connectorType,
      owner: req.user._id
    });

    res.status(201).json({
      success: true,
      data: station
    });
  } catch (error) {
    console.error('Create station error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating charging station',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all charging stations
// @route   GET /api/stations
// @access  Private
export const getChargingStations = async (req, res) => {
  try {
    // Extract filter parameters
    const { status, connectorType, minPower, maxPower } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (status) filter.status = status;
    if (connectorType) filter.connectorType = connectorType;
    
    if (minPower || maxPower) {
      filter.powerOutput = {};
      if (minPower) filter.powerOutput.$gte = Number(minPower);
      if (maxPower) filter.powerOutput.$lte = Number(maxPower);
    }

    // Find stations with filters
    const stations = await ChargingStation.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: stations.length,
      data: stations
    });
  } catch (error) {
    console.error('Get stations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching charging stations',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get charging station by ID
// @route   GET /api/stations/:id
// @access  Private
export const getChargingStationById = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Charging station not found'
      });
    }

    res.status(200).json({
      success: true,
      data: station
    });
  } catch (error) {
    console.error('Get station by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching charging station',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update charging station
// @route   PUT /api/stations/:id
// @access  Private
export const updateChargingStation = async (req, res) => {
  try {
    let station = await ChargingStation.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Charging station not found'
      });
    }

    // Check if user owns the station or is admin
    if (station.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this charging station'
      });
    }

    // Update station
    station = await ChargingStation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: station
    });
  } catch (error) {
    console.error('Update station error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating charging station',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete charging station
// @route   DELETE /api/stations/:id
// @access  Private
export const deleteChargingStation = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Charging station not found'
      });
    }

    // Check if user owns the station or is admin
    if (station.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this charging station'
      });
    }

    await ChargingStation.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Charging station deleted successfully'
    });
  } catch (error) {
    console.error('Delete station error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting charging station',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};