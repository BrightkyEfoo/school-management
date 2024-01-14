import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
} from 'sequelize';
import { dbService } from '../database';
import { Etudiant } from '../etudiant';
import { MethodeDePaiement } from '../methode_de_paiement';

const db = dbService;

const sequelize = db.sequelize;

class Recu extends Model {
  declare id: number;
  declare total: number;
  declare tranche: number;
  declare getEtudiant: BelongsToGetAssociationMixin<Etudiant>;
  declare setEtudiant: BelongsToSetAssociationMixin<Etudiant, number>;
  declare getMethodeDePaiement: BelongsToGetAssociationMixin<MethodeDePaiement>;
  declare setMethodeDePaiement: BelongsToSetAssociationMixin<
    MethodeDePaiement,
    number
  >;
}

Recu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tranche: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
  }
);
export { Recu };
