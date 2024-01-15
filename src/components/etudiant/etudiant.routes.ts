import { Router } from 'express';
import { etudiantController } from './etudiant.controller';
import { errorHandlerMiddle } from '../../middleware';

const etudiantRouter = Router();

etudiantRouter.route('/:etudiantId').get(etudiantController.read);

etudiantRouter
  .route('/:etudiantId/tranche')
  .post(etudiantController.buyTranche)
  .get(etudiantController.viewScolarite);

etudiantRouter
  .route('/:etudiantId/classe')
  .get(etudiantController.viewClasse)
  .patch(etudiantController.changerClasse)
  .post(etudiantController.sinscrire);

etudiantRouter
  .route('/:etudiantId/bulletin')
  .get(etudiantController.voirBulletins)
  .post(etudiantController.creerBulletin);

etudiantRouter.use(errorHandlerMiddle);

export { etudiantRouter };
