import { Classe } from '../classe';
import { Etudiant } from '../etudiant';
import { Bulletin } from './bulletin.model';
import { TBulletin } from './bulletin.types';

// create bulletin

const create = async (
  submittedBulletin: TBulletin,
  classe_id: number,
  etudiant_id: number
) => {
  try {
    const bulletin = await Bulletin?.create(submittedBulletin);
    bulletin.setClasse(classe_id);
    bulletin.setEtudiant(etudiant_id);
    return Bulletin;
  } catch (error) {
    throw new Error('erreur lors de la creation du Bulletin!');
  }
};

const ReadOne = async (idBulletin: number) => {
  try {
    const foundedBulletin = await Bulletin?.findOne({
      where: { id: idBulletin },
      include: [Classe, Etudiant],
    });
    return foundedBulletin;
  } catch (error) {
    throw new Error('erreur lors de la lecture du Bulletin!');
  }
};

export const bulletinService = {
  create,
  ReadOne,
};
