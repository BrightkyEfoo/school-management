import { DataTypes, Model } from 'sequelize';
import { dbService } from '../database';
import { Matiere } from '../matiere';
import { Classe } from '../classe';
import { Enseignant } from '../enseignant/enseignant.model';

const db = dbService;
const sequelize = db.sequelize;

class EnseignantMatiereClasse extends Model {
  declare id: number;
  declare nom: string;
}

EnseignantMatiereClasse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    classe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Classe,
      },
    },
    enseignant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Enseignant,
      },
    },
    matiere_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Matiere,
      },
    },
  },

  {
    sequelize,
    timestamps: true,
    underscored: true,
    tableName: 'enseignant_matiere_classe',
  }
);
export { EnseignantMatiereClasse };
