import { EnseignantMatiereClasse } from './enseignant_matiere_classe.model';
import { TEnseignantMatiereClasse } from './enseignant_matiere_classe.types';

const create = async (relation: TEnseignantMatiereClasse) => {
  try {
    const newRelation = await EnseignantMatiereClasse.create(relation);
    return newRelation.toJSON();
  } catch (error) {
    throw new Error(
      'erreur lors de la creation d une relation entre enseignant matiere et classe!'
    );
  }
};

const enseignant_matiere_classeService = {
  create,
};

export { enseignant_matiere_classeService };
