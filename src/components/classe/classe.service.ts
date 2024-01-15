import { AppError, errorManagement } from '../../utils';
import { Etudiant } from '../etudiant';
import { GroupeDeMatieres } from '../groupe-de-matieres';
import { Matiere } from '../matiere';
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
  const classe = await Classe.findByPk(id, {
    include: [Etudiant],
  });
  if (!classe) {
    throw new AppError(
      errorManagement.commonErrors.notFound,
      'aucune classe trouvee',
      true
    );
  }
  if (!classe.toJSON().etudiants || classe.toJSON().etudiants.length === 0) {
    throw new AppError(
      errorManagement.commonErrors.notFound,
      'aucun etudiant trouve dans cette classe',
      true
    );
  }
  return classe?.toJSON().etudiants;
};

const listeMatieres = async (id: number) => {
  try {
    const classe = await Classe.findByPk(id, {
      include: [Matiere, { model: GroupeDeMatieres, include: [Matiere] }],
    });
    return classe?.toJSON();
  } catch (error) {
    console.log('error', error);
    throw new Error('erreur lors de la lecture des matieres d une classe!');
  }
};

const addMatieres = async (idClasse: number, matieresId: number[]) => {
  try {
    const classe = await Classe.findByPk(idClasse);
    if (!classe) {
      throw new Error('classe non trouvee');
    }
    matieresId.forEach(matiereId => {
      classe.addMatiere(matiereId);
    });
  } catch (error) {
    throw new Error("erreur lors de l'ajout des matieres");
  }
};

const removeMatieres = async (idClasse: number, matieresId: number[]) => {
  try {
    const classe = await Classe.findByPk(idClasse);
    if (!classe) {
      throw new Error('classe non trouvee');
    }
    matieresId.forEach(matiereId => {
      classe.removeMatiere(matiereId);
    });
  } catch (error) {
    throw new Error('erreur lors du retrait des matieres a la classe');
  }
};

const ajouterEtudiants = async (idClasse: number, etudiantsId: number[]) => {
  try {
    const classe = await Classe.findByPk(idClasse);
    if (!classe) {
      throw new Error('classe non trouvee');
    }
    etudiantsId.forEach(etudiantId => {
      classe.addEtudiant(etudiantId);
    });
  } catch (error) {
    throw new Error('erreur lors de l ajout des etudiants a la classe');
  }
};

const retirerEtudiants = async (idClasse: number, etudiantsId: number[]) => {
  try {
    const classe = await Classe.findByPk(idClasse);
    if (!classe) {
      throw new Error('classe non trouvee');
    }
    etudiantsId.forEach(etudiantId => {
      classe.removeEtudiant(etudiantId);
    });
  } catch (error) {
    throw new Error('erreur lors du retrait des etudiants a la classe');
  }
};

export const classeService = {
  create,
  ReadOne,
  readAllStudents,
  listeMatieres,
  addMatieres,
  removeMatieres,
  retirerEtudiants,
  ajouterEtudiants,
};
