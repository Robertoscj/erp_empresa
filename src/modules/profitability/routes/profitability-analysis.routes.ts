import { Router } from 'express';
import { ProfitabilityAnalysisController } from '../controllers/profitability-analysis.controller';

const router = Router();
const controller = new ProfitabilityAnalysisController();

router.post('/', controller.createAnalysis);
router.get('/', controller.getAllAnalysis);
router.get('/:id', controller.getAnalysisById);
router.put('/:id', controller.updateAnalysis);
router.delete('/:id', controller.deleteAnalysis);

export default router; 