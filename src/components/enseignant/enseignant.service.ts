import { AppError, errorManagement } from '../../utils';
import { Classe } from '../classe';
import { Matiere } from '../matiere';
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
  const enseignant = await Enseignant.findByPk(id);
  if (!enseignant) {
    throw new AppError(
      errorManagement.commonErrors.notFound,
      'Aucun enseignant trouve',
      true
    );
  }
  return enseignant.toJSON();
};

const viewClasses = async (id: number) => {
  const enseignant = await Enseignant.findByPk(id, { include: Classe });
  if (!enseignant) {
    throw new AppError(
      errorManagement.commonErrors.notFound,
      'Aucun enseignant trouve',
      true
    );
  }
  const enseignantJSON = enseignant.toJSON();
  const classes = enseignantJSON.Classes;
  console.log('classes', classes);
  if (!classes)
    throw new AppError(
      errorManagement.commonErrors.notFound,
      "cet enseignant n'enseigne aucune classe",
      true
    );
  return classes;
};

const readAll = async () => {
  const enseignants = await Enseignant.findAll();
  if (!enseignants || enseignants.length === 0) {
    throw new AppError(
      errorManagement.commonErrors.notFound,
      'Aucun enseignant trouve',
      true
    );
  }
  return enseignants.map(el => {
    return el.toJSON();
  });
};

const viewMatieresEnseigneesDansUneClasse = async (
  id: number,
  idClasse: number
) => {
  const enseignant = await Enseignant.findByPk(id, {
    include: { model: Classe, where: { id: idClasse }, include: [Matiere] },
  });
  if (!enseignant) {
    throw new AppError(
      errorManagement.commonErrors.notFound,
      'aucun enseignant trouve',
      true
    );
  }
  return enseignant.toJSON().classes;
};

const enseignantService = {
  create,
  ReadOneById,
  viewClasses,
  readAll,
  viewMatieresEnseigneesDansUneClasse,
};

export { enseignantService };
