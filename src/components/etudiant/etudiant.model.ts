import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { dbService } from '../database';
import { Classe } from '../classe';
import { Bulletin } from '../bulletin';
import { Recu } from '../recu';

const db = dbService;
const sequelize = db.sequelize;

class Etudiant extends Model {
  declare id: number;
  declare nom: string;
  declare prenom: string;
  declare date_de_naissance: Date;
  declare getClasse: BelongsToGetAssociationMixin<Classe>;
  declare setClasse: BelongsToSetAssociationMixin<Classe, number>;
  declare getBulletins: HasManyGetAssociationsMixin<Bulletin>;
  declare addBulletin: HasManyAddAssociationMixin<Bulletin, number>;
  declare getRecus: HasManyGetAssociationsMixin<Recu>;
  declare addRecu: HasManyAddAssociationMixin<Recu, number>;
}

Etudiant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull : false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull : false
    },
    date_de_naissance: {
      type: DataTypes.DATE,
      allowNull : false
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
  }
);
export { Etudiant };
