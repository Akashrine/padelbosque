# Pad'el Bosque : site vitrine

Site vitrine du club de padel Pad'el Bosque, à la base départementale de Bessilles (34530 Montagnac, Hérault).
Client : William, gérant du club. Prestataire : Julien.
Domaine visé : padelbosque.fr

## Objectif

1. Présenter le club avant son ouverture (début novembre 2026).
2. Vendre 100 cartes Membre fondateur.
3. Récolter des contacts WhatsApp en attendant le logiciel de réservation.
4. Se positionner sur Google pour "padel" autour de Montagnac, Pézenas, Mèze et Sète.

Budget serré (500 € pour landing, fiche Google et 3 à 4 pages SEO). Pas de sur-ingénierie.

## Stack

- Astro, sortie 100 % statique. Aucun backend, aucune base de données.
- CSS maison, pas de framework UI lourd.
- Hébergement Netlify ou Vercel, branché sur padelbosque.fr.
- Paiement : un Stripe Payment Link externe (URL en variable dans `src/config.ts`). Pas d'intégration Stripe côté code.
- Contact : lien WhatsApp `https://wa.me/33614979749` avec message prérempli.
- Toutes les infos du club dans un seul fichier `src/config.ts` (nom, adresse, téléphone, horaires, prix, liens). Les pages lisent ce fichier, rien n'est dupliqué en dur.

## Conventions du code

- Astro 7, Markdown via Sätteri (`@astrojs/markdown-satteri`), apostrophes typographiques automatiques désactivées : le nom du club garde son apostrophe droite `'` partout.
- Les textes vivent dans `src/content/` (pages, accueil, faq). Ils citent les infos de `src/config.ts` avec `{{cle}}` (liste dans `src/lib/gabarit.ts`). Une clé inconnue fait échouer le build. Une valeur `TODO: ...` s'affiche en `<mark class="todo">`.
- `content/pages` : `type: seo` est généré par `src/pages/[slug].astro`, `type: systeme` a son propre fichier dans `src/pages/`.
- Les champs TODO sont exclus du JSON-LD, et une question FAQ dont la réponse contient un TODO est exclue du FAQPage.
- En dev, les TODO sont surlignés. En build de production, l'intégration `src/integrations/masquer-todo.ts` retire tout bloc qui dépend d'un TODO (paragraphe, élément de liste, ligne de tableau, couple dt/dd), puis les titres et conteneurs devenus vides. Dans les textes, un TODO doit donc être seul dans son paragraphe, sinon il emporte des faits confirmés avec lui. `TODO_VISIBLES=1` désactive le masquage.
- Contrôle après chaque changement : `npm run build && npm run verifier`. Le verifier liste les blocs masqués par page.
- `npm run contenus` régénère `CONTENUS.md` (tous les textes du site, TODO visibles). Ne pas modifier ce fichier à la main.
- Questions ouvertes pour William : `TODO.md`.

## Infos du club (source : questionnaire rempli par William)

| Champ | Valeur |
| --- | --- |
| Nom | Pad'el Bosque |
| Adresse | Base départementale de Bessilles, 34530 Montagnac (entrée nord). Adresse postale exacte à venir |
| Téléphone | 06 14 97 97 49 |
| Email | padelbosque@gmail.com |
| Instagram | Pad'el Bosque (identifiant exact à créer) |
| Ouverture | Début novembre 2026, au plus tard fin novembre |
| Inauguration | Mi-novembre 2026, date exacte à venir |
| Horaires hiver | 9h à 21h, 7 jours sur 7 |
| Horaires été | 8h à 22h30, 7 jours sur 7 |
| Terrains | 4, extérieurs, panoramiques, éclairés |
| Créneau | 90 min |
| Prix | 8 € par joueur et par créneau, même prix à toute heure |
| Parking | 2 000 places, gratuit |
| Sur place | Vestiaires, douches, bar, restauration, espace détente |
| Matériel | Location de raquettes, vente de balles, boutique (matériel, textile) |
| Accessibilité | Accès PMR |
| Activités | Stages enfants, tournois, ligues internes, soirées, offre entreprise, anniversaires et privatisations |
| Publics | Joueurs de padel, entreprises, enfants et familles, débutants, touristes l'été |
| Ce qui le distingue | Le cadre : terrains au cœur du domaine de Bessilles |
| Ton | Sportif |
| Référence de com | Puntaco |

## Offre Membre fondateur (à faire valider par William avant mise en ligne)

