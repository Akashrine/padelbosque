# Infos manquantes

Chaque réponse se reporte dans `src/config.ts`, à la place de la valeur `TODO: ...`, sous forme de phrase complète quand elle s'affiche dans un texte.
En production, tout bloc qui dépend d'un TODO est masqué. Liste des blocs masqués : `npm run build && npm run verifier`.

## Message WhatsApp à envoyer à William

```
Salut William, l'appli est branchée sur le site : les boutons carte et réservation y renvoient. Il me manque 3 réponses.

1. Une partie = un créneau de 90 min pour un joueur, donc 7 € la partie au lieu de 8 € ? Oui / non
2. La carte est valable jusqu'à quelle date ?
3. L'inauguration était prévue mi-novembre, avant l'ouverture. Quelle nouvelle date ?

Merci !
```

## 1. Carte et application

Depuis le 19 novembre 2026, la carte s'achète et les terrains se réservent dans l'application Pad'elbosque. Stripe, les conditions de la carte et la page de bienvenue sont abandonnés. L'application bloque la vente à 100 cartes et affiche les mêmes prix que le site (confirmé par Julien).

Pour William (les points sont dans le message) :

- [ ] Confirmer le calcul de la carte : une partie = un créneau de 90 min pour un joueur, soit 7 € au lieu de 8 € et 10 € d'économie. William a donné « 10 parties à 70 €, limité à 100 » : le reste est une déduction de Julien, affichée sur le site.
- [ ] Date de fin de validité de la carte (`carte.validite` dans `src/config.ts`), telle qu'elle apparaît dans l'application. Sans elle, la ligne « Validité » est masquée.

Côté Julien :

- [ ] Après la mise en ligne, ouvrir `padelbosque.fr/app` sur un iPhone et sur un Android : chacun doit arriver sur son store.
- [ ] Relire la clause données personnelles des mentions légales (`src/content/pages/mentions-legales.md`) : aucune collecte ni paiement sur le site, renvoi vers les conditions de l'application.
- [ ] Mettre `padelbosque.fr/app` dans la bio Instagram, la fiche Google et sur un QR code au club.
- [x] Brancher padelbosque.fr : le domaine est chez Gandi, le site chez Vercel.

Société : Kbis reçu, questions closes. Raison sociale, forme juridique, RCS, siège et directrice de la publication dans `legal` (`src/config.ts`). SIRET du siège et TVA recopiés depuis l'API officielle recherche-entreprises.api.gouv.fr. Nom commercial : Pad'el Bosque, partout (site, fiche Google, panneau).

## 2. Avant l'ouverture (fin novembre 2026)

- [ ] Horaires : passage aux horaires d'été le dernier dimanche de mars et aux horaires d'hiver le dernier dimanche d'octobre ? Oui / non. Si oui, dans `club.bascule` : `{ debutEte: { mois: 3, jour: 'dernier-dimanche' }, debutHiver: { mois: 10, jour: 'dernier-dimanche' } }`. Le JSON-LD publiera alors les deux plages avec validFrom et validThrough, la première à partir de la date d'ouverture. Il faudra reconstruire le site au moins une fois par an pour mettre ces dates à jour.
- [ ] Identifiant Instagram exact du club (pied de page, JSON-LD `sameAs`).
- [ ] Coordonnées GPS de l'entrée nord (JSON-LD `geo`). Un point déposé sur Google Maps suffit.
- [ ] Adresse postale exacte du club (numéro, voie), si elle existe.
- [ ] Itinéraire conseillé pour l'entrée nord (route, panneau, repère).
- [ ] Lien de la fiche Google, une fois créée.
- [ ] Date de pose de l'enseigne (nécessaire pour la vérification de la fiche Google).
- [ ] Date exacte d'ouverture (`club.ouverture.date`, format AAAA-MM-JJ). Premier jour des horaires publiés dans le JSON-LD.
- [ ] Date de l'inauguration : l'ancienne date (mi-novembre) tombe avant l'ouverture.
- [ ] Cours avec un coach : oui ou non ? Si oui, qui, quelles formules, quels prix.
- [ ] D'autres abonnements ou carnets que la carte de 10 parties : oui ou non ? Si oui, lesquels et à quel prix.
- [ ] Logo en vectoriel et couleurs de marque (nécessaires pour le design).
- [ ] Photos du chantier, rendus 3D, photo de William.

Côté Julien :

- [ ] Mesurer sur Google Maps le temps de trajet en voiture depuis Pézenas, Sète, Agde et Béziers jusqu'à l'entrée nord (`acces.villes`), une fois le point GPS connu. Montagnac, Mèze, Villeveyrac et Saint-Pargoire : 8 min, chiffre donné par le club, à contrôler.

## 3. Plus tard

Entreprises (`/padel-entreprise-team-building`) :

- [ ] Formats proposés (demi-journée, soirée, tournoi interne).
- [ ] Capacité maximale d'un événement.
- [ ] Un encadrant ou un coach peut-il animer l'événement ?
- [ ] Tarif d'une privatisation ou d'un événement d'entreprise.

Stages enfants (`/stages-padel-enfants`) :

- [ ] Âges minimum et maximum.
- [ ] Vacances scolaires des premiers stages.
- [ ] Ouverts aux enfants qui n'ont jamais joué ? Groupes de niveau ?
- [ ] Déroulé d'une journée (horaires, durée, demi-journée ou journée).
- [ ] Encadrant et diplôme.
- [ ] Matériel fourni pendant le stage ?
- [ ] Prix d'un stage.

Tournois, ligues et soirées (`/tournois-ligues-padel`) :

- [ ] Calendrier des tournois et des ligues internes.
- [ ] Tournois homologués FFT ?
- [ ] Ouverts à tous les niveaux ?
- [ ] Fonctionnement d'une ligue interne (niveaux, durée, rencontres).
- [ ] Inscription à un tournoi et prix.
- [ ] Format des soirées (fréquence, jour, principe).

Autres :

- [ ] Formule et prix d'un anniversaire ou d'une privatisation.
- [ ] Date du shooting photo et vidéo sur place.
- [ ] Téléphone de l'hébergeur dans les mentions légales (`legal.hebergeur`) : Vercel ne publie qu'un numéro de contact DMCA, à décider.
- [ ] Ajouter une vraie photo du club aux images de partage (`src/lib/image-partage.ts`) après le shooting.
