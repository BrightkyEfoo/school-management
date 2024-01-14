const etudiant = {
  nom: 'Eleve',
  prenom: 'Jean',
  date_de_naissance: new Date(),
};

const etudiantsMock = Array(8)
  .fill(etudiant)
  .map((el, i) => ({ ...etudiant, nom: etudiant.nom + i }));

export { etudiantsMock };
