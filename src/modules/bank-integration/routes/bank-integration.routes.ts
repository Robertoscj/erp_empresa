import { Router } from 'express';
import { BankIntegrationController } from '../controllers/bank-integration.controller';

const router = Router();
const controller = new BankIntegrationController();

router.post('/', controller.createIntegration);
router.get('/', controller.getAllIntegrations);
router.get('/:id', controller.getIntegrationById);
router.put('/:id', controller.updateIntegration);
router.delete('/:id', controller.deleteIntegration);

export default router; 