import { GroupeDeMatieres } from '../groupe-de-matieres';
import { Matiere, TMatiere } from '.';

const readOne = async (idMatiere: number) => {
  try {
    const matiere = await Matiere.findOne({
      where: { id: idMatiere },
      include: [GroupeDeMatieres],
    });
    return matiere?.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la lecture de la matiere!');
  }
};

const create = async (matiere: TMatiere, idGroupeMatiere?: number) => {
  try {
    const matiereCreated = await Matiere.create(matiere);
    if (idGroupeMatiere) matiereCreated.setGroupeDeMatieres(idGroupeMatiere);
    return matiereCreated.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la creation de la matiere!');
  }
};

const matiereService = {
  readOne,
  create,
};

export { matiereService };
