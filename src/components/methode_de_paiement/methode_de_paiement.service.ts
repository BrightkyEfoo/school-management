import { Classe } from '../classe';
import { MethodeDePaiement } from './methode_de_paiement.model';
import { TMethodeDePaiement } from './methode_de_paiement.types';

const readOne = async (id: number) => {
  try {
    const foundedMethode_de_paiement = await MethodeDePaiement.findByPk(id);
    return foundedMethode_de_paiement?.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la lecture de la methode de paiement!');
  }
};

const create = async (methode_de_paiement: TMethodeDePaiement) => {
  try {
    const createdMethode_de_paiement = await MethodeDePaiement.create(
      methode_de_paiement
    );
    return createdMethode_de_paiement?.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la creation de la methode de paiement!');
  }
};

const methode_de_paiementService = {
  readOne,
  create,
};

export { methode_de_paiementService };
