// Vérifie le site construit (dist/) : JSON-LD, balises SEO, cohérence nom/adresse/téléphone, TODO masqués.
// Usage : npm run build && npm run verifier
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import { liens, stripeActif } from '../src/config.ts';

const dist = 'dist';
const fichiers = readdirSync(dist).filter((f) => f.endsWith('.html')).sort();
const rapport = existsSync('rapport-build/todo-masques.json')
  ? JSON.parse(readFileSync('rapport-build/todo-masques.json', 'utf8'))
  : null;
const erreurs = [];
const lignes = [];

// Un texte ne renvoie jamais à un autre bloc de la page : ce bloc peut être masqué en production.
const RENVOIS = /\b(plus bas|plus haut|ci-dessous|ci-dessus)\b/i;
const MOTS_MIN_SEO = 380;
const sources = (dir) =>
  readdirSync(dir).flatMap((n) => (statSync(`${dir}/${n}`).isDirectory() ? sources(`${dir}/${n}`) : [`${dir}/${n}`]));
for (const fichier of [...sources('src/content'), ...sources('src/components'), ...sources('src/pages')]) {
  readFileSync(fichier, 'utf8').split('\n').forEach((ligne, i) => {
    const m = ligne.match(RENVOIS);
    if (m) erreurs.push(`${fichier}:${i + 1} : renvoi « ${m[0]} » vers un bloc qui peut être masqué`);
  });
}

