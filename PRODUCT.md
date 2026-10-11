# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Deux publics à égalité jusqu'à l'ouverture. En cas de doute, le site doit convaincre le joueur confirmé sans perdre le débutant.

- **Joueurs déjà pratiquants** du secteur (Montagnac, Pézenas, Mèze, Sète, Agde, Béziers) qui jouent ailleurs aujourd'hui. Ce sont les premiers acheteurs probables de la carte Membre fondateur. Ils veulent savoir vite : où, combien, quand, quels terrains.
- **Curieux et débutants** qui n'ont jamais ou peu joué, attirés par le cadre et le prix. Il faut leur expliquer le padel sans jargon et leur montrer qu'ils peuvent venir sans matériel.

Publics secondaires, servis par des pages dédiées : entreprises (team building), familles avec enfants (stages), compétiteurs (tournois, ligues), touristes l'été.

Situation d'usage : la majorité des visites arrive sur mobile depuis Instagram et WhatsApp, souvent depuis un lien partagé, avec peu de temps et d'attention.

## Product Purpose

Site vitrine du club de padel Pad'el Bosque avant et après son ouverture (début novembre 2026, au plus tard fin novembre).

Le site réussit s'il :

1. vend les 100 cartes Membre fondateur (49 €, paiement par Stripe Payment Link externe) ;
2. récolte des contacts WhatsApp en attendant le logiciel de réservation ;
3. positionne le club sur Google pour « padel » autour de Montagnac, Pézenas, Mèze et Sète ;
4. présente le club de façon exacte avant qu'il existe physiquement.

## Positioning

Trois arguments, et seulement ceux-là :

- **Le cadre.** Les terrains sont au cœur du domaine départemental de Bessilles. « Bosque » veut dire forêt. C'est l'argument principal, celui qu'a donné William.
- **Un prix unique à toute heure.** 8 € par joueur pour 90 minutes, soit 32 € le terrain, sans heures pleines ni heures creuses.
- **Tout sur place.** Vestiaires, douches, bar, restauration, espace détente, boutique, location de raquettes, parking gratuit de 2 000 places. On peut venir pour la journée.

Le club ne revendique rien d'autre tant que William ne l'a pas confirmé (pas de coach, pas de « meilleur club », pas de niveau de terrain non vérifié).

## Operating Context

- Visiteurs mobiles venus d'Instagram et de WhatsApp. Bouton WhatsApp flottant, appels à l'action visibles sans défiler.
- Contact et réservation par WhatsApp (`wa.me/33614979749`, message prérempli selon la page) tant que le logiciel de réservation n'est pas choisi.
- Achat de la carte sur une page Stripe externe, puis retour sur `/bienvenue-fondateur`.
- Fiche Google du club à créer : nom, adresse et téléphone du site doivent lui être identiques au caractère près.
- Client : William, gérant du club. Prestataire : Julien. Budget serré (500 €).

## Capabilities and Constraints

- Astro 7, sortie 100 % statique, aucun backend. Hébergement Netlify ou Vercel sur padelbosque.fr.
- Toutes les infos du club dans `src/config.ts`, textes dans `src/content/`. Une info manquante est un `TODO` visible en dev et masqué en production : la mise en page doit tenir quand une phrase, une ligne de liste, un tableau ou une section disparaît.
- Le bouton « Je deviens membre fondateur » n'ouvre Stripe que si le lien existe et que les 5 conditions de la carte sont validées ; sinon il ouvre WhatsApp.
- Pas de compteur dynamique de cartes restantes : « 100 cartes, pas une de plus ».
- Pas de cookie, pas d'outil de mesure d'audience, pas de formulaire.
- SEO : un title et une meta description uniques par page, JSON-LD `SportsActivityLocation`, images WebP ou AVIF aux dimensions déclarées, Lighthouse mobile visé 95 ou plus.
- Le nom du club garde son apostrophe droite partout : Pad'el Bosque.

Faits encore ouverts (voir `TODO.md`) : date exacte d'ouverture et d'inauguration, coordonnées GPS de l'entrée nord, logiciel de réservation, cours et coach, abonnements, formats entreprise et stages, identifiant Instagram, validation de l'offre fondateur et des conditions de la carte.

## Brand Commitments

- Nom : Pad'el Bosque. Promesse : « Le padel au cœur de Bessilles ».
- Ton : sportif. Phrases courtes, vouvoiement, en français.
- Référence de communication : Puntaco, pour son esprit de club (communauté, événements, ambiance). Rien d'autre n'est repris de Puntaco.
- Univers demandé par le brief : le cadre naturel du domaine allié à un ton sportif.
- Logo : PNG généré par IA, fourni par William, pas encore dans le dépôt. Une version SVG redessinée est prévue. Les couleurs de marque sont à extraire de ce logo.

## Evidence on Hand

- Faits du club confirmés par le questionnaire de William (CLAUDE.md, `src/config.ts`).
- Aucune photo du club, aucun rendu 3D, aucune photo de William dans le dépôt pour l'instant. William a des photos du chantier et des rendus 3D ; un shooting est prévu, date inconnue.
- Images de partage et favicon provisoires (`public/og-default.png`, texte seul ; `public/favicon.svg`).
- Aucun avis, aucun témoignage, aucun chiffre de fréquentation. Ne jamais en inventer. Une image de banque doit être signalée comme provisoire et jamais présentée comme le club.

## Product Principles

1. **L'exactitude d'abord.** Aucun fait inventé. Ce qui n'est pas confirmé reste un TODO, masqué en production.
2. **Le cadre est la promesse.** Chaque page rappelle où l'on joue : au cœur du domaine de Bessilles.
3. **Accueillir les deux joueurs.** Le confirmé trouve l'info en un coup d'œil, le débutant comprend qu'il peut venir sans rien savoir ni rien apporter.
4. **Une action claire par écran.** Devenir membre fondateur, ou écrire sur WhatsApp. Rien qui détourne de ces deux gestes.
5. **Un club, pas un simple terrain.** Tournois, ligues, soirées, fondateurs : le site montre une communauté qui se forme, sans promettre ce qui n'est pas encore décidé.

## Accessibility & Inclusion

- Le club est accessible aux personnes à mobilité réduite (accès PMR) : à mentionner là où c'est utile.
- Le site vise un usage mobile confortable en extérieur (lisibilité, contrastes, cibles tactiles), pour tous les publics du club : joueurs, parents, enfants, débutants.
