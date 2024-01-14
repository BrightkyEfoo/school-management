import { DataTypes, Model } from 'sequelize';
import { dbService } from '../database';

const db = dbService;
const sequelize = db.sequelize;

class Matiere_Classe extends Model {
  declare id: number;
  declare nom: string;
  declare matiere_id: number;
  declare classe_id: number;
  declare coefficient: number;
}

Matiere_Classe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    matiere_id: {
      type: DataTypes.INTEGER,
    },
    classe_id: {
      type: DataTypes.INTEGER,
    },
    coefficient: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
  }
);

export { Matiere_Classe };
