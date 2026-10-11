# Infos manquantes

Chaque réponse se reporte dans `src/config.ts`, à la place de la valeur `TODO: ...`, sous forme de phrase complète quand elle s'affiche dans un texte.
En production, tout bloc qui dépend d'un TODO est masqué. Liste des blocs masqués : `npm run build && npm run verifier`.

## Message WhatsApp à envoyer à William

```
Salut William, il me manque 3 choses pour mettre le site en ligne.

1. L'offre fondateur te va telle quelle (49 €, 64 € de crédit valable jusqu'au 31 mars 2027, 7 € la session jusqu'au 31 août 2027) ? Oui / non
2. Tu peux m'envoyer une photo du Kbis de la société ?
3. On cale 30 min ensemble pour créer le compte Stripe du club ? Donne-moi 2 ou 3 créneaux qui t'arrangent.

Merci !
```

## 1. Bloquant mise en ligne

Pour William (les 3 premiers points sont dans le message) :

- [ ] Validation de l'offre fondateur telle que décrite : 49 €, 64 € de crédit valable jusqu'au 31 mars 2027, 7 € la session jusqu'au 31 août 2027, invitation à l'inauguration, tournoi fondateurs en décembre 2026, nom sur le mur. Si oui : `fondateur.validee = true`.
- [ ] Photo du Kbis. Elle donne `legal.raisonSociale`, `legal.formeJuridique` (forme et capital), `legal.siret`, `legal.siege` et le représentant légal, qui devient `legal.directeurPublication`.
- [ ] Créneau de 30 min pour créer ensemble le compte Stripe du club.
- [ ] Valider les conditions de la carte (`conditionsCarte` dans `src/config.ts`, page `/conditions-carte-fondateur`) : carte nominative et non cessible, rétractation de 14 jours avec remboursement intégral, remboursement si le club n'ouvre pas avant le 31 janvier 2027, crédit non utilisé au 31 mars 2027 perdu, tarif fondateur personnel. Pour chaque point validé, remplacer le TODO par la phrase proposée.

Côté Julien, pas de question à poser :

- [ ] Faire relire les conditions de la carte par un comptable ou un juriste.
- [ ] Relire la clause données personnelles des mentions légales (`src/content/pages/mentions-legales.md`) : aucune collecte sur le site, paiement via Stripe, contact via WhatsApp, pas de cookie de mesure, données des fondateurs conservées jusqu'au 31 août 2027, factures 10 ans.
- [ ] Pendant le créneau avec William : créer le Payment Link Stripe (100 paiements, collecte nom, email, téléphone), régler son URL de retour sur `https://padelbosque.fr/bienvenue-fondateur`, reporter l'URL dans `liens.stripe`. Sans lui, le bouton fondateur ouvre WhatsApp.
- [ ] Choisir l'hébergeur (Netlify ou Vercel), recopier son nom et son adresse officiels dans `legal.hebergeur`.
- [ ] Brancher padelbosque.fr.

## 2. Sous un mois (avant l'ouverture, début novembre 2026)

- [ ] Horaires : passage aux horaires d'été le dernier dimanche de mars et aux horaires d'hiver le dernier dimanche d'octobre ? Oui / non. Si oui, dans `club.bascule` : `{ debutEte: { mois: 3, jour: 'dernier-dimanche' }, debutHiver: { mois: 10, jour: 'dernier-dimanche' } }`. Le JSON-LD publiera alors les deux plages avec validFrom et validThrough, la première à partir de la date d'ouverture. Il faudra reconstruire le site au moins une fois par an pour mettre ces dates à jour.
- [ ] Identifiant Instagram exact du club (pied de page, JSON-LD `sameAs`).
- [ ] Coordonnées GPS de l'entrée nord (JSON-LD `geo`). Un point déposé sur Google Maps suffit.
- [ ] Adresse postale exacte du club (numéro, voie), si elle existe.
- [ ] Itinéraire conseillé pour l'entrée nord (route, panneau, repère).
- [ ] Lien de la fiche Google, une fois créée.
- [ ] Date de pose de l'enseigne (nécessaire pour la vérification de la fiche Google).
- [ ] Date exacte d'ouverture (`club.ouverture.date`, format AAAA-MM-JJ). Premier jour des horaires publiés dans le JSON-LD.
- [ ] Date exacte de l'inauguration.
- [ ] Date du tournoi fondateurs de décembre 2026.
- [ ] Lien d'invitation du groupe WhatsApp des fondateurs. Sans lui, `/bienvenue-fondateur` renvoie vers WhatsApp en direct.
- [ ] Logiciel de réservation : lequel, et date de mise en ligne.
- [ ] Cours avec un coach : oui ou non ? Si oui, qui, quelles formules, quels prix.
- [ ] Abonnements ou carnets de sessions : oui ou non ? Si oui, lesquels et à quel prix.
- [ ] Numéro de TVA intracommunautaire, s'il existe.
- [ ] Logo en vectoriel et couleurs de marque (nécessaires pour le design).
- [ ] Photos du chantier, rendus 3D, photo de William.

Côté Julien :

- [ ] Mesurer sur Google Maps le temps de trajet en voiture depuis Pézenas, Mèze, Sète, Agde et Béziers jusqu'à l'entrée nord (`acces.villes`), une fois le point GPS connu.

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
- [ ] Remplacer l'image de partage provisoire (`public/og-default.png`, texte seul) et le favicon provisoire par le logo et les photos.
