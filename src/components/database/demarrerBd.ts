import { randomArray } from '../../utils';
import { classeService, classesMock } from '../classe';
import { enseignantService, enseignantsMock } from '../enseignant';
import { enseignantMatiereClasseMock } from '../enseignant_matiere_classe';
import { enseignant_matiere_classeService } from '../enseignant_matiere_classe/enseignant_matiere_classe.service';
import { etudiantService, etudiantsMock } from '../etudiant';
import {
  groupeDeMatieresMock,
  groupeDeMatieresService,
} from '../groupe-de-matieres';
import { matiereService, matieresMock } from '../matiere';
import {
  methode_de_paiementService,
  methodesDePaimentMock,
} from '../methode_de_paiement';
import { dbService } from './bd.service';
import { initAssociations } from './gestionDesAssociations';

const demarrerBd = async () => {
  const sequelize = dbService.sequelize;
  initAssociations();
  await sequelize?.authenticate();

  try {
    await sequelize?.sync({ force: true }).then(async _ => {
      // Insert data

      // insert matieres
      const enseignantsId: number[] = [];
      for (let i = 0; i < enseignantsMock.length; i++) {
        const newEnseignant = await enseignantService.create(
          enseignantsMock[i]
        );
        enseignantsId.push(newEnseignant.id);
      }

      // insert matiere
      const matieresId: number[] = [];
      for (let i = 0; i < matieresMock.length; i++) {
        const newMatiere = await matiereService.create(matieresMock[i]);
        matieresId.push(newMatiere.id);
      }
      // insert groupeMatiere
      const groupeDeMatieresId: number[] = [];
      for (let i = 0; i < groupeDeMatieresMock.length; i++) {
        const newGroupeDeMatiere = await groupeDeMatieresService.create(
          groupeDeMatieresMock[i].groupe,
          groupeDeMatieresMock[i].indexes
        );
        groupeDeMatieresId.push(newGroupeDeMatiere.id);
      }

      // insert methode de paiement
      const methodesDePaimentsId: number[] = [];
      for (let i = 0; i < methodesDePaimentMock.length; i++) {
        const methode = await methode_de_paiementService.create(
          methodesDePaimentMock[i]
        );
        methodesDePaimentsId.push(methode.id);
      }

      // insert Classe
      const classesId: number[] = [];
      for (let i = 0; i < classesMock.length; i++) {
        const rArray = randomArray(matieresId);
        const tempArray = rArray.map(el => {
          return {
            coeff: Math.floor(Math.random() * 6) + 1,
            matiereId: el,
          };
        });
        let canAdd = Math.floor(Math.random() * 2) === 0;
        const newClasse = await classeService.create(
          classesMock[i],
          tempArray,
          canAdd
            ? [
                {
                  coeff: Math.floor(Math.random() * 4) + 1,
                  groupe_matiereId:
                    groupeDeMatieresId[
                      Math.floor(Math.random() * groupeDeMatieresId.length)
                    ],
                },
              ]
            : undefined,
          methodesDePaimentsId[
            Math.floor(Math.random() * methodesDePaimentsId.length)
          ]
        );
        classesId.push(newClasse.id);
      }

      // Create relation between classe and matiere

      // insert Etudiant
      for (let i = 0; i < etudiantsMock.length; i++) {
        etudiantService.create(
          etudiantsMock[i],
          classesId[Math.floor(Math.random() * classesId.length)]
        );
      }

      for (let i = 0; i < enseignantMatiereClasseMock.length; i++) {
        enseignant_matiere_classeService.create(enseignantMatiereClasseMock[i]);
      }

      console.log('db synced successfully');
    });
  } catch (error) {
    console.log('error', error);
    console.log('error when trying to sync db');
  }
};

export { demarrerBd };
