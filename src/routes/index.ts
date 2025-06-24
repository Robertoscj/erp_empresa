import { Router } from 'express';
import fiscalRoutes from '../modules/fiscal/routes/fiscal.routes';
import accountingRoutes from '../modules/accounting/routes/accounting-xml.routes';
import financialRoutes from '../modules/financial/routes/financial-account.routes';
import logisticsRoutes from '../modules/logistics/routes/logistics-tracking.routes';
import profitabilityRoutes from '../modules/profitability/routes/profitability-analysis.routes';
import bankIntegrationRoutes from '../modules/bank-integration/routes/bank-integration.routes';

const router = Router();

router.use('/fiscal', fiscalRoutes);
router.use('/accounting', accountingRoutes);
router.use('/financial', financialRoutes);
router.use('/logistics', logisticsRoutes);
router.use('/profitability', profitabilityRoutes);
router.use('/bank-integration', bankIntegrationRoutes);

export default router; 