import { Router } from 'express';
import { FiscalDocumentController } from '../controllers/fiscal-document.controller';

const router = Router();
const controller = new FiscalDocumentController();

// Fiscal Document routes
router.post('/documents', controller.createDocument);
router.get('/documents/:id', controller.getDocumentById);
router.get('/documents', controller.getAllDocuments);
router.put('/documents/:id', controller.updateDocument);
router.delete('/documents/:id', controller.deleteDocument);

export default router; 