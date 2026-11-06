/** Images de partage (Open Graph) générées au build : logo, polices du site et textes de config.ts. */
import { readFileSync } from 'node:fs';
import { create, type Font } from 'fontkit';
import sharp from 'sharp';
import { carte, club } from '../config';

const LARGEUR = 1200;
const HAUTEUR = 630;
// WhatsApp peut recadrer l'image en carré : l'essentiel tient dans les 630 px du centre.
const LARGEUR_UTILE = 620;
const FORET = '#1a2116';
const FILET = '#2c3826';
const ORANGE = '#fd670e';
const CRAIE = '#eef1e8';

const police = (chemin: string) => create(readFileSync(`node_modules/${chemin}`)) as Font;
const titres = police('@fontsource/big-shoulders-display/files/big-shoulders-display-latin-800-normal.woff2');
const textes = police('@fontsource/barlow/files/barlow-latin-600-normal.woff2');

const largeurTexte = (font: Font, texte: string, taille: number) =>
  (font.layout(texte).advanceWidth * taille) / font.unitsPerEm;

/** Le texte en tracés centrés sur x : Vercel n'a pas les polices du site au moment du build. */
function ligne(font: Font, texte: string, taille: number, y: number, couleur: string) {
  const { glyphs, positions } = font.layout(texte);
  const echelle = taille / font.unitsPerEm;
  let x = (LARGEUR - largeurTexte(font, texte, taille)) / 2;
  const traces = glyphs.map((glyphe, i) => {
    const trace = `<path transform="translate(${x.toFixed(2)} ${y}) scale(${echelle} ${-echelle})" d="${glyphe.path.toSVG()}"/>`;
    x += positions[i].xAdvance * echelle;
    return trace;
  });
  return `<g fill="${couleur}">${traces.join('')}</g>`;
}

/** Coupe le titre en deux lignes équilibrées qui tiennent dans la zone utile, à la plus grande taille possible. */
function couper(texte: string) {
  const mots = texte.split(' ');
  const coupes = mots.slice(1).map((_, i) => [mots.slice(0, i + 1).join(' '), mots.slice(i + 1).join(' ')]);
  const plusLarge = (lignes: string[]) => Math.max(...lignes.map((l) => largeurTexte(titres, l, 1)));
  const lignes = coupes.reduce((a, b) => (plusLarge(b) < plusLarge(a) ? b : a));
  return { lignes, taille: Math.min(88, Math.floor(LARGEUR_UTILE / plusLarge(lignes))) };
}

export const offreCarte = () => `Carte de ${carte.parties} parties : ${carte.prix} €`;

export async function imagePartage(titre: string, accroche?: string) {
  const { lignes, taille } = couper(titre.toUpperCase());
  const interligne = taille * 1.04;
  const coteLogo = 262;
  const hautBloc = coteLogo + 30 + lignes.length * interligne + 66;
  const hautLogo = Math.round((HAUTEUR - hautBloc) / 2);
  const basLogo = hautLogo + coteLogo + 30;
  const basTitre = basLogo + lignes.length * interligne;

  const dep = club.adresse.codePostal.slice(0, 2);
  const infos = `Ouverture ${club.ouverture.texte} · ${club.adresse.ville} (${dep})`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${LARGEUR}" height="${HAUTEUR}">
    <rect width="${LARGEUR}" height="${HAUTEUR}" fill="${FORET}"/>
    <circle cx="${LARGEUR / 2}" cy="${HAUTEUR / 2}" r="470" fill="none" stroke="${FILET}" stroke-width="2"/>
    <circle cx="${LARGEUR / 2}" cy="${HAUTEUR / 2}" r="590" fill="none" stroke="${FILET}" stroke-width="2"/>
    ${lignes.map((l, i) => ligne(titres, l, taille, Math.round(basLogo + (i + 1) * interligne - taille * 0.16), CRAIE)).join('')}
    ${ligne(textes, accroche ?? infos, 30, Math.round(basTitre + 44), accroche ? ORANGE : '#a9b39c')}
  </svg>`;

  const logo = await sharp('src/assets/logo/logo.webp').resize({ height: coteLogo }).toBuffer();
  const { width: largeurLogo = coteLogo } = await sharp(logo).metadata();
  return sharp(Buffer.from(svg))
    .composite([{ input: logo, top: hautLogo, left: Math.round((LARGEUR - largeurLogo) / 2) }])
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer();
}
