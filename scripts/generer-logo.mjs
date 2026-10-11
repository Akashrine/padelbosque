// Génère l'emblème vectoriel du logo (palmier, raquette, balle) : src/assets/logo/embleme.svg.
// Redessin du logo PNG fourni par William (src/assets/logo/logo-source.png), à faire valider.
// Usage : node scripts/generer-logo.mjs
import { writeFileSync } from 'node:fs';

const ORANGE = 'currentColor';
const f = (n) => Math.round(n * 10) / 10;

// Point et tangente sur une courbe quadratique.
const quad = (p0, c, p1, t) => ({
  x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * c.x + t ** 2 * p1.x,
  y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * c.y + t ** 2 * p1.y,
});
const tangente = (p0, c, p1, t) => {
  const dx = 2 * (1 - t) * (c.x - p0.x) + 2 * t * (p1.x - c.x);
  const dy = 2 * (1 - t) * (c.y - p0.y) + 2 * t * (p1.y - c.y);
  const l = Math.hypot(dx, dy);
  return { x: dx / l, y: dy / l };
};

/** Une palme : nervure courbe, folioles pendantes de chaque côté, plus courtes vers la pointe. */
function palme(crown, ctrl, tip, longueur, epaisseur) {
  const pts = [];
  const N = 11;
  // côté gauche puis droit de la nervure, avec folioles en dents de scie
  const cote = (signe) => {
    const out = [];
    for (let i = 0; i <= N; i++) {
      const t = 0.08 + (i / N) * 0.92;
      const p = quad(crown, ctrl, tip, t);
      const d = tangente(crown, ctrl, tip, t);
      const n = { x: -d.y * signe, y: d.x * signe };
      const l = longueur * Math.sin(Math.PI * Math.min(1, t * 1.15)) * (1 - t * 0.55);
      // base de la foliole contre la nervure
      out.push({ x: p.x + n.x * epaisseur, y: p.y + n.y * epaisseur });
      // pointe de la foliole, tirée vers l'avant et vers le bas (gravité)
      const tq = Math.min(1, t + 0.06);
      const q = quad(crown, ctrl, tip, tq);
      out.push({ x: q.x + n.x * l + d.x * l * 0.35, y: q.y + n.y * l + d.y * l * 0.35 + l * 0.25 });
    }
    return out;
  };
  const g = cote(1);
  const dr = cote(-1).reverse();
  pts.push(crown, ...g, tip, ...dr);
  return `<path d="M${pts.map((p) => `${f(p.x)} ${f(p.y)}`).join('L')}Z"/>`;
}

const crown = { x: 104, y: 80 };
const palmes = [
  // [contrôle, pointe, longueur des folioles] : les palmes montent puis retombent
  [{ x: 66, y: 40 }, { x: 30, y: 86 }, 17],
  [{ x: 76, y: 30 }, { x: 52, y: 42 }, 13],
  [{ x: 104, y: 24 }, { x: 122, y: 30 }, 12],
  [{ x: 136, y: 30 }, { x: 160, y: 50 }, 14],
  [{ x: 150, y: 46 }, { x: 178, y: 96 }, 17],
  [{ x: 76, y: 66 }, { x: 58, y: 116 }, 14],
  [{ x: 128, y: 70 }, { x: 138, y: 112 }, 11],
].map(([c, t, l]) => palme(crown, c, t, l, 1.6)).join('\n    ');

// Tronc légèrement courbé, plus large à la base.
const tronc = `<path d="M104 178 C101 148 98 116 100 84 L107 84 C107 116 111 148 116 178 Z"/>`;

// Raquette : tête pleine percée, col, manche avec grip. Dessinée verticale puis tournée.
const trous = [];
for (let r = 0; r < 6; r++) {
  for (let c = 0; c < 5; c++) {
    const x = -12 + c * 6 + (r % 2 ? 3 : 0);
    const y = -20 + r * 6.4;
    if ((x / 16) ** 2 + (y / 22) ** 2 < 0.78) trous.push(`<circle cx="${f(x)}" cy="${f(y)}" r="1.7"/>`);
  }
}
const raquette = `<g transform="translate(150 138) rotate(36)">
      <path d="M0 -31 C17 -31 22 -16 22 -4 C22 12 12 22 5 26 L4 40 L-4 40 L-5 26 C-12 22 -22 12 -22 -4 C-22 -16 -17 -31 0 -31 Z"/>
      <g fill="var(--fond, #1A2116)">${trous.join('')}</g>
      <rect x="-5" y="40" width="10" height="24" rx="2"/>
      <g stroke="var(--fond, #1A2116)" stroke-width="1.6">
        <path d="M-5 46 L5 43 M-5 52 L5 49 M-5 58 L5 55"/>
      </g>
    </g>`;

// Balle et trajectoire en arc depuis le haut du cercle.
const balle = `<circle cx="196" cy="124" r="7.5"/>
    <path d="M190.5 119 C194 122 194 127 190.6 129.6 M201.4 118.6 C198 121.6 198 126.6 201.5 129.4" fill="none" stroke="var(--fond, #1A2116)" stroke-width="1.4"/>`;
const trajectoire = `<path d="M120 38 C160 38 192 64 196 110" fill="none" stroke="${ORANGE}" stroke-width="3"/>
    <path d="M182 136 C176 146 168 152 158 156 M186 140 C182 148 176 153 170 156" fill="none" stroke="${ORANGE}" stroke-width="2.2" stroke-linecap="round"/>`;
const sol = `<path d="M36 182 Q120 162 204 182" fill="none" stroke="${ORANGE}" stroke-width="3.5" stroke-linecap="round"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="${ORANGE}" role="img" aria-label="Emblème Pad'el Bosque">
  <!-- Redessin vectoriel du logo Pad'el Bosque, généré par scripts/generer-logo.mjs -->
  <circle cx="120" cy="120" r="113" fill="none" stroke="${ORANGE}" stroke-width="5"/>
  <g>
    ${palmes}
  </g>
  ${tronc}
  ${sol}
  ${trajectoire}
  ${raquette}
  ${balle}
</svg>
`;
writeFileSync('src/assets/logo/embleme.svg', svg);
console.log('src/assets/logo/embleme.svg écrit');

// Favicon : l'emblème orange sur un disque vert forêt.
const favicon = svg
  .replace(/ role="img" aria-label="[^"]*"/, '')
  .replace(/<!--.*?-->\n/, '')
  .replaceAll('currentColor', '#FD670E')
  .replaceAll('var(--fond, #1A2116)', '#1A2116')
  .replace('<circle cx="120" cy="120" r="113"', '<circle cx="120" cy="120" r="120" fill="#1A2116"/>\n  <circle cx="120" cy="120" r="104"');
writeFileSync('public/favicon.svg', favicon);
console.log('public/favicon.svg écrit');
