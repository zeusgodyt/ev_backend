import express from 'express';
import {
  createChargingStation,
  getChargingStations,
  getChargingStationById,
  updateChargingStation,
  deleteChargingStation
} from '../controllers/stationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Station routes
router.route('/')
  .post(createChargingStation)
  .get(getChargingStations);

router.route('/:id')
  .get(getChargingStationById)
  .put(updateChargingStation)
  .delete(deleteChargingStation);

export default router;