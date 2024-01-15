import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  Model,
} from 'sequelize';
import { dbService } from '../database';
import { Classe } from '../classe';
import { Etudiant } from '../etudiant';
import { Note } from '../notes';

const sequelize = dbService.sequelize;

class Bulletin extends Model {
  declare id: number;
  declare moyenne: number;
  declare annee: number;
  declare getClasse: BelongsToGetAssociationMixin<Classe>;
  declare setClasse: BelongsToSetAssociationMixin<Classe, number>;
  declare getEtudiant: BelongsToGetAssociationMixin<Etudiant>;
  declare setEtudiant: BelongsToSetAssociationMixin<Etudiant, number>;
  declare getNotes: HasManyGetAssociationsMixin<Note>;
  declare addNote: HasManyAddAssociationMixin<Note, number>;
}

Bulletin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    moyenne: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    annee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    // Other model options go here
  }
);

export { Bulletin };
