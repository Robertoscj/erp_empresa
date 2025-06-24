import { Router } from 'express';
import { LogisticsTrackingController } from '../controllers/logistics-tracking.controller';

const router = Router();
const controller = new LogisticsTrackingController();

router.post('/', controller.createTracking);
router.get('/', controller.getAllTracking);
router.get('/:id', controller.getTrackingById);
router.put('/:id', controller.updateTracking);
router.delete('/:id', controller.deleteTracking);

export default router; 