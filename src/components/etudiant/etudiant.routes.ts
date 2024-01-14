import { Router } from 'express';
import { etudiantController } from './etudiant.controller';

const etudiantRouter = Router();

etudiantRouter.route('/:etudiantId').get(etudiantController.read);

etudiantRouter
  .route('/:etudiantId/tranche')
  .post(etudiantController.buyTranche)
  .get(etudiantController.viewScolarite);

export { etudiantRouter };
