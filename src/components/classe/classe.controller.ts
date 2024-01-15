import { NextFunction, Request, Response } from 'express';
import { bulletinService } from '../bulletin';
import { etudiantService } from '../etudiant';
import { classeService } from './classe.service';

const inscrire_etudiant = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { etudiant } = req.body;
  const now = new Date();
  try {
    const newEtudiant = await etudiantService.create(etudiant, id);
    res.json({ msg: 'success', newEtudiant });

    // creer son bulletin vide
    bulletinService.create(
      {
        annee: now.getFullYear(),
        moyenne: 0,
      },
      id,
      newEtudiant.id
    );
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ msg: 'quelque chose a mal tourne' });
  }
};

const listAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const classe = await classeService.readAllStudents(id);
    const etudiants = classe.Etudiants;
    res.json({ msg: 'success', etudiants });
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};

const listAllMatieres = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const classe = await classeService.listeMatieres(id);
    if (!classe) return res.status(404).json({ msg: 'classe non trouvee' });
    const matieres = classe.Matieres;
    const groupeDeMatieres = classe.GroupeDeMatieres;
    if (
      (!matieres && !groupeDeMatieres) ||
      (matieres.length === 0 && groupeDeMatieres.length === 0)
    )
      return res
        .status(404)
        .json({ msg: 'pas de matieres inscrits dans cette classe' });
    res.json({ msg: 'success', matieres, groupeDeMatieres });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ msg: 'quelque chose a mal tourne' });
  }
};

const creer = async (req: Request, res: Response) => {
  const classe = req.body.classe;
  try {
    const newClasse = await classeService.create(classe);
    res.json({ msg: 'success', classe: newClasse });
  } catch (err) {
    console.log('error', err);
    res
      .status(500)
      .json({ msg: "Erreur lors de la creation d'une nouvelle classe" });
  }
};

const classeController = {
  inscrire_etudiant,
  listAllStudents,
  listAllMatieres,
  creer,
};

export { classeController };
