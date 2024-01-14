import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model } from 'sequelize';
import { dbService } from '../database';
import { Matiere } from '../matiere';
import { Classe } from '../classe';

const db = dbService;
const sequelize = db.sequelize;

class GroupeDeMatieres extends Model {
  declare id: string;
  declare nom: string;
  declare getMatieres: HasManyGetAssociationsMixin<Matiere>;
  declare addMatiere: HasManyAddAssociationMixin<Matiere, number>;
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
