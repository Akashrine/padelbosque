// Exporte tous les textes du site dans CONTENUS.md, page par page, dans l'ordre d'affichage.
// Usage : npm run contenus (build de relecture avec TODO visibles, puis export).
import { readFileSync, writeFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';

const dossier = process.argv[2] ?? '.build-contenus';
const pages = [
  'index',
  'padel-entreprise-team-building',
  'stages-padel-enfants',
  'tournois-ligues-padel',
  'padel-pezenas-meze-sete',
  'bienvenue-fondateur',
  'conditions-carte-fondateur',
  'mentions-legales',
  '404',
];

const propre = (t) => (t ?? '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

/** Texte d'un élément, avec les TODO rendus lisibles. */
function texte(el) {
  const copie = el.cloneNode(true);
  copie.querySelectorAll('mark.todo').forEach((m) => {
    m.replaceWith(copie.ownerDocument.createTextNode(` [À compléter : ${propre(m.textContent).replace(/^TODO: /, '')}] `));
  });
  copie.querySelectorAll('br').forEach((b) => b.replaceWith(copie.ownerDocument.createTextNode(', ')));
  return propre(copie.textContent).replace(/ ,/g, ',').replace(/ \./g, '.');
}

function exporter(el, sortie) {
  for (const n of el.children) {
    const tag = n.tagName;
    if (tag === 'SCRIPT') continue;
    if (/^H[1-4]$/.test(tag)) sortie.push(`**${tag} :** ${texte(n)}`);
    else if (tag === 'P' && n.classList.contains('cta')) sortie.push(`**Bouton :** ${texte(n)}`);
    else if (tag === 'P' || tag === 'ADDRESS') sortie.push(texte(n));
    else if (tag === 'UL' || tag === 'OL') sortie.push([...n.children].map((li) => `- ${texte(li)}`).join('\n'));
    else if (tag === 'DL') {
      const lignes = [];
      for (const c of n.children) {
        if (c.tagName === 'DT') lignes.push(`- ${texte(c)} : `);
        else if (c.tagName === 'DD') lignes[lignes.length - 1] += texte(c);
      }
      sortie.push(lignes.join('\n'));
    } else if (tag === 'TABLE') {
      const lignes = [...n.querySelectorAll('tbody tr')].map((tr) => `- ${[...tr.children].map(texte).join(' : ')}`);
      sortie.push(lignes.join('\n'));
    } else if (tag === 'DETAILS') {
      const q = n.querySelector('summary');
      const r = [...n.children].filter((c) => c !== q).map(texte).join(' ');
      sortie.push(`**Question :** ${texte(q)}\nRéponse : ${r}`);
    } else if (tag === 'NAV' && n.getAttribute('aria-label') === "Fil d'Ariane") {
      sortie.push(`Fil d'Ariane : ${[...n.querySelectorAll('li')].map(texte).join(' > ')}`);
    } else if (tag === 'A') sortie.push(`**Lien :** ${texte(n)}`);
    else exporter(n, sortie);
  }
  return sortie;
}

const lire = (page) => parseHTML(readFileSync(`${dossier}/${page}.html`, 'utf8')).document;

const md = [
  '# Contenus du site padelbosque.fr',
  '',
  "Tous les textes du site, page par page, dans l'ordre d'affichage. Valeurs de `src/config.ts` résolues.",
  'Généré par `npm run contenus` : ne pas modifier ce fichier à la main, il serait écrasé.',
  '',
  "Les passages **[À compléter : …]** sont des infos manquantes. En production, la phrase ou le bloc qui en dépend est masqué. Les questions correspondantes sont dans `TODO.md`.",
  '',
];

const accueil = lire('index');
md.push('## Éléments communs à toutes les pages', '', '### En-tête', '');
md.push(exporter(accueil.querySelector('header'), []).join('\n\n'), '');
md.push('### Bouton flottant', '', `**Bouton :** ${texte(accueil.querySelector('.whatsapp-flottant'))} (ouvre WhatsApp, message prérempli selon la page)`, '');
md.push('### Pied de page', '', exporter(accueil.querySelector('footer'), []).join('\n\n'), '');

for (const page of pages) {
  const doc = lire(page);
  const url = page === 'index' ? '/' : `/${page}`;
  const noindex = doc.querySelector('meta[name="robots"][content*="noindex"]') ? ' (non indexée)' : '';
  md.push(`## ${url}${noindex}`, '');
  md.push(`**Title :** ${propre(doc.querySelector('title').textContent)}`, '');
  md.push(`**Meta description :** ${doc.querySelector('meta[name="description"]').getAttribute('content')}`, '');
  md.push(exporter(doc.querySelector('main'), []).join('\n\n'), '');
}

writeFileSync('CONTENUS.md', md.join('\n').replace(/\n{3,}/g, '\n\n'));
console.log(`CONTENUS.md écrit (${pages.length} pages).`);
