import {
  BelongsToGetAssociationMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  Model,
} from 'sequelize';
import { dbService } from '../database';
import { GroupeDeMatieres } from '../groupe-de-matieres';
import { Bulletin } from '../bulletin';
import { Matiere } from '../matiere';
import { Etudiant } from '../etudiant';
import { MethodeDePaiement } from '../methode_de_paiement';

const db = dbService;
const sequelize = db.sequelize;

class Classe extends Model {
  declare id: number;
  declare nom: string;
  declare abbreviation: string;
  declare getGroupeDeMatieres: BelongsToManyGetAssociationsMixin<GroupeDeMatieres>;
  declare addGroupeDeMatieres: BelongsToManyAddAssociationMixin<
    GroupeDeMatieres,
    number
  >;
  declare getBulletins: HasManyGetAssociationsMixin<Bulletin>;
  declare addBulletin: HasManyAddAssociationMixin<Bulletin, number>;
  declare getMatieres: BelongsToManyGetAssociationsMixin<Matiere>;
  declare addMatiere: BelongsToManyAddAssociationMixin<Matiere, number>;
  declare getEtudiants: HasManyGetAssociationsMixin<Etudiant>;
  declare addEtudiant: HasManyAddAssociationMixin<Etudiant, number>;
  declare getMethodeDePaiement: BelongsToGetAssociationMixin<MethodeDePaiement>;
  declare setMethodeDePaiement: BelongsToSetAssociationMixin<
    MethodeDePaiement,
    number
  >;
}

Classe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abbreviation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
  }
);

export { Classe };
