import { Request, Response, NextFunction } from 'express';
import { enseignantService } from './enseignant.service';

const viewAllEnseignants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const enseignants = await enseignantService.readAll();
    return res.json({ msg: 'success', enseignants });
  } catch (error) {
    next(error);
  }
};

const viewEnseignant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const enseignant = enseignantService.ReadOneById(id);
    res.json({ msg: 'success', enseignant });
  } catch (error) {
    next(error);
  }
};

const viewMatieresDeClasse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  const idClasse = req.body.idClasse;
  try {
    const matieres =
      await enseignantService.viewMatieresEnseigneesDansUneClasse(id, idClasse);
    res.json({ msg: 'success', matieres });
  } catch (error) {
    next(error);
  }
};

const viewClasses = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    const classes = await enseignantService.viewClasses(id);
    res.json({ msg: 'success', classes });
  } catch (error) {
    next(error);
  }
};

const enseignantController = {
  viewAllEnseignants,
  viewClasses,
  viewEnseignant,
  viewMatieresDeClasse,
};

export { enseignantController };
