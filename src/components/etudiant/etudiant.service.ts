import { Op, col, fn, where } from 'sequelize';
import { Bulletin } from '../bulletin';
import { Classe, classeService } from '../classe';
import { methode_de_paiementService } from '../methode_de_paiement';
import { Recu, recuService } from '../recu';
import { Etudiant } from './etudiant.model';
import { TEtudiant } from './etudiant.types';
import { AppError, errorManagement } from '../../utils';
import { Note } from '../notes';

const create = async (etudiant: TEtudiant, classe_id?: number) => {
  try {
    const newEtudiant = await Etudiant.create(etudiant);

    if (classe_id) {
      await newEtudiant.setClasse(classe_id);
    }
    return newEtudiant.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la creation d un etudiant!');
  }
};

const ReadOneById = async (id: number) => {
  try {
    const etudiant = await Etudiant.findByPk(id, {
      include: [Classe, Bulletin, Recu],
    });
    return etudiant?.toJSON();
  } catch (error) {
    throw new Error('erreur lors de la lecture d un etudiant!');
  }
};

const buyTranche = async (id: number, tranche: number) => {
  try {
    // on recherche l'etudiant
    const etudiant = await etudiantService.ReadOneById(id);
    if (!etudiant) throw new Error('etudiant non trouvé');

    // on recherche la classe de l'etudiant
    const classe = await classeService.ReadOne(etudiant.Classe.id);
    if (!classe)
      throw new AppError(
        errorManagement.commonErrors.misconfiguration,
        "cet etudiant n'est inscrit dans aucune classe",
        true
      );

    // on recherche la methode de paiement
    const methode = await methode_de_paiementService.readOne(
      classe.MethodeDePaiement.id
    );
    if (!methode)
      throw new AppError(
        errorManagement.commonErrors.notFound,
        'cette classe ne possede aucune methode de paiement',
        true
      );

    if (methode.tranches < tranche || tranche <= 0) {
      throw new AppError(
        errorManagement.commonErrors.entreeInvalide,
        'Le numero de la tranche est incorrect',
        true
      );
    }
    const totalTranche = methode.total / methode.tranches;
    const recu = await recuService.create(
      {
        total: totalTranche,
        tranche,
      },
      etudiant.id,
      methode.id
    );
    return recu;
  } catch (error) {
    console.log("erreur lors du paiement d'une tranche", error);
    throw new Error("erreur lors du paiement d'une tranche");
  }
};

const viewRecuOfAYear = async (id: number, year?: number) => {
  const now = new Date();
  try {
    const recus = await Recu.findAll({
      where: {
        [Op.and]: where(
          fn('YEAR', col('Recu.created_at')),
          year || now.getFullYear()
        ),
      },
      include: {
        model: Etudiant,
        where: { id },
      },
    });
    return recus.map(el => {
      return el.toJSON();
    });
  } catch (error) {
    console.log('error', error);
    throw new Error("erreur lors de la recherche des recus de l'etudiant");
  }
};

const viewBulletinOfAYear = async (id: number, year?: number) => {
  const now = new Date();
  console.log('now', now);
  try {
    const bulletins = await Bulletin.findAll({
      where: {
        [Op.and]: where(
          fn('YEAR', col('Bulletin.created_at')),
          year || now.getFullYear()
        ),
      },
      include: [
        {
          model: Etudiant,
          where: { id },
        },
        Note,
      ],
    });
    console.log(bulletins);
    return bulletins.map(el => {
      return el.toJSON();
    });
  } catch (error) {
    console.log('error', error);
    throw new Error("erreur lors de la recherche des bulettins de l'etudiant");
  }
};

const changerClasse = async (idEtudiant: number, idNewClasse: number) => {
  try {
    const etudiant = await Etudiant.findByPk(idEtudiant);
    if (!etudiant)
      throw new AppError(
        errorManagement.commonErrors.notFound,
        'Etudiant non trouvee',
        true
      );

    const classe = await classeService.ReadOne(idNewClasse);
    if (!classe)
      throw new AppError(
        errorManagement.commonErrors.notFound,
        'Aucune classe trouvee',
        true
      );

    etudiant.setClasse(idNewClasse);
  } catch (error) {
    throw new Error('erreur lors de la tentative de changement de classe');
  }
};

const viewClasse = async (idEtudiant: number) => {
  const etudiant = await Etudiant.findByPk(idEtudiant, { include: Classe });
  if (!etudiant)
    throw new AppError(
      errorManagement.commonErrors.notFound,
      'Aucun etudiant trouve',
      true
    );
  const classe = etudiant.toJSON().Classe;
  if (!classe)
    throw new AppError(
      errorManagement.commonErrors.notFound,
      'Aucune classe trouvee',
      true
    );
  return classe;
};

const etudiantService = {
  create,
  ReadOneById,
  buyTranche,
  viewRecuOfAYear,
  changerClasse,
  viewClasse,
  viewBulletinOfAYear,
};

export { etudiantService };
