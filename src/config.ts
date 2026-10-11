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
}

/** Règle annuelle de changement d'horaires : un jour fixe, ou le dernier dimanche du mois. */
export interface RegleDate {
  /** 1 = janvier, 12 = décembre */
  mois: number;
  jour: number | 'dernier-dimanche';
}

export interface Bascule {
  /** Premier jour des horaires d'été. */
  debutEte: RegleDate;
  /** Premier jour des horaires d'hiver. */
  debutHiver: RegleDate;
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
    /** Mois d'ouverture confirmé (AAAA-MM) : sert à choisir la première saison d'horaires. */
    mois: '2026-11',
    /** Format AAAA-MM-JJ. Premier jour de la première plage horaire du JSON-LD. */
    date: 'TODO: Quelle est la date exacte d\'ouverture du club ?' as string | Todo,
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
    },
    ete: {
      libelle: 'Été',
      ouverture: '08:00',
      fermeture: '22:30',
      jours: tousLesJours,
    },
  } satisfies Record<string, PlageHoraire>,

  /**
   * Dates de passage aux horaires d'été et d'hiver.
   * Proposition à valider avec William : dernier dimanche de mars / dernier dimanche d'octobre, soit
   * { debutEte: { mois: 3, jour: 'dernier-dimanche' }, debutHiver: { mois: 10, jour: 'dernier-dimanche' } }
   * Une fois renseignées, le JSON-LD publie les deux plages avec validFrom et validThrough.
   */
  bascule:
    'TODO: À quelles dates passez-vous aux horaires d\'été et d\'hiver ? Proposition : dernier dimanche de mars / dernier dimanche d\'octobre, à valider avec William.' as
      | Bascule
      | Todo,

  tarif: {
    prixParJoueur: 8,
    devise: 'EUR',
    dureeCreneauMinutes: 90,
    joueursParTerrain: 4,
    mention: 'même prix à toute heure.',
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
    { nom: 'Pézenas', tempsDeTrajet: 'TODO: Temps de trajet en voiture depuis Pézenas jusqu\'à l\'entrée nord ? (Julien, mesure sur Google Maps)' },
    { nom: 'Mèze', tempsDeTrajet: 'TODO: Temps de trajet en voiture depuis Mèze jusqu\'à l\'entrée nord ? (Julien, mesure sur Google Maps)' },
    { nom: 'Sète', tempsDeTrajet: 'TODO: Temps de trajet en voiture depuis Sète jusqu\'à l\'entrée nord ? (Julien, mesure sur Google Maps)' },
    { nom: 'Agde', tempsDeTrajet: 'TODO: Temps de trajet en voiture depuis Agde jusqu\'à l\'entrée nord ? (Julien, mesure sur Google Maps)' },
    { nom: 'Béziers', tempsDeTrajet: 'TODO: Temps de trajet en voiture depuis Béziers jusqu\'à l\'entrée nord ? (Julien, mesure sur Google Maps)' },
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

/**
 * Conditions de la carte Membre fondateur (/conditions-carte-fondateur).
 * Chaque point est une proposition de Julien, à valider avec William puis à faire relire
 * par un comptable ou un juriste. Une fois validé, remplacer le TODO par la phrase entre guillemets.
 */
export const conditionsCarte = {
  nominative:
    'TODO: À valider avec William. Proposition : « La carte est nominative. Elle ne peut être ni cédée ni revendue. »' as
      | string
      | Todo,
  retractation:
    `TODO: À valider avec William. Proposition : « Vous disposez d'un droit de rétractation de 14 jours à compter de l'achat. Pour l'exercer, écrivez à ${club.email} : vous êtes remboursé intégralement. »` as
      | string
      | Todo,
  nonOuverture:
    'TODO: À valider avec William. Proposition : « Si le club n\'ouvre pas avant le 31 janvier 2027, vous pouvez demander le remboursement intégral de la carte. »' as
      | string
      | Todo,
  creditPerdu:
    'TODO: À valider avec William. Proposition : « Le crédit de jeu non utilisé au 31 mars 2027 est perdu. Il n\'est pas remboursable. »' as
      | string
      | Todo,
  tarifPersonnel:
    'TODO: À valider avec William. Proposition : « Le tarif fondateur est personnel. Il ne s\'applique qu\'au titulaire de la carte et ne peut pas être transféré. »' as
      | string
      | Todo,
};

/**
 * Le bouton fondateur n'ouvre Stripe que si le lien existe ET que les conditions de la carte sont toutes validées.
 * Sinon, il ouvre WhatsApp. Contrôlé par npm run verifier.
 */
export const stripeActif = () =>
  !estTodo(liens.stripe) && Object.values(conditionsCarte).every((c) => !estTodo(c));

export const anniversaires =
  'TODO: Quelle formule et quel prix pour un anniversaire ou une privatisation ?' as string | Todo;

export const legal = {
  raisonSociale: 'TODO: Quelle est la raison sociale de la société qui exploite le club ? (Kbis)' as string | Todo,
  formeJuridique: 'TODO: Quelle est la forme juridique et le capital social ? (Kbis)' as string | Todo,
  siret: 'TODO: Quel est le numéro SIRET ? (Kbis)' as string | Todo,
  siege: 'TODO: Quelle est l\'adresse du siège social ? (Kbis)' as string | Todo,
  directeurPublication: 'TODO: Qui est le directeur de la publication ? Par défaut, le représentant légal inscrit au Kbis.' as string | Todo,
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

/** Prix d'un terrain pour un créneau : prix par joueur x joueurs par terrain. */
export const prixTerrain = () => club.tarif.prixParJoueur * club.tarif.joueursParTerrain;

/** Montant en euros, format français : "8 €", "49 €". */
export const euros = (montant: number) =>
  `${montant.toLocaleString('fr-FR')} €`;

/** "09:00" devient "9h", "22:30" devient "22h30". */
export const heure = (hhmm: string) => {
  const [h, m] = hhmm.split(':');
  return `${Number(h)}h${m === '00' ? '' : m}`;
};

export const plageTexte = (p: PlageHoraire) =>
  `${heure(p.ouverture)} à ${heure(p.fermeture)}`;

const nomsMois = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

/** { mois: 3, jour: 'dernier-dimanche' } devient "dernier dimanche de mars". */
export const regleTexte = (r: RegleDate) =>
  r.jour === 'dernier-dimanche'
    ? `dernier dimanche ${/^[ao]/.test(nomsMois[r.mois - 1]) ? 'd\'' : 'de '}${nomsMois[r.mois - 1]}`
    : `${r.jour === 1 ? '1er' : r.jour} ${nomsMois[r.mois - 1]}`;

/** Date (UTC, minuit) d'une règle pour une année donnée. */
export function dateRegle(r: RegleDate, annee: number): Date {
  if (r.jour !== 'dernier-dimanche') return new Date(Date.UTC(annee, r.mois - 1, r.jour));
  const fin = new Date(Date.UTC(annee, r.mois, 0));
  fin.setUTCDate(fin.getUTCDate() - fin.getUTCDay());
  return fin;
}

export interface Saison {
  plage: PlageHoraire;
  /** Absent pour la première saison tant que la date exacte d'ouverture est inconnue. */
  du?: Date;
  au: Date;
}

/**
 * Première saison d'ouverture, puis la suivante. La première commence à la date d'ouverture, pas au début
 * de la saison calendaire. Après l'ouverture : saison en cours, puis la suivante.
 * Le site doit être reconstruit au moins une fois par an.
 */
export function saisons(b: Bascule, aujourdhui = new Date()): [Saison, Saison] {
  const veille = (d: Date) => new Date(d.getTime() - 86_400_000);
  const ouverture = estTodo(club.ouverture.date) ? null : new Date(`${club.ouverture.date}T00:00:00Z`);
  const moisOuverture = new Date(`${club.ouverture.mois}-01T00:00:00Z`);
  const ref = new Date(Math.max(aujourdhui.getTime(), (ouverture ?? moisOuverture).getTime()));
  const a = ref.getUTCFullYear();
  const ete = (y: number) => dateRegle(b.debutEte, y);
  const hiver = (y: number) => dateRegle(b.debutHiver, y);
  const { hiver: h, ete: e } = club.horaires;
  const [premiere, seconde]: [Saison, Saison] =
    ref < ete(a)
      ? [
          { plage: h, du: hiver(a - 1), au: veille(ete(a)) },
          { plage: e, du: ete(a), au: veille(hiver(a)) },
        ]
      : ref < hiver(a)
        ? [
            { plage: e, du: ete(a), au: veille(hiver(a)) },
            { plage: h, du: hiver(a), au: veille(ete(a + 1)) },
          ]
        : [
            { plage: h, du: hiver(a), au: veille(ete(a + 1)) },
            { plage: e, du: ete(a + 1), au: veille(hiver(a + 1)) },
          ];
  // Aucune plage ne commence avant l'ouverture : la première part de la date d'ouverture,
  // ou n'a pas de début tant que cette date est inconnue.
  if (premiere.du && premiere.du < (ouverture ?? moisOuverture)) premiere.du = ouverture ?? undefined;
  return [premiere, seconde];
}

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export const adresseTexte = () =>
  `${club.adresse.rue}, ${club.adresse.codePostal} ${club.adresse.ville}`;
