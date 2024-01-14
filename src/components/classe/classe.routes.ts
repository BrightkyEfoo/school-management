import { Router } from 'express';
import { classeController } from './classe.controller';

const classRouter = Router();

classRouter
  .route('/:id/etudiants')
  .get(classeController.listAll)
  .post(classeController.inscrire_etudiant);

export { classRouter };
