import { Request, Response } from 'express';
import { etudiantService } from './etudiant.service';

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
    const recus = await etudiantService.viewRecuOfThisYear(id);
    if (!recus || recus.length === 0)
      return res.status(404).json({ msg: "Aucune tranche n'a ete payee" });
    res.json({ msg: 'success', recus });
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

const etudiantController = {
  buyTranche,
  viewScolarite,
  read,
};

export { etudiantController };
