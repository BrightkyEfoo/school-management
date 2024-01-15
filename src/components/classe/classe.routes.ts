import { Router } from 'express';
import { classeController } from './classe.controller';
import { errorHandlerMiddle } from '../../middleware';

const classRouter = Router();

classRouter
  .route('/:id/etudiants')
  .get(classeController.listAllStudents)
  .post(classeController.inscrire_etudiant);

classRouter.route('/:id/matieres').get(classeController.listAllMatieres);
classRouter.use(errorHandlerMiddle);
export { classRouter };
