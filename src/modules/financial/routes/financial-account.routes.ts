import { Router } from 'express';
import { FinancialAccountController } from '../controllers/financial-account.controller';

const router = Router();
const controller = new FinancialAccountController();

router.post('/', controller.createAccount);
router.get('/', controller.getAllAccounts);
router.get('/:id', controller.getAccountById);
router.put('/:id', controller.updateAccount);
router.delete('/:id', controller.deleteAccount);

export default router; 