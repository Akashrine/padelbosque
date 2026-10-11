# Infos manquantes

Chaque réponse se reporte dans `src/config.ts`, à la place de la valeur `TODO: ...`, sous forme de phrase complète quand elle s'affiche dans un texte.
En production, tout bloc qui dépend d'un TODO est masqué. Liste des blocs masqués : `npm run build && npm run verifier`.

## Message WhatsApp à envoyer à William

```
Salut William, il me manque 8 réponses pour mettre le site en ligne.
Réponds juste avec le numéro et ta réponse.

1. L'offre fondateur te va telle quelle (49 €, 64 € de crédit, 7 € la session jusqu'au 31 août 2027) ? Oui / non
2. Le club a déjà un compte Stripe ? Oui / non
3. Nom exact de la société ?
4. Forme juridique et capital ? (ex. SAS, 1 000 €)
5. Numéro SIRET ? (ou "pas encore")
6. Le siège social est à l'adresse du club ? Oui / non (si non, l'adresse)
7. C'est toi le directeur de la publication du site ? Oui / non
8. On garde les coordonnées des fondateurs jusqu'au 31 août 2027, puis on les supprime (hors factures) ? Oui / non

Merci !
```

## 1. Bloquant mise en ligne

Questions pour William (les 8 du message) :

- [ ] Validation de l'offre fondateur telle que décrite : 49 €, 64 € de crédit valable jusqu'au 31 mars 2027, 7 € la session jusqu'au 31 août 2027, invitation à l'inauguration, tournoi fondateurs en décembre 2026, nom sur le mur. Si oui : `fondateur.validee = true`.
- [ ] Compte Stripe du club : existe-t-il ? Il faut ensuite créer le Payment Link limité à 100 paiements (`liens.stripe`). Sans lui, le bouton fondateur ouvre WhatsApp.
- [ ] Raison sociale (`legal.raisonSociale`).
- [ ] Forme juridique et capital (`legal.formeJuridique`).
- [ ] SIRET (`legal.siret`).
- [ ] Siège social (`legal.siege`).
- [ ] Directeur de la publication (`legal.directeurPublication`).
- [ ] Durée de conservation et usage des données des fondateurs (`legal.donneesConservation`).

Côté Julien, pas de question à poser :

- [ ] Choisir l'hébergeur (Netlify ou Vercel), recopier son nom et son adresse officiels dans `legal.hebergeur`.
- [ ] Créer le Payment Link Stripe (100 paiements, collecte nom, email, téléphone) et régler son URL de retour sur `https://padelbosque.fr/bienvenue-fondateur`.
- [ ] Brancher padelbosque.fr.

## 2. Sous un mois (avant l'ouverture, début novembre 2026)

- [ ] Horaires : passage aux horaires d'été le dernier dimanche de mars et aux horaires d'hiver le dernier dimanche d'octobre ? Oui / non. Si oui, dans `club.bascule` : `{ debutEte: { mois: 3, jour: 'dernier-dimanche' }, debutHiver: { mois: 10, jour: 'dernier-dimanche' } }`. Le JSON-LD publiera alors les deux plages avec validFrom et validThrough. Il faudra reconstruire le site au moins une fois par an pour mettre ces dates à jour.
- [ ] Identifiant Instagram exact du club (pied de page, JSON-LD `sameAs`).
- [ ] Coordonnées GPS de l'entrée nord (JSON-LD `geo`). Un point déposé sur Google Maps suffit.
- [ ] Adresse postale exacte du club (numéro, voie), si elle existe.
- [ ] Itinéraire conseillé pour l'entrée nord (route, panneau, repère).
- [ ] Temps de trajet en voiture depuis Pézenas, Mèze, Sète, Agde et Béziers. Julien peut les mesurer sur Google Maps une fois le point GPS connu, puis les faire valider.
- [ ] Lien de la fiche Google, une fois créée.
- [ ] Date de pose de l'enseigne (nécessaire pour la vérification de la fiche Google).
- [ ] Date exacte de l'inauguration.
- [ ] Date du tournoi fondateurs de décembre 2026.
- [ ] Lien d'invitation du groupe WhatsApp des fondateurs. Sans lui, `/bienvenue-fondateur` renvoie vers WhatsApp en direct.
- [ ] Logiciel de réservation : lequel, et date de mise en ligne.
- [ ] Cours avec un coach : oui ou non ? Si oui, qui, quelles formules, quels prix.
- [ ] Abonnements ou carnets de sessions : oui ou non ? Si oui, lesquels et à quel prix.
- [ ] Numéro de TVA intracommunautaire, s'il existe.
- [ ] Logo en vectoriel et couleurs de marque (nécessaires pour le design).
- [ ] Photos du chantier, rendus 3D, photo de William.

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
