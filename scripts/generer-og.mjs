// Génère l'image de partage provisoire (texte seul) : public/og-default.png
// Usage : node scripts/generer-og.mjs
// À remplacer par un visuel avec logo et photo du club dès qu'ils existent.
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <text x="80" y="270" font-family="Helvetica, Arial, sans-serif" font-size="96" font-weight="700" fill="#111111">Pad'el Bosque</text>
  <text x="80" y="360" font-family="Helvetica, Arial, sans-serif" font-size="48" fill="#111111">Le padel en pleine nature</text>
  <text x="80" y="440" font-family="Helvetica, Arial, sans-serif" font-size="36" fill="#444444">Ouverture novembre 2026 · Montagnac (34)</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og-default.png');
console.log('public/og-default.png généré');
