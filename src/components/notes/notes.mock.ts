const note = {
  valeur: 0,
  valeurMax: 20,
};

const notesMock = Array(18)
  .fill(note)
  .map(el => ({ ...el, valeur: (Math.random() * 20).toFixed(2) }));

export { notesMock };
