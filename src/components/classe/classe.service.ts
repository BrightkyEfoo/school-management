import { Etudiant } from '../etudiant';
import { MethodeDePaiement } from '../methode_de_paiement';
import { Classe } from './classe.model';
import { TClasse } from './classe.types';

const create = async (
  classe: TClasse,
  matieres?: { matiereId: number; coeff: number }[],
  groupe_matieres?: { groupe_matiereId: number; coeff: number }[],
  methode_de_paiementId?: number
) => {
  try {
    const newClasse = await Classe.create(classe);
    if (matieres) {
      matieres.forEach(el => {
        newClasse.addMatiere(el.matiereId, {
          through: {
            coefficient: el.coeff,
          },
        });
      });
    }
    if (groupe_matieres) {
      groupe_matieres.forEach(el => {
        newClasse.addGroupeDeMatieres(el.groupe_matiereId, {
          through: {
            coefficient: el.coeff,
          },
        });
      });
    }

    if (methode_de_paiementId) {
      newClasse.setMethodeDePaiement(methode_de_paiementId);
    }
    return newClasse.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la creation d une classe!');
  }
};

const ReadOne = async (id: number) => {
  try {
    const classe = await Classe.findByPk(id, { include: MethodeDePaiement });
    return classe?.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la lecture d une classe!');
  }
};

const readAllStudents = async (id: number) => {
  try {
    const classe = await Classe.findByPk(id, {
      include: [MethodeDePaiement, Etudiant],
    });
    return classe?.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la lecture d une classe!');
  }
};

export const classeService = {
  create,
  ReadOne,
  readAllStudents,
};
