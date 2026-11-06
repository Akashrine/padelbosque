import {
  acces,
  adresseTexte,
  anniversaires,
  carte,
  club,
  conditionsCarte,
  economieCarte,
  entreprise,
  estTodo,
  euros,
  heure,
  prixPartieCarte,
  prixTerrain,
  regleTexte,
  stagesEnfants,
  tournois,
  valeurCarte,
} from '../config';

/**
 * Valeurs utilisables dans les textes Markdown et le frontmatter avec la syntaxe {{cle}}.
 * Une clé inconnue fait échouer le build : pas de faute de frappe silencieuse.
 */
export const variables: Record<string, string> = {
  nom: club.nom,
  promesse: club.promesse,
  lieu: club.adresse.rue,
  cadre: club.cadre,
  entree: club.adresse.complement.toLowerCase(),
  ville: club.adresse.ville,
  codePostal: club.adresse.codePostal,
  departement: club.adresse.departement,
  adresse: adresseTexte(),
  telephone: club.telephone.affichage,
  email: club.email,
  ouverture: club.ouverture.texte,
  prix: euros(club.tarif.prixParJoueur),
  prixTerrain: euros(prixTerrain()),
  creneau: `${club.tarif.dureeCreneauMinutes} minutes`,
  terrains: String(club.terrains.nombre),
  terrainsDetail: `${club.terrains.nombre} terrains ${club.terrains.caracteristiques.join(', ').replace(/, ([^,]*)$/, ' et $1')}`,
  parking: `${club.parking.places.toLocaleString('fr-FR')} places`,
  horairesHiver: `de ${heure(club.horaires.hiver.ouverture)} à ${heure(club.horaires.hiver.fermeture)}`,
  horairesEte: `de ${heure(club.horaires.ete.ouverture)} à ${heure(club.horaires.ete.fermeture)}`,
  fermetureHiver: heure(club.horaires.hiver.fermeture),
  fermetureEte: heure(club.horaires.ete.fermeture),
  carteParties: String(carte.parties),
  cartePrix: euros(carte.prix),
  carteNombre: String(carte.nombreCartes),
  cartePrixPartie: euros(prixPartieCarte()),
  carteValeur: euros(valeurCarte()),
  carteEconomie: euros(economieCarte()),
  carteVenteJusqua: carte.venteJusqua,
  carteLimite: carte.limite,
  repere: acces.repere,
  proximite: acces.proximite,

  // Infos encore manquantes : elles s'affichent comme TODO visibles tant qu'elles valent "TODO: ...".
  adressePostale: club.adresse.adressePostaleExacte,
  inaugurationDate: club.inauguration.date,
  carteValidite: carte.validite,
  bascule: estTodo(club.bascule)
    ? club.bascule
    : `Horaires d'été à partir du ${regleTexte(club.bascule.debutEte)}, horaires d'hiver à partir du ${regleTexte(club.bascule.debutHiver)}.`,
  cours: club.cours,
  formules: club.formules,
  reservationLogiciel: club.reservation.logiciel,
  itineraire: acces.itineraire,
  entrepriseFormats: entreprise.formats,
  entrepriseCapacite: entreprise.capacite,
  entrepriseTarif: entreprise.tarif,
  entrepriseEncadrement: entreprise.encadrement,
  stagesAges: stagesEnfants.ages,
  stagesPeriodes: stagesEnfants.periodes,
  stagesDeroule: stagesEnfants.deroule,
  stagesEncadrement: stagesEnfants.encadrement,
  stagesTarif: stagesEnfants.tarif,
  stagesMateriel: stagesEnfants.materiel,
  stagesNiveaux: stagesEnfants.niveaux,
  tournoisCalendrier: tournois.calendrier,
  ligueFormat: tournois.formatLigue,
  tournoisHomologation: tournois.homologation,
  tournoisInscription: tournois.inscription,
  soirees: tournois.soirees,
  tournoisNiveaux: tournois.niveaux,
  anniversaires,
  conditionsNominative: conditionsCarte.nominative,
  conditionsRetractation: conditionsCarte.retractation,
  conditionsNonOuverture: conditionsCarte.nonOuverture,
  conditionsPartiesPerdues: conditionsCarte.partiesPerdues,
};

export const motif = /\{\{\s*([a-zA-Z]+)\s*\}\}/g;

export function valeur(cle: string): string {
  const v = variables[cle];
  if (v === undefined) throw new Error(`Variable inconnue dans un texte : {{${cle}}}`);
  return v;
}

export function remplir(texte: string): string {
  return texte.replace(motif, (_, cle: string) => valeur(cle));
}

export const contientTodo = (texte: string) => remplir(texte).includes('TODO:');

export { estTodo };

/** Paragraphes d'un Markdown brut qui ne dépendent d'aucune valeur TODO (ceux qui restent en production). */
export const paragraphesSansTodo = (markdown: string) =>
  markdown
    .split(/\n\s*\n/)
    .filter((p) => p.trim() && !contientTodo(p))
    .join('\n\n');

/** Markdown brut vers texte simple, pour les réponses FAQ en JSON-LD. */
export function texteSimple(markdown: string): string {
  return remplir(paragraphesSansTodo(markdown))
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
