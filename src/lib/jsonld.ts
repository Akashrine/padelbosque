import { club, estTodo, fondateur, liens, site } from '../config';

export type JsonLd = Record<string, unknown>;

const urlAbsolue = (chemin: string) => new URL(chemin, site.url).href;

const idClub = `${site.url}/#club`;

export const adressePostale = () => ({
  '@type': 'PostalAddress',
  streetAddress: club.adresse.rue,
  postalCode: club.adresse.codePostal,
  addressLocality: club.adresse.ville,
  addressRegion: club.adresse.region,
  addressCountry: club.adresse.pays,
});

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
    description,
    url: `${site.url}/`,
    image: urlAbsolue(site.imagePartage),
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
    // Horaires d'hiver uniquement : le club ouvre en novembre, et les dates de bascule
    // hiver/été sont encore inconnues. Deux plages sans dates se contrediraient.
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: club.horaires.hiver.jours.map((j) => `https://schema.org/${j}`),
        opens: club.horaires.hiver.ouverture,
        closes: club.horaires.hiver.fermeture,
      },
    ],
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
      ...(fondateur.validee && !estTodo(liens.stripe)
        ? [
            {
              '@type': 'Offer',
              name: 'Carte Membre fondateur',
              price: fondateur.prix,
              priceCurrency: fondateur.devise,
              url: liens.stripe,
            },
          ]
        : []),
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** FAQPage : seules les questions sans TODO sont publiées. */
export function faqPage(questions: { question: string; reponse: string }[]): JsonLd | null {
  const publiables = questions.filter((q) => !q.reponse.includes('TODO:'));
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
