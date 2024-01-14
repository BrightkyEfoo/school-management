import { Classes_GroupeDeMatieres } from '../Classes_GroupeDeMatieres';
import { Bulletin } from '../bulletin';
import { Classe } from '../classe';
import { Etudiant } from '../etudiant';
import { GroupeDeMatieres } from '../groupe-de-matieres';
import { Matiere } from '../matiere';
import { Matiere_Classe } from '../matiere_classe/matiere_classe.model';
import { MethodeDePaiement } from '../methode_de_paiement';
import { Note } from '../notes';
import { Recu } from '../recu';

const initAssociations = () => {
  // bulletin
  Bulletin.hasMany(Note, { onDelete: 'cascade' });
  Bulletin.belongsTo(Classe, { onDelete: 'cascade' });
  Bulletin.belongsTo(Etudiant, { onDelete: 'cascade' });

  // note
  Note.belongsTo(Bulletin, { onDelete: 'cascade' });
  Note.belongsTo(Matiere, { onDelete: 'cascade' });

  // matiere
  Matiere.hasMany(Note, { onDelete: 'cascade' });
  Matiere.belongsToMany(Classe, {
    through: Matiere_Classe,
    onDelete: 'cascade',
  });
  Matiere.belongsTo(GroupeDeMatieres);

  // groupe-de-matieres
  GroupeDeMatieres.hasMany(Matiere, { onDelete: 'cascade' });
  GroupeDeMatieres.belongsToMany(Classe, {
    through: Classes_GroupeDeMatieres,
    onDelete: 'cascade',
  });

  // Classe
  Classe.belongsToMany(GroupeDeMatieres, {
    through: Classes_GroupeDeMatieres,
    onDelete: 'cascade',
  });
  Classe.belongsToMany(Matiere, {
    through: Matiere_Classe,
    onDelete: 'cascade',
  });
  Classe.hasMany(Bulletin, { onDelete: 'cascade' });
  Classe.hasMany(Etudiant, { onDelete: 'cascade' });
  Classe.belongsTo(MethodeDePaiement, { onDelete: 'cascade' });

  // Etudiant
  Etudiant.hasMany(Bulletin);
  Etudiant.belongsTo(Classe);
  Etudiant.hasMany(Recu);

  // recu
  Recu.belongsTo(Etudiant, { onDelete: 'cascade' });
  Recu.belongsTo(MethodeDePaiement, { onDelete: 'cascade' });
  // Enseignant
};

export { initAssociations };
