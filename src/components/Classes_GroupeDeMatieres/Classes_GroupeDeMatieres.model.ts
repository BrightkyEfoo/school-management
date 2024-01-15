import { DataTypes, Model } from 'sequelize';
import { dbService } from '../database';

const db = dbService;
const sequelize = db.sequelize;

class Classes_GroupeDeMatieres extends Model {
  declare id: number;
  declare coefficient: number;
}

Classes_GroupeDeMatieres.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

export { Classes_GroupeDeMatieres };
