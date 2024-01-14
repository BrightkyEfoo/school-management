import { Request, Response } from 'express';
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

const listAll = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const classe = await classeService.readAllStudents(id);
    if (!classe) return res.status(404).json({ msg: 'classe non trouvee' });
    const etudiants = classe.Etudiants;
    if (!etudiants || etudiants.length === 0)
      return res
        .status(404)
        .json({ msg: "pas d'etudiants inscrits dans cette classe" });
    res.json({ msg: 'success', etudiants });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ msg: 'quelque chose a mal tourne' });
  }
};

const classeController = {
  inscrire_etudiant,
  listAll,
};

export { classeController };