- 100 cartes, en vente jusqu'à l'inauguration ou jusqu'à épuisement.
- Prix : 49 €.
- 64 € de crédit de jeu, chargé dans le logiciel du club à l'ouverture, valable jusqu'au 31 mars 2027. Soit 8 sessions à 8 €.
- Tarif fondateur : 7 € la session au lieu de 8 €, jusqu'au 31 août 2027.
- Invitation à l'inauguration.
- Tournoi fondateurs offert en décembre 2026.
- Nom sur le mur des fondateurs au club.

Paiement par Stripe Payment Link limité à 100 paiements. Le checkout Stripe collecte nom, email, téléphone. Pas de compteur dynamique de cartes restantes : afficher "100 cartes, pas une de plus".

## Pages

### 1. Accueil (`/`)

Sections dans cet ordre :
1. Hero : nom, promesse liée au cadre ("Le padel au cœur de Bessilles"), date d'ouverture, bouton principal "Je deviens membre fondateur", bouton secondaire WhatsApp.
2. L'offre fondateur : contenu complet, prix, bouton Stripe.
3. Le club : 4 terrains panoramiques éclairés, cadre, équipements, parking gratuit.
4. Tarifs et horaires : 8 € par joueur, créneau de 90 min, horaires hiver et été.
5. Activités : stages enfants, tournois et ligues, soirées, entreprises, anniversaires.
6. Accès : adresse, entrée nord, carte (lien Google Maps, pas d'iframe si la fiche n'existe pas encore), temps de trajet depuis Pézenas, Mèze, Sète, Agde, Béziers.
7. FAQ : 6 à 8 questions réelles (prix, durée, matériel, débutants, éclairage, parking, réservation).
8. Pied de page : coordonnées complètes (identiques à la fiche Google), Instagram, mentions légales.

### 2. Pages SEO (3 à 4)

Une page par intention réelle, chacune avec du contenu propre, jamais de pages copiées avec seulement le nom de ville changé.

| URL | Requête cible | Contenu |
| --- | --- | --- |
| `/padel-entreprise-team-building` | padel entreprise Hérault, team building padel | Format, déroulé, privatisation, bar et restauration sur place, contact |
| `/stages-padel-enfants` | stage padel enfant, padel enfant Pézenas | Stages vacances scolaires, âges, déroulé. Infos détaillées à venir |
| `/tournois-ligues-padel` | tournoi padel Hérault, ligue padel | Tournois, ligues internes, soirées, tournoi fondateurs |
| `/padel-pezenas-meze-sete` | padel Pézenas, padel Mèze, padel près de Sète | Page accès : trajet et temps depuis chaque ville, parking, pourquoi venir à Bessilles |

### 3. Mentions légales (`/mentions-legales`)

Gabarit avec champs à compléter (raison sociale, SIRET, hébergeur).

## SEO technique

- Langue `fr`, un `<title>` et une meta description uniques par page.
- JSON-LD `SportsActivityLocation` sur l'accueil : nom, adresse, téléphone, horaires, prix, géolocalisation. Mêmes nom, adresse et téléphone que la fiche Google, au caractère près.
- `sitemap.xml`, `robots.txt`, balises Open Graph avec image de partage.
- Images en WebP ou AVIF, dimensions déclarées, lazy loading sous la ligne de flottaison.
- Score Lighthouse visé : 95 ou plus sur mobile.

## Design

- Mobile d'abord : la majorité des visites viendront d'Instagram et de WhatsApp.
- Univers : le cadre naturel du domaine ("Bosque" signifie forêt), allié à un ton sportif.
- Couleurs à extraire du logo (fichier PNG généré par IA, pas de vectoriel). Prévoir une version SVG redessinée du logo.
- Boutons d'action visibles sans scroller sur mobile. Bouton WhatsApp flottant.

## Règles

- Réponds toujours en français.
- N'invente aucun fait : pas de faux avis, pas de prix ou de nom de coach inventés, pas de photo présentée comme celle du club si elle ne l'est pas.
- Une info manquante devient un `TODO` visible dans `src/config.ts`, jamais une valeur inventée.
- Images de banque libres de droits en attendant le shooting, signalées comme provisoires.
- Textes en français, phrases courtes, tutoiement à éviter sur le site (vouvoiement).

## Infos manquantes

- [ ] Adresse postale exacte ou coordonnées GPS de l'entrée nord
- [ ] Validation de l'offre fondateur par William
- [ ] Lien Stripe Payment Link
- [ ] Logo en vectoriel et couleurs de marque
- [ ] Coach, cours, abonnements ou carnets : formules et prix
- [ ] Date exacte d'inauguration
- [ ] Date de pose de l'enseigne (nécessaire pour la vérification Google)
- [ ] Photos du chantier et rendus 3D (William les a), photo de William
- [ ] Date du shooting photo et vidéo sur place
- [ ] Identifiant Instagram exact
- [ ] Raison sociale et SIRET pour les mentions légales
