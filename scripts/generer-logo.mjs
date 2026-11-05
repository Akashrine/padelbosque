// Détoure le logo PNG fourni (src/assets/logo/logo-source.png) et génère ses déclinaisons :
// - src/assets/logo/logo.webp : logo complet, en masque coloré par currentColor ;
// - src/assets/logo/embleme.webp : palmier, raquette et balle seuls, pour les petites tailles ;
// - public/favicon.png et public/apple-touch-icon.png : l'emblème orange sur vert forêt.
// Usage : node scripts/generer-logo.mjs
import sharp from 'sharp';

const SOURCE = 'src/assets/logo/logo-source.png';
const ORANGE = { r: 253, g: 103, b: 14 };
const FORET = '#1a2116';
const SEUIL = 40;

const { data, info } = await sharp(SOURCE).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: L, height: H, channels } = info;

// Le fond est presque sans rouge et le dessin presque pur : le rouge donne l'opacité.
const alpha = new Uint8Array(L * H);
for (let i = 0; i < alpha.length; i++) {
  const v = Math.min(255, Math.round((data[i * channels] / 250) * 255));
  alpha[i] = v < 12 ? 0 : v;
}

/** Couleur unie et opacité donnée, en image sharp recadrée sur le dessin. */
const image = (opacite, couleur) => {
  const rgba = Buffer.alloc(L * H * 4);
  for (let i = 0; i < opacite.length; i++) {
    rgba[i * 4] = couleur.r;
    rgba[i * 4 + 1] = couleur.g;
    rgba[i * 4 + 2] = couleur.b;
    rgba[i * 4 + 3] = opacite[i];
  }
  return sharp(rgba, { raw: { width: L, height: H, channels: 4 } }).trim({ threshold: 1 }).png().toBuffer();
};

// L'emblème : tout ce qui finit au-dessus du texte. Le cercle et les lettres descendent plus bas.
const LIMITE_TEXTE = 812;
const composante = new Int32Array(L * H).fill(-1);
const garde = new Uint8Array(L * H);
for (let depart = 0, n = 0; depart < alpha.length; depart++) {
  if (alpha[depart] < SEUIL || composante[depart] !== -1) continue;
  const pile = [depart];
  const pixels = [];
  let bas = 0;
  composante[depart] = n;
  while (pile.length) {
    const p = pile.pop();
    pixels.push(p);
    const x = p % L;
    const y = (p - x) / L;
    bas = Math.max(bas, y);
    for (const q of [x > 0 ? p - 1 : -1, x < L - 1 ? p + 1 : -1, y > 0 ? p - L : -1, y < H - 1 ? p + L : -1]) {
      if (q >= 0 && alpha[q] >= SEUIL && composante[q] === -1) {
        composante[q] = n;
        pile.push(q);
      }
    }
  }
  if (bas <= LIMITE_TEXTE) for (const p of pixels) garde[p] = 1;
  n++;
}

// Élargit la sélection de 2 px pour garder l'anticrénelage des bords.
const opaciteEmbleme = new Uint8Array(L * H);
for (let y = 2; y < H - 2; y++) {
  for (let x = 2; x < L - 2; x++) {
    const p = y * L + x;
    if (!alpha[p]) continue;
    voisins: for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        if (garde[p + dy * L + dx]) {
          opaciteEmbleme[p] = alpha[p];
          break voisins;
        }
      }
    }
  }
}

const logoPng = await image(alpha, ORANGE);
const emblemePng = await image(opaciteEmbleme, ORANGE);

const ecrireMasque = async (png, largeur, sortie) => {
  const resultat = await sharp(png).resize({ width: largeur }).webp({ quality: 50, alphaQuality: 50, smartSubsample: false }).toFile(sortie);
  console.log(`${sortie} écrit (${resultat.width}×${resultat.height}, ${resultat.size} octets)`);
};
await ecrireMasque(logoPng, 480, 'src/assets/logo/logo.webp');
await ecrireMasque(emblemePng, 180, 'src/assets/logo/embleme.webp');

// Favicon : disque vert forêt. Icône Apple : carré plein, iOS arrondit lui-même.
const icone = async (cote, masqueDisque, sortie) => {
  const dessin = await sharp(emblemePng)
    .resize({ width: Math.round(cote * 0.74), height: Math.round(cote * 0.74), fit: 'inside' })
    .toBuffer();
  const disque = `<svg xmlns="http://www.w3.org/2000/svg" width="${cote}" height="${cote}">${
    masqueDisque
      ? `<circle cx="${cote / 2}" cy="${cote / 2}" r="${cote / 2}" fill="${FORET}"/>`
      : `<rect width="${cote}" height="${cote}" fill="${FORET}"/>`
  }</svg>`;
  await sharp(Buffer.from(disque)).composite([{ input: dessin }]).png({ compressionLevel: 9 }).toFile(sortie);
  console.log(`${sortie} écrit`);
};
await icone(96, true, 'public/favicon.png');
await icone(180, false, 'public/apple-touch-icon.png');
