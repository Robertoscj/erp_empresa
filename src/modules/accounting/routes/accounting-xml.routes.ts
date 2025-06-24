import { Router } from 'express';
import { AccountingXmlController } from '../controllers/accounting-xml.controller';

const router = Router();
const controller = new AccountingXmlController();

router.post('/', controller.importXml);
router.get('/', controller.getAllXmls);
router.get('/:id', controller.getXmlById);
router.put('/:id', controller.updateXml);
router.delete('/:id', controller.deleteXml);

export default router; 