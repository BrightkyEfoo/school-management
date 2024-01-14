import { DataTypes, Model } from 'sequelize';
import { dbService } from '../database';

const db = dbService;
const sequelize = db.sequelize;

class MethodeDePaiement extends Model {
  declare id: number;
  declare nom: string;
  declare tranches: number;
  declare total: number;
}

MethodeDePaiement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
    },
    tranches: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
  }
);

export { MethodeDePaiement };
