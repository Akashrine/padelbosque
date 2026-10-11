# Infos manquantes : questions pour William

Chaque réponse se reporte dans `src/config.ts`, à la place de la valeur `TODO: ...`.
Le site se met à jour partout, y compris le JSON-LD : un champ n'y entre qu'une fois renseigné.

## Priorité : à obtenir avant la mise en ligne

- [ ] **Offre fondateur** : validez-vous l'offre telle que décrite ? 49 €, 64 € de crédit valable jusqu'au 31 mars 2027, 7 € la session jusqu'au 31 août 2027, invitation à l'inauguration, tournoi fondateurs en décembre 2026, nom sur le mur. Une fois validée, passer `fondateur.validee` à `true`.
- [ ] **Lien Stripe** : quel est le lien Stripe Payment Link de la carte fondateur, limité à 100 paiements ? Tant qu'il manque, le bouton « Je deviens membre fondateur » ouvre WhatsApp.
- [ ] **Mentions légales** : raison sociale, forme juridique et capital, SIRET, TVA intracommunautaire, adresse du siège, directeur de la publication.

## Toutes les pages (pied de page)

- [ ] Quel est l'identifiant Instagram exact du club ?

## Accueil `/`

- [ ] Proposerez-vous des cours avec un coach ? Si oui, qui, quelles formules et quels prix ?
- [ ] Proposerez-vous des abonnements ou des carnets de sessions ? Si oui, lesquels et à quel prix ?
- [ ] À quelles dates passez-vous des horaires d'hiver (9h à 21h) aux horaires d'été (8h à 22h30) ? Tant qu'on ne les a pas, seuls les horaires d'hiver figurent dans le JSON-LD.
- [ ] Quel format pour les soirées (fréquence, jour, principe) ?
- [ ] Quelle formule et quel prix pour un anniversaire ou une privatisation ?
- [ ] Quel logiciel de réservation utiliserez-vous et quand sera-t-il en ligne ?
- [ ] Âge des enfants pour les stages (voir `/stages-padel-enfants`).

## Accès : accueil et `/padel-pezenas-meze-sete`

- [ ] Quelles sont les coordonnées GPS de l'entrée nord (latitude, longitude) ? Elles entreront dans le JSON-LD.
- [ ] Quelle est l'adresse postale exacte du club (numéro, voie), si elle existe ?
- [ ] Quel itinéraire conseiller pour rejoindre l'entrée nord (route, panneau, repère) ?
- [ ] Temps de trajet en voiture jusqu'à l'entrée nord depuis Pézenas, Mèze, Sète, Agde et Béziers. Possible de les mesurer nous-mêmes sur Google Maps une fois le point GPS connu, à faire valider par William.
- [ ] Quel est le lien de la fiche Google du club, une fois créée ?

## `/padel-entreprise-team-building`

- [ ] Quels formats proposez-vous aux entreprises (demi-journée, soirée, tournoi interne) ?
- [ ] Combien de personnes au maximum pour un événement d'entreprise ?
- [ ] Un encadrant ou un coach peut-il animer l'événement ?
- [ ] Quel tarif pour une privatisation ou un événement d'entreprise ?

## `/stages-padel-enfants`

- [ ] À partir de quel âge et jusqu'à quel âge les enfants peuvent-ils participer ?
- [ ] Pendant quelles vacances scolaires auront lieu les premiers stages ?
- [ ] Les stages sont-ils ouverts aux enfants qui n'ont jamais joué ? Y a-t-il des groupes de niveau ?
- [ ] Quel est le déroulé d'une journée de stage (horaires, durée, demi-journée ou journée) ?
- [ ] Qui encadre les stages et avec quel diplôme ?
- [ ] Le matériel est-il fourni pendant les stages ?
- [ ] Quel est le prix d'un stage ?

## `/tournois-ligues-padel`

- [ ] Quelle est la date du tournoi fondateurs de décembre 2026 ?
- [ ] Quel calendrier pour les tournois et les ligues internes ?
- [ ] Organiserez-vous des tournois homologués FFT ?
- [ ] Les tournois et les ligues seront-ils ouverts à tous les niveaux ?
- [ ] Comment fonctionnera une ligue interne (niveaux, durée, rencontres) ?
- [ ] Comment s'inscrire à un tournoi et quel est le prix d'inscription ?

## `/bienvenue-fondateur`

- [ ] Quelle est la date exacte de l'inauguration ?
- [ ] Quel est le lien d'invitation du groupe WhatsApp des membres fondateurs ? Tant qu'il manque, la page renvoie vers WhatsApp en direct.

## `/mentions-legales`

- [ ] Combien de temps conservez-vous les données des membres fondateurs, et à quoi servent-elles exactement ?
- [ ] Les infos société listées en priorité ci-dessus.

## Hors site (CLAUDE.md)

- [ ] Logo en vectoriel et couleurs de marque (nécessaires pour le design).
- [ ] Photos du chantier, rendus 3D, photo de William.
- [ ] Date du shooting photo et vidéo sur place.
- [ ] Date de pose de l'enseigne (nécessaire pour la vérification de la fiche Google).

## À régler par Julien

- [ ] Hébergeur retenu, Netlify ou Vercel. Recopier ensuite son nom et son adresse officiels dans `legal.hebergeur`.
- [ ] Dans Stripe, régler l'URL de retour du Payment Link sur `https://padelbosque.fr/bienvenue-fondateur`.
- [ ] Remplacer l'image de partage provisoire `public/og-default.png` (texte seul) quand logo et photos existent : `node scripts/generer-og.mjs`, ou un vrai visuel.
- [ ] Remplacer le favicon provisoire `public/favicon.svg` par le logo.
