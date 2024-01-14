import { Matiere } from '../matiere';
import { GroupeDeMatieres } from './groupe-de-matieres.model';
import { TGroupeDeMatiere } from './groupe-de-matieres.types';

const create = async (
  submittedGroupeMatiere: TGroupeDeMatiere,
  matieresId: number[]
) => {
  try {
    const groupeDeMatieres = await GroupeDeMatieres.create(
      submittedGroupeMatiere
    );
    matieresId.forEach(async matiereId => {
      await groupeDeMatieres.addMatiere(matiereId);
    });
    return groupeDeMatieres.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la creation d un groupe de matieres!');
  }
};

const readOne = async (idGroupeMatiere: number) => {
  try {
    const groupeDeMatieres = await GroupeDeMatieres.findByPk(idGroupeMatiere, {
      include: [Matiere],
    });
    return groupeDeMatieres?.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la lecture d un groupe de matieres!');
  }
};

const groupeDeMatieresService = {
  create,
  readOne,
};

export { groupeDeMatieresService };
