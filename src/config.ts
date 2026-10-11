/**
 * Source unique des infos du club.
 * Les pages et les textes Markdown lisent ce fichier : rien n'est dupliqué en dur.
 * Une info manquante vaut "TODO: <question à poser à William>". Ne jamais inventer de valeur.
 */

export type Todo = `TODO: ${string}`;

export const estTodo = (valeur: unknown): valeur is Todo =>
  typeof valeur === 'string' && valeur.startsWith('TODO:');

export type Jour =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface PlageHoraire {
  libelle: string;
  /** Format HH:MM */
  ouverture: string;
  /** Format HH:MM */
  fermeture: string;
  jours: Jour[];
  periode: string | Todo;
}

export interface Ville {
  nom: string;
  tempsDeTrajet: string | Todo;
}

export type ContexteWhatsApp = 'fondateur' | 'entreprise' | 'stage' | 'tournoi' | 'general';

const tousLesJours: Jour[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const site = {
  url: 'https://padelbosque.fr',
  langue: 'fr',
  /** Image de partage provisoire, texte seul, en attendant logo et photos. */
  imagePartage: '/og-default.png',
} as const;

export const club = {
  nom: "Pad'el Bosque",
  promesse: 'Le padel au cœur de Bessilles',
  argument: 'Des terrains au cœur du domaine de Bessilles',

  adresse: {
    rue: 'Base départementale de Bessilles',
    complement: 'Entrée nord',
    codePostal: '34530',
    ville: 'Montagnac',
    departement: 'Hérault',
    region: 'Occitanie',
    pays: 'FR',
    adressePostaleExacte:
      'TODO: Quelle est l\'adresse postale exacte du club (numéro, voie) si elle existe ?' as string | Todo,
  },

  geo: 'TODO: Quelles sont les coordonnées GPS de l\'entrée nord (latitude, longitude) ?' as
    | { latitude: number; longitude: number }
    | Todo,

  telephone: {
    affichage: '06 14 97 97 49',
    international: '+33614979749',
    jsonLd: '+33 6 14 97 97 49',
  },

  email: 'padelbosque@gmail.com',

  instagram: {
    nom: "Pad'el Bosque",
    url: 'TODO: Quel est l\'identifiant Instagram exact du club ?' as string | Todo,
  },

  ficheGoogle: 'TODO: Quel est le lien de la fiche Google du club, une fois créée ?' as
    | string
    | Todo,

  ouverture: {
    texte: 'début novembre 2026',
    auPlusTard: 'fin novembre 2026',
  },

  inauguration: {
    texte: 'mi-novembre 2026',
    date: 'TODO: Quelle est la date exacte de l\'inauguration ?' as string | Todo,
  },

  horaires: {
    hiver: {
      libelle: 'Hiver',
      ouverture: '09:00',
      fermeture: '21:00',
      jours: tousLesJours,
      periode: 'TODO: À quelles dates commencent et finissent les horaires d\'hiver ?',
    },
    ete: {
      libelle: 'Été',
      ouverture: '08:00',
      fermeture: '22:30',
      jours: tousLesJours,
      periode: 'TODO: À quelles dates commencent et finissent les horaires d\'été ?',
    },
  } satisfies Record<string, PlageHoraire>,

  tarif: {
    prixParJoueur: 8,
    devise: 'EUR',
    dureeCreneauMinutes: 90,
    joueursParTerrain: 4,
    mention: 'Même prix à toute heure.',
  },

  terrains: {
    nombre: 4,
    caracteristiques: ['extérieurs', 'panoramiques', 'éclairés'],
  },

  parking: {
    places: 2000,
    gratuit: true,
  },

  equipements: ['Vestiaires', 'Douches', 'Bar', 'Restauration', 'Espace détente'],

  materiel: ['Location de raquettes', 'Vente de balles', 'Boutique : matériel et textile'],

  accessibilite: 'Accès PMR',

  publics: [
    'Joueurs de padel',
    'Entreprises',
    'Enfants et familles',
    'Débutants',
    'Touristes l\'été',
  ],

  activites: [
    { titre: 'Stages enfants', lien: '/stages-padel-enfants' },
    { titre: 'Tournois et ligues internes', lien: '/tournois-ligues-padel' },
    { titre: 'Soirées', lien: '/tournois-ligues-padel' },
    { titre: 'Offre entreprise', lien: '/padel-entreprise-team-building' },
    { titre: 'Anniversaires et privatisations', lien: null },
  ] as { titre: string; lien: string | null }[],

  cours: 'TODO: Proposerez-vous des cours avec un coach ? Si oui, qui, quelles formules et quels prix ?' as
    | string
    | Todo,

  formules:
    'TODO: Proposerez-vous des abonnements ou des carnets de sessions ? Si oui, lesquels et à quel prix ?' as
      | string
      | Todo,

  reservation: {
    logiciel: 'TODO: Quel logiciel de réservation utiliserez-vous et quand sera-t-il en ligne ?' as
      | string
      | Todo,
    enAttendant: 'WhatsApp',
  },
};

export const fondateur = {
  validee: false as boolean,
  validation: 'TODO: William valide-t-il l\'offre fondateur telle que décrite (prix, crédit, dates, avantages) ?',
  nombreCartes: 100,
  prix: 49,
  devise: 'EUR',
  venteJusqua: 'l\'inauguration ou jusqu\'à épuisement',
  credit: {
    montant: 64,
    sessions: 8,
    validiteJusquau: '31 mars 2027',
    chargement: 'chargé dans le logiciel du club à l\'ouverture',
  },
  tarifReduit: {
    prixSession: 7,
    jusquau: '31 août 2027',
  },
  inauguration: 'Invitation à l\'inauguration',
  tournoi: 'Tournoi fondateurs offert en décembre 2026',
  tournoiDate: 'TODO: Quelle est la date du tournoi fondateurs de décembre 2026 ?' as string | Todo,
  mur: 'Votre nom sur le mur des fondateurs au club',
  accroche: '100 cartes, pas une de plus.',
};

export const liens = {
  stripe: 'TODO: Quel est le lien Stripe Payment Link de la carte fondateur (limité à 100 paiements) ?' as
    | string
    | Todo,
  /** Numéro au format wa.me, sans + ni espaces. */
  whatsappNumero: '33614979749',
  groupeWhatsappFondateurs:
    'TODO: Quel est le lien d\'invitation du groupe WhatsApp des membres fondateurs ?' as string | Todo,
  googleMaps:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Base départementale de Bessilles, 34530 Montagnac'),
};

export const acces = {
  repere: 'Entrée nord du domaine de Bessilles',
  villes: [
    { nom: 'Pézenas', tempsDeTrajet: 'TODO: Temps de trajet en voiture depuis Pézenas jusqu\'à l\'entrée nord ?' },
    { nom: 'Mèze', tempsDeTrajet: 'TODO: Temps de trajet en voiture depuis Mèze jusqu\'à l\'entrée nord ?' },
    { nom: 'Sète', tempsDeTrajet: 'TODO: Temps de trajet en voiture depuis Sète jusqu\'à l\'entrée nord ?' },
    { nom: 'Agde', tempsDeTrajet: 'TODO: Temps de trajet en voiture depuis Agde jusqu\'à l\'entrée nord ?' },
    { nom: 'Béziers', tempsDeTrajet: 'TODO: Temps de trajet en voiture depuis Béziers jusqu\'à l\'entrée nord ?' },
  ] as Ville[],
  itineraire: 'TODO: Quel itinéraire conseiller pour rejoindre l\'entrée nord (route, panneau, repère) ?' as
    | string
    | Todo,
};

export const entreprise = {
  formats: 'TODO: Quels formats proposez-vous aux entreprises (demi-journée, soirée, tournoi interne) ?' as
    | string
    | Todo,
  capacite: 'TODO: Combien de personnes au maximum pour un événement d\'entreprise ?' as string | Todo,
  tarif: 'TODO: Quel tarif pour une privatisation ou un événement d\'entreprise ?' as string | Todo,
  encadrement: 'TODO: Un encadrant ou un coach peut-il animer l\'événement ?' as string | Todo,
};

export const stagesEnfants = {
  ages: 'TODO: À partir de quel âge et jusqu\'à quel âge les enfants peuvent-ils participer ?' as
    | string
    | Todo,
  periodes: 'TODO: Pendant quelles vacances scolaires auront lieu les premiers stages ?' as
    | string
    | Todo,
  deroule: 'TODO: Quel est le déroulé d\'une journée de stage (horaires, durée, demi-journée ou journée) ?' as
    | string
    | Todo,
  encadrement: 'TODO: Qui encadre les stages et avec quel diplôme ?' as string | Todo,
  tarif: 'TODO: Quel est le prix d\'un stage ?' as string | Todo,
  materiel: 'TODO: Le matériel est-il fourni pendant les stages ?' as string | Todo,
  niveaux: 'TODO: Les stages sont-ils ouverts aux enfants qui n\'ont jamais joué ? Y a-t-il des groupes de niveau ?' as
    | string
    | Todo,
};

export const tournois = {
  calendrier: 'TODO: Quel calendrier pour les tournois et les ligues internes ?' as string | Todo,
  formatLigue: 'TODO: Comment fonctionnera une ligue interne (niveaux, durée, rencontres) ?' as
    | string
    | Todo,
  homologation: 'TODO: Organiserez-vous des tournois homologués FFT ?' as string | Todo,
  inscription: 'TODO: Comment s\'inscrire à un tournoi et quel est le prix d\'inscription ?' as
    | string
    | Todo,
  soirees: 'TODO: Quel format pour les soirées (fréquence, jour, principe) ?' as string | Todo,
  niveaux: 'TODO: Les tournois et les ligues seront-ils ouverts à tous les niveaux ?' as string | Todo,
};

export const anniversaires =
  'TODO: Quelle formule et quel prix pour un anniversaire ou une privatisation ?' as string | Todo;

export const legal = {
  raisonSociale: 'TODO: Quelle est la raison sociale de la société qui exploite le club ?' as string | Todo,
  formeJuridique: 'TODO: Quelle est la forme juridique et le capital social ?' as string | Todo,
  siret: 'TODO: Quel est le numéro SIRET ?' as string | Todo,
  siege: 'TODO: Quelle est l\'adresse du siège social ?' as string | Todo,
  directeurPublication: 'TODO: Qui est le directeur de la publication ?' as string | Todo,
  donneesConservation: 'TODO: Combien de temps conservez-vous les données des membres fondateurs, et à quoi servent-elles exactement ?' as
    | string
    | Todo,
  tva: 'TODO: Quel est le numéro de TVA intracommunautaire, s\'il existe ?' as string | Todo,
  hebergeur: {
    nom: 'TODO: Hébergeur retenu, Netlify ou Vercel ?' as string | Todo,
    adresse: 'TODO: Adresse de l\'hébergeur retenu (à recopier depuis ses mentions officielles).' as
      | string
      | Todo,
  },
};

export const provisoire = {
  imagePartage: 'Image de partage provisoire, texte seul, en attendant le logo et les photos.',
};

/** Montant en euros, format français : "8 €", "49 €". */
export const euros = (montant: number) =>
  `${montant.toLocaleString('fr-FR')} €`;

/** "09:00" devient "9h", "22:30" devient "22h30". */
export const heure = (hhmm: string) => {
  const [h, m] = hhmm.split(':');
  return `${Number(h)}h${m === '00' ? '' : m}`;
};

export const plageTexte = (p: PlageHoraire) =>
  `${heure(p.ouverture)} à ${heure(p.fermeture)}, 7 jours sur 7`;

export const adresseTexte = () =>
  `${club.adresse.rue}, ${club.adresse.codePostal} ${club.adresse.ville}`;
