import { Enseignant } from './enseignant.model';
import { TEnseignant } from './enseignant.types';

const create = async (enseignant: TEnseignant) => {
  try {
    const newEnseignant = await Enseignant.create(enseignant);
    return newEnseignant.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la creation d un enseignant!');
  }
};

const ReadOneById = async (id: number) => {
  try {
    const enseignant = await Enseignant.findByPk(id);
    return enseignant?.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la lecture d un enseignant!');
  }
};

const enseignantService = {
  create,
  ReadOneById,
};

export { enseignantService };
