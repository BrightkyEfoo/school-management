import { DataTypes, Model } from 'sequelize';
import { dbService } from '../database';

const db = dbService;
const sequelize = db.sequelize;

class Enseignant extends Model {
  declare id: number;
  declare nom: string;
}

Enseignant.init(
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
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
  }
);
export { Enseignant };
