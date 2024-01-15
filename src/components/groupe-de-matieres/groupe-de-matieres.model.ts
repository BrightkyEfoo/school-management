import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  DataTypes,
  Model,
} from 'sequelize';
import { Classe } from '../classe';
import { dbService } from '../database';
import { Matiere } from '../matiere';

const db = dbService;
const sequelize = db.sequelize;

class GroupeDeMatieres extends Model {
  declare id: string;
  declare nom: string;
  declare getMatieres: BelongsToManyGetAssociationsMixin<Matiere>;
  declare addMatiere: BelongsToManyAddAssociationMixin<Matiere, number>;
  declare getClasses: BelongsToManyGetAssociationsMixin<Classe>;
  declare addClasse: BelongsToManyAddAssociationMixin<Classe, number>;
}

GroupeDeMatieres.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
  }
);

export { GroupeDeMatieres };
