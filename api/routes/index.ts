import { Router } from 'express';
import { Database } from 'sqlite';

// Import individual routes
import officeRoutes from './offices';
import memberRoutes from './member';
import transactionRoutes from './transaction';

const createRoutes = (db: Database): Router => {
  const router = Router();

  // Register all routes
  router.use('/office', officeRoutes(db));
  router.use('/member', memberRoutes(db));
  router.use('/transaction', transactionRoutes(db));

  return router;
};

export default createRoutes;
