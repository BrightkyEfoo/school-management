import { Op, col, fn, where } from 'sequelize';
import { Bulletin } from '../bulletin';
import { Classe, classeService } from '../classe';
import { methode_de_paiementService } from '../methode_de_paiement';
import { Recu, recuService } from '../recu';
import { Etudiant } from './etudiant.model';
import { TEtudiant } from './etudiant.types';

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
      include: [Classe, Bulletin],
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
      throw new Error("cet etudiant n'est inscrit dans aucune classe");

    // on recherche la methode de paiement
    const methode = await methode_de_paiementService.readOne(
      classe.MethodeDePaiement.id
    );
    if (!methode)
      throw new Error('cette classe ne possede aucune methode de paiement');

    if (methode.tranches < tranche || tranche <= 0) {
      throw new Error('Le numero de la tranche est incorrect');
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

const viewRecuOfThisYear = async (id: number) => {
  const now = new Date();
  console.log('year', now.getFullYear());
  try {
    const recus = await Recu.findAll({
      where: {
        [Op.and]: where(fn('YEAR', col('created_at')), now.getFullYear()),
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

const etudiantService = {
  create,
  ReadOneById,
  buyTranche,
  viewRecuOfThisYear,
};

export { etudiantService };
