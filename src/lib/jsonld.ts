import { acces, carte, club, estTodo, isoDate, liens, saisons, site, stripeActif, type PlageHoraire } from '../config';

export type JsonLd = Record<string, unknown>;

const urlAbsolue = (chemin: string) => new URL(chemin, site.url).href;

const idClub = `${site.url}/#club`;
const idSite = `${site.url}/#site`;

export const adressePostale = () => ({
  '@type': 'PostalAddress',
  streetAddress: club.adresse.rue,
  postalCode: club.adresse.codePostal,
  addressLocality: club.adresse.ville,
  addressRegion: club.adresse.region,
  addressCountry: club.adresse.pays,
});

const specHoraires = (p: PlageHoraire, du?: Date, au?: Date) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: p.jours.map((j) => `https://schema.org/${j}`),
  opens: p.ouverture,
  closes: p.fermeture,
  ...(du ? { validFrom: isoDate(du) } : {}),
  ...(au ? { validThrough: isoDate(au) } : {}),
});

/**
 * Avec les dates de bascule : première saison (à partir de la date d'ouverture) et saison suivante,
 * chacune avec validFrom et validThrough. Tant que la date d'ouverture est inconnue, la première n'a que validThrough.
 * Sans elles : horaires d'hiver seuls (le club ouvre en novembre), car deux plages sans dates se contrediraient.
 */
function horaires() {
  if (estTodo(club.bascule)) return [specHoraires(club.horaires.hiver)];
  return saisons(club.bascule).map((s) => specHoraires(s.plage, s.du, s.au));
}

/**
 * Fiche du club. Les champs encore inconnus (TODO) sont exclus :
 * Google lirait sinon "TODO" comme une vraie valeur.
 */
export function sportsActivityLocation(description: string): JsonLd {
  const sameAs = [club.instagram.url, club.ficheGoogle].filter((u) => !estTodo(u));

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': idClub,
    name: club.nom,
    alternateName: club.nomSansApostrophe,
    description,
    url: `${site.url}/`,
    image: urlAbsolue(site.imagePartage),
    logo: urlAbsolue('/apple-touch-icon.png'),
    telephone: club.telephone.jsonLd,
    email: club.email,
    address: adressePostale(),
    ...(estTodo(club.geo)
      ? {}
      : {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: club.geo.latitude,
            longitude: club.geo.longitude,
          },
        }),
    hasMap: liens.googleMaps,
    sport: 'Padel',
    areaServed: acces.villes.map((v) => ({ '@type': 'City', name: v.nom })),
    openingHoursSpecification: horaires(),
    priceRange: `${club.tarif.prixParJoueur} € par joueur`,
    currenciesAccepted: club.tarif.devise,
    publicAccess: true,
    isAccessibleForFree: false,
    amenityFeature: [
      ...club.equipements,
      `${club.terrains.nombre} terrains de padel ${club.terrains.caracteristiques.join(', ')}`,
      `Parking gratuit de ${club.parking.places} places`,
      club.accessibilite,
    ].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    makesOffer: [
      {
        '@type': 'Offer',
        name: `Créneau de padel de ${club.tarif.dureeCreneauMinutes} minutes, prix par joueur`,
        price: club.tarif.prixParJoueur,
        priceCurrency: club.tarif.devise,
      },
      ...(stripeActif()
        ? [
            {
              '@type': 'Offer',
              name: `Carte de ${carte.parties} parties`,
              price: carte.prix,
              priceCurrency: carte.devise,
              url: liens.stripe,
            },
          ]
        : []),
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** Nom du site affiché par Google au-dessus des résultats, à la place du nom de domaine. */
export function siteWeb(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': idSite,
    name: club.nom,
    alternateName: club.nomSansApostrophe,
    url: `${site.url}/`,
    inLanguage: site.langue,
    publisher: { '@id': idClub },
  };
}

/** FAQPage : la réponse ne garde que les paragraphes sans TODO ; une réponse vide n'est pas publiée. */
export function faqPage(questions: { question: string; reponse: string }[]): JsonLd | null {
  const publiables = questions.filter((q) => q.reponse && !q.reponse.includes('TODO:'));
  if (!publiables.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: publiables.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.reponse },
    })),
  };
}

export function filAriane(elements: { nom: string; chemin: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: elements.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.nom,
      item: urlAbsolue(e.chemin),
    })),
  };
}
