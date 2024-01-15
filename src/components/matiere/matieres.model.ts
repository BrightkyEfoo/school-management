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
import { Classe } from '../classe';
import { Note } from '../notes';

const db = dbService;
const sequelize = db.sequelize;

class Matiere extends Model {
  declare id: number;
  declare nom: string;

  declare getGroupeDeMatieres: BelongsToManyGetAssociationsMixin<GroupeDeMatieres>;
  declare addGroupeDeMatieres: BelongsToManyAddAssociationMixin<
    GroupeDeMatieres,
    number
  >;
  declare getClasses: BelongsToManyGetAssociationsMixin<Classe>;
  declare addClasse: BelongsToManyAddAssociationMixin<Classe, number>;
  declare getNotes: HasManyGetAssociationsMixin<Note>;
  declare addNote: HasManyAddAssociationMixin<Note, number>;
}

Matiere.init(
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
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
  }
);

export { Matiere };