const propre = (t) => (t ?? '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
const mots = (t) => propre(t).split(' ').filter((m) => /[\p{L}\p{N}]/u.test(m)).length;
const exiger = (cond, message) => cond || erreurs.push(message);
const visible = (el) => {
  const copie = el.cloneNode(true);
  copie.querySelectorAll('script').forEach((s) => s.remove());
  return propre(copie.textContent);
};

for (const f of fichiers) {
  const html = readFileSync(`${dist}/${f}`, 'utf8');
  const { document } = parseHTML(html);

  // Nom protégé : « Bessilles » n'apparaît que dans l'adresse.
  const horsAdresse = html.replaceAll('Base départementale de Bessilles', '').replaceAll(encodeURIComponent('Base départementale de Bessilles'), '');
  exiger(!/Bessilles/i.test(horsAdresse), `${f} : « Bessilles » hors de l'adresse`);
  const url = '/' + f.replace(/\.html$/, '').replace(/^index$/, '');
  const title = propre(document.querySelector('title')?.textContent);
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  const noindex = !!document.querySelector('meta[name="robots"][content*="noindex"]');
  const main = document.querySelector('main');
  const article = main.querySelector('article');
  const todosAffiches = document.querySelectorAll('mark.todo').length;
  const masques = rapport?.pages?.[f] ?? [];

  exiger(title, `${f} : title manquant`);
  exiger(description, `${f} : meta description manquante`);
  exiger(document.querySelectorAll('h1').length === 1, `${f} : nombre de H1 différent de 1`);
  exiger(!/[—–]/.test(visible(main)), `${f} : tiret cadratin ou demi-cadratin`);
  exiger(!/Pad’el/.test(html), `${f} : apostrophe courbe dans le nom du club`);
  exiger(!/\{\{/.test(html), `${f} : variable {{ }} non remplacée`);
  exiger(!RENVOIS.test(visible(main)), `${f} : renvoi « plus bas », « ci-dessous »… dans le texte affiché`);
  if (!noindex) {
    exiger(title.length <= 65, `${f} : title de ${title.length} caractères (> 65)`);
    exiger(description.length >= 110 && description.length <= 160, `${f} : description de ${description.length} caractères (hors 110-160)`);
  }
  if (rapport && !rapport.todoVisibles) {
    exiger(!/TODO/.test(visible(document.body)) && todosAffiches === 0, `${f} : le mot TODO est affiché en production`);
    exiger(!/TODO/.test(title + description), `${f} : TODO dans le title ou la description`);
  }

  // Bouton fondateur : Stripe seulement si le lien existe et que les 5 conditions de la carte sont validées.
  for (const a of document.querySelectorAll('.cta-fondateur a')) {
    const href = a.getAttribute('href') ?? '';
    exiger(
      stripeActif() ? href === liens.stripe : href.startsWith('https://wa.me/'),
      `${f} : bouton fondateur vers ${href}, attendu ${stripeActif() ? 'le lien Stripe' : 'WhatsApp (lien Stripe ou conditions de la carte non validés)'}`,
    );
  }

  // Titres sans contenu après masquage.
  for (const h of main.querySelectorAll('h2, h3')) {
    let s = h.nextElementSibling;
    const niv = Number(h.tagName[1]);
    const orphelin = !s || (/^H[1-6]$/.test(s.tagName) && Number(s.tagName[1]) <= niv);
    exiger(!orphelin, `${f} : titre sans contenu « ${propre(h.textContent)} »`);
  }

  // Pied de page : nom, adresse, téléphone identiques partout.
  const pied = visible(document.querySelector('footer'));
  for (const attendu of ["Pad'el Bosque", 'Base départementale de Bessilles', '34530 Montagnac', '06 14 97 97 49']) {
    exiger(pied.includes(attendu), `${f} : pied de page sans « ${attendu} »`);
  }

  // FAQ visible
  const questionsVisibles = [...main.querySelectorAll('details summary')].map((s) => propre(s.textContent));
  if (article && !noindex && f !== 'mentions-legales.html' && rapport && !rapport.todoVisibles) {
    exiger(mots(visible(article)) >= MOTS_MIN_SEO, `${f} : ${mots(visible(article))} mots de texte rédigé en production (minimum ${MOTS_MIN_SEO})`);
  }
  if (article && !noindex && f !== 'mentions-legales.html') {
    exiger(questionsVisibles.length >= 3 && questionsVisibles.length <= 5, `${f} : ${questionsVisibles.length} questions FAQ visibles (attendu 3 à 5)`);
  }

  // JSON-LD
  const types = [];
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    const brut = script.textContent;
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
      const plages = d.openingHoursSpecification;
      for (const o of plages) {
        exiger(/^\d\d:\d\d$/.test(o.opens) && /^\d\d:\d\d$/.test(o.closes) && o.dayOfWeek.length, `${f} : horaires JSON-LD mal formés`);
        if (o.validFrom && o.validThrough) exiger(o.validFrom < o.validThrough, `${f} : validFrom après validThrough`);
      }
      // Plusieurs plages : toutes datées. Seule la première peut n'avoir que validThrough (date d'ouverture inconnue).
      exiger(plages.length === 1 || plages.every((o, i) => o.validThrough && (o.validFrom || i === 0)), `${f} : plusieurs plages horaires sans dates de validité`);
      for (let i = 1; i < plages.length; i++) {
        exiger(!plages[i - 1].validThrough || plages[i - 1].validThrough < plages[i].validFrom, `${f} : plages horaires qui se chevauchent`);
      }
    }
    if (d['@type'] === 'FAQPage') {
      exiger(d.mainEntity.length > 0, `${f} : FAQPage vide`);
      for (const q of d.mainEntity) {
        exiger(q['@type'] === 'Question' && q.name && q.acceptedAnswer?.text, `${f} : question FAQ incomplète`);
        exiger(questionsVisibles.includes(q.name), `${f} : question FAQ du JSON-LD absente de la page « ${q.name} »`);
      }
    }
    if (d['@type'] === 'BreadcrumbList') {
      d.itemListElement.forEach((it, i) => exiger(it.position === i + 1 && it.item?.startsWith('https://padelbosque.fr'), `${f} : fil d'Ariane mal formé`));
    }
  }

  lignes.push({
    url, title, description, noindex, masques, todosAffiches,
    motsPage: mots(visible(main)),
    motsArticle: article ? mots(visible(article)) : null,
    faq: questionsVisibles.length,
    jsonld: types.join(' + ') || '-',
  });
}

const mode = !rapport ? 'rapport de masquage absent' : rapport.todoVisibles ? 'TODO visibles (TODO_VISIBLES=1)' : 'production, TODO masqués';
console.log(`Mode du build : ${mode}\n`);
console.log('| URL | Title | Meta description | Mots (page) | Mots (texte rédigé) | FAQ | TODO affichés | Blocs masqués | JSON-LD |');
console.log('| --- | --- | --- | --- | --- | --- | --- | --- | --- |');
for (const l of lignes) {
  console.log(`| \`${l.url}\`${l.noindex ? ' (noindex)' : ''} | ${l.title} (${l.title.length}) | ${l.description} (${l.description.length}) | ${l.motsPage} | ${l.motsArticle ?? '-'} | ${l.faq} | ${l.todosAffiches} | ${l.masques.length} | ${l.jsonld} |`);
}

if (rapport && !rapport.todoVisibles) {
  console.log('\n## Blocs masqués en production\n');
  for (const l of lignes) {
    if (!l.masques.length) continue;
    console.log(`### ${l.url}\n`);
    for (const m of l.masques) {
      console.log(`- ${m.texte ? `« ${m.texte.slice(0, 90)}${m.texte.length > 90 ? '…' : ''} » ` : ''}→ ${m.questions.map((q) => q.replace(/^TODO: /, '')).join(' / ')}`);
    }
    console.log('');
  }
}

console.log(erreurs.length ? `\n${erreurs.length} problème(s) :\n- ${erreurs.join('\n- ')}` : '\nAucun problème détecté.');
process.exit(erreurs.length ? 1 : 0);
