# Infos manquantes

Chaque réponse se reporte dans `src/config.ts`, à la place de la valeur `TODO: ...`, sous forme de phrase complète quand elle s'affiche dans un texte.
En production, tout bloc qui dépend d'un TODO est masqué. Liste des blocs masqués : `npm run build && npm run verifier`.

## Message WhatsApp à envoyer à William

```
Salut William, c'est noté pour la carte de 10 parties à 70 €, limitée à 100, et pour l'ouverture fin novembre. Il me manque 5 réponses.

1. Une partie = un créneau de 90 min pour un joueur, donc 7 € la partie au lieu de 8 € ? Oui / non
2. La carte est valable jusqu'à quelle date ?
3. Les conditions te vont (rétractation de 14 jours, remboursement si le club n'ouvre pas avant le 31 janvier 2027, parties non jouées perdues en fin de validité) ? Oui / non
4. L'inauguration était prévue mi-novembre, avant l'ouverture. Quelle nouvelle date ?
5. On cale 30 min avec Fanny pour créer le compte Stripe du club ? Il faudra sa pièce d'identité et le RIB de la société. Donne-moi 2 ou 3 créneaux qui vous arrangent.

Merci !
```

## 1. Bloquant mise en ligne

Pour William (les points sont dans le message) :

- [ ] Confirmer le calcul de la carte : une partie = un créneau de 90 min pour un joueur, soit 7 € au lieu de 8 € et 10 € d'économie. William a donné « 10 parties à 70 €, limité à 100 » : le reste est une déduction de Julien, affichée sur le site.
- [ ] Date de fin de validité de la carte (`carte.validite` dans `src/config.ts`). Sans elle, le bouton de la carte ouvre WhatsApp.
- [ ] Valider les conditions de la carte (`conditionsCarte` dans `src/config.ts`, page `/conditions-carte`) : rétractation de 14 jours avec remboursement intégral, remboursement si le club n'ouvre pas avant le 31 janvier 2027, parties non jouées perdues en fin de validité. Pour chaque point validé, remplacer le TODO par la phrase proposée.
- [ ] Séance de 30 min pour créer le compte Stripe du club avec la gérante, Fanny Ramos. À prévoir : sa pièce d'identité et le RIB de la société.

Côté Julien, pas de question à poser :

- [ ] Faire relire les conditions de la carte par un comptable ou un juriste.
- [ ] Relire la clause données personnelles des mentions légales (`src/content/pages/mentions-legales.md`) : aucune collecte sur le site, paiement via Stripe, contact via WhatsApp, pas de cookie de mesure, données des acheteurs conservées jusqu'à la fin de validité de la carte, factures 10 ans.
- [ ] Pendant la séance Stripe : créer le Payment Link Stripe (100 paiements, collecte nom, email, téléphone), régler son URL de retour sur `https://padelbosque.fr/bienvenue-carte`, reporter l'URL dans `liens.stripe`. Sans lui, le bouton de la carte ouvre WhatsApp.
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
- [ ] Lien d'invitation du groupe WhatsApp du club. Sans lui, `/bienvenue-carte` renvoie vers WhatsApp en direct.
- [ ] Logiciel de réservation : lequel, et date de mise en ligne.
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
