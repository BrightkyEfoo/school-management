import { Etudiant } from '../etudiant';
import { Recu } from './recu.model';
import { TRecu } from './recu.types';

const create = async (
  submittedRecu: TRecu,
  etudiant_id: number,
  methode_de_paiementId: number
) => {
  try {
    const recu = await Recu.create(submittedRecu);
    recu.setEtudiant(etudiant_id);
    recu.setMethodeDePaiement(methode_de_paiementId);
    return recu.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la creation du recu!');
  }
};

const readOne = async (idRecu: number) => {
  try {
    const recu = await Recu.findByPk(idRecu, { include: Etudiant });
    return recu?.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la lecture du recu!');
  }
};

const recuService = {
  create,
  readOne,
};

export { recuService };
