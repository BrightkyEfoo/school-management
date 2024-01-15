import { NextFunction, Request, Response } from 'express';
import { methode_de_paiementService } from '../methode_de_paiement';
import { etudiantService } from './etudiant.service';
import { classeService } from '../classe';
import { bulletinService } from '../bulletin';

const buyTranche = async (req: Request, res: Response) => {
  const { tranche } = req.body;
  const id = parseInt(req.params.etudiantId);
  try {
    const recu = await etudiantService.buyTranche(id, tranche);
    res.json({ msg: 'success', recu });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ msg: 'quelque chose a mal tourne' });
  }
};

const viewScolarite = async (req: Request, res: Response) => {
  const id = parseInt(req.params.etudiantId);
  try {
    const recus = await etudiantService.viewRecuOfAYear(id);
    if (!recus || recus.length === 0)
      return res.status(404).json({ msg: "Aucune tranche n'a ete payee" });
    const methodePaiement = await methode_de_paiementService.readOne(
      recus[0].MethodeDePaiementId
    );
    res.json({ msg: 'success', recus, methodePaiement });
  } catch (error: any) {
    console.log('error', error);
    res
      .status(500)
      .json({ msg: 'quelque chose a mal tourne :' + error.message });
  }
};

const read = async (req: Request, res: Response) => {
  const id = parseInt(req.params.etudiantId);
  try {
    const etudiant = await etudiantService.ReadOneById(id);
    if (!etudiant) return res.status(404).json({ msg: 'Etudiant non trouve' });
    res.json({ msg: 'success', etudiant });
  } catch (error) {
    res.status(500).json({ msg: 'quelque chose a mal tourne' });
  }
};

const changerClasse = async (req: Request, res: Response) => {
  const id = parseInt(req.params.etudiantId);
  const idClasse = req.body.idClasse;
  try {
    await etudiantService.changerClasse(id, idClasse);
    res.json({ msg: 'success' });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ msg: 'quelque chose a mal tourne' });
  }
};

const viewClasse = async (req: Request, res: Response) => {
  const id = parseInt(req.params.etudiantId);
  try {
    const classe = await etudiantService.viewClasse(id);
    return res.json({ msg: 'success', classe });
  } catch (error) {
    res.status(500).json({ msg: 'quelque chose a mal tourne' });
  }
};

const sinscrire = async (req: Request, res: Response) => {
  const id = parseInt(req.params.etudiantId);
  const { idClasse } = req.body;
  try {
    await classeService.ajouterEtudiants(idClasse, [id]);
    return res.json({ msg: 'success' });
  } catch (error) {
    res.status(500).json({ msg: 'quelque chose a mal tourne' });
  }
};

const voirBulletins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.etudiantId);
  console.log('id', id);
  const now = new Date();
  try {
    console.log('here');
    const annee = parseInt(req.query.annee as string) || now.getFullYear();
    console.log('annee', annee);
    const bulletins = await etudiantService.viewBulletinOfAYear(id, annee);
    console.log('bulletins', bulletins);
    if (!bulletins || bulletins.length === 0)
      return res.status(404).json({ msg: "Aucun bulletin n'a ete trouve" });
    res.json({ msg: 'success', bulletins });
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};

const creerBulletin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.etudiantId);
  const now = new Date();
  const annee = now.getFullYear();

  try {
    const classe = await etudiantService.viewClasse(id);
    const bulletin = await bulletinService.create(
      { annee, moyenne: 0 },
      classe.id,
      id
    );
    res.json({msg : "success" , bulletin });
  } catch (error) {
    next(error);
  }
};

const etudiantController = {
  buyTranche,
  viewScolarite,
  read,
  changerClasse,
  viewClasse,
  sinscrire,
  voirBulletins,
  creerBulletin,
};

export { etudiantController };
