// Vérifie le site construit (dist/) : JSON-LD, balises SEO, cohérence nom/adresse/téléphone, TODO.
// Usage : npm run build && node scripts/verifier.mjs
import { readFileSync, readdirSync } from 'node:fs';

const dist = 'dist';
const fichiers = readdirSync(dist).filter((f) => f.endsWith('.html')).sort();
const erreurs = [];
const lignes = [];

const texte = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;|\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
const mots = (t) => t.split(' ').filter((m) => /[\p{L}\p{N}]/u.test(m)).length;
const attr = (html, re) => (html.match(re)?.[1] ?? '').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

const exiger = (cond, message) => cond || erreurs.push(message);

for (const f of fichiers) {
  const html = readFileSync(`${dist}/${f}`, 'utf8');
  const url = '/' + f.replace(/\.html$/, '').replace(/^index$/, '');
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => texte(m[1]));
  const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1] ?? '';
  const todos = [...html.matchAll(/<mark class="todo">([\s\S]*?)<\/mark>/g)].map((m) => texte(m[1]));
  const article = html.match(/<article[^>]*>([\s\S]*?)<\/article>/)?.[1];
  const sansTodo = (s) => s.replace(/<mark class="todo">[\s\S]*?<\/mark>/g, ' ');
  const motsPage = mots(texte(sansTodo(main)));
  const motsArticle = article ? mots(texte(sansTodo(article))) : null;
  const noindex = html.includes('name="robots" content="noindex');

  exiger(title, `${f} : title manquant`);
  exiger(description, `${f} : meta description manquante`);
  exiger(h1s.length === 1, `${f} : ${h1s.length} H1`);
  exiger(!/[—–]/.test(texte(main)), `${f} : tiret cadratin ou demi-cadratin`);
  exiger(!/Pad’el/.test(html), `${f} : apostrophe courbe dans le nom du club`);
  exiger(!/\{\{/.test(html), `${f} : variable {{ }} non remplacée`);
  if (!noindex) {
    exiger(title.length <= 65, `${f} : title de ${title.length} caractères (> 65)`);
    exiger(description.length >= 110 && description.length <= 160, `${f} : description de ${description.length} caractères (hors 110-160)`);
  }

  // Pied de page : nom, adresse, téléphone identiques partout.
  const pied = texte(html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? '');
  for (const attendu of ["Pad'el Bosque", 'Base départementale de Bessilles', '34530 Montagnac', '06 14 97 97 49']) {
    exiger(pied.includes(attendu), `${f} : pied de page sans « ${attendu} »`);
  }

  // JSON-LD
  const blocs = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const types = [];
  for (const brut of blocs) {
    let d;
    try {
      d = JSON.parse(brut);
    } catch (e) {
      erreurs.push(`${f} : JSON-LD invalide (${e.message})`);
      continue;
    }
    types.push(d['@type']);
    exiger(d['@context'] === 'https://schema.org', `${f} : @context absent`);
    exiger(!brut.includes('TODO'), `${f} : TODO dans le JSON-LD ${d['@type']}`);
    if (d['@type'] === 'SportsActivityLocation') {
      for (const k of ['name', 'address', 'telephone', 'openingHoursSpecification', 'priceRange', 'url', 'image']) {
        exiger(d[k], `${f} : SportsActivityLocation sans ${k}`);
      }
      exiger(d.name === "Pad'el Bosque", `${f} : nom JSON-LD différent`);
      const a = d.address;
      exiger(
        a.streetAddress === 'Base départementale de Bessilles' && a.postalCode === '34530' && a.addressLocality === 'Montagnac' && a.addressRegion === 'Occitanie' && a.addressCountry === 'FR',
        `${f} : adresse JSON-LD différente`,
      );
      for (const o of d.openingHoursSpecification) {
        exiger(/^\d\d:\d\d$/.test(o.opens) && /^\d\d:\d\d$/.test(o.closes) && o.dayOfWeek.length, `${f} : horaires JSON-LD mal formés`);
      }
    }
    if (d['@type'] === 'FAQPage') {
      exiger(d.mainEntity.length > 0, `${f} : FAQPage vide`);
      for (const q of d.mainEntity) {
        exiger(q['@type'] === 'Question' && q.name && q.acceptedAnswer?.text, `${f} : question FAQ incomplète`);
        exiger(html.includes(q.name.replace(/'/g, '&#39;')) || html.includes(q.name), `${f} : question FAQ absente de la page visible`);
      }
    }
    if (d['@type'] === 'BreadcrumbList') {
      d.itemListElement.forEach((it, i) => exiger(it.position === i + 1 && it.item?.startsWith('https://padelbosque.fr'), `${f} : fil d'Ariane mal formé`));
    }
  }

  lignes.push({ url, title, description, motsPage, motsArticle, todos: todos.length, jsonld: types.join(' + ') || '-', noindex });
}

console.log('| URL | Title | Meta description | Mots (main) | Mots (article) | TODO | JSON-LD |');
console.log('| --- | --- | --- | --- | --- | --- | --- |');
for (const l of lignes) {
  console.log(`| \`${l.url}\`${l.noindex ? ' (noindex)' : ''} | ${l.title} (${l.title.length}) | ${l.description} (${l.description.length}) | ${l.motsPage} | ${l.motsArticle ?? '-'} | ${l.todos} | ${l.jsonld} |`);
}
console.log(erreurs.length ? `\n${erreurs.length} problème(s) :\n- ${erreurs.join('\n- ')}` : '\nAucun problème détecté.');
process.exit(erreurs.length ? 1 : 0);
