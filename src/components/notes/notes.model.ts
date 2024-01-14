import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
} from 'sequelize';
import { dbService } from '../database';
import { Bulletin } from '../bulletin';
import { Matiere } from '../matiere';

const db = dbService;
const sequelize = db.sequelize;

class Note extends Model {
  declare id: number;
  declare valeur: number;
  declare valeurMax: number;
  declare getBulletin: BelongsToGetAssociationMixin<Bulletin>;
  declare setBulletin: BelongsToSetAssociationMixin<Bulletin, number>;
  declare getMatiere: BelongsToGetAssociationMixin<Matiere>;
  declare setMatiere: BelongsToSetAssociationMixin<Matiere, number>;
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    valeur: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    valeurMax: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
  }
);

export { Note };
