import { TMethodeDePaiement } from './methode_de_paiement.types';

const methodesDePaimentMock: TMethodeDePaiement[] = [
  {
    nom: '2 tranches simple',
    total: 50000,
    tranches: 2,
  },
  {
    nom: '4 tranches externe',
    total: 350000,
    tranches: 4,
  },
];

export { methodesDePaimentMock };
